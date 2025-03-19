const
  pendingQueueProp = Symbol('PromiseQueue'),
  statusProp = Symbol('PromiseStatus'),
  PromisePending = Symbol('pending'),
  PromiseFulfilled = Symbol('fulfilled'),
  PromiseRejected = Symbol('rejected')

export class PromiseLike {
  constructor(fn) {
    this[statusProp] = PromisePending
    this[pendingQueueProp] = []

    const resolve = (data) => {
      this[statusProp] = PromiseFulfilled
      this.__runConsume(data, this[pendingQueueProp], false)
    }

    const reject = (reason) => {
      this[statusProp] = PromiseRejected
      this.__runConsume(reason, this[pendingQueueProp], true)
    }

    fn?.call(null, resolve, reject)

    return this
  }

  /**
   * isLikePromise
   * @param duck
   * @return { Boolean } isLikePromise
   */
  static isLikePromise(duck) {
    return duck && ['then', 'catch', 'finally'].reduce((isLikePromise, prop) => {
      if (!isLikePromise) {
        return isLikePromise
      }
      return 'function' === typeof duck[prop]
    }, true)
  }

  then(resolveHandler, rejectHandler) {
    this[pendingQueueProp].push({
      success: resolveHandler,
      fail   : rejectHandler
    })
    return this
  }

  catch(handler) {
    this[pendingQueueProp].push({
      fail: handler
    })
    return this
  }

  finally(handler) {
    this[pendingQueueProp].push({
      isFinally: true,
      complete : handler
    })
    return this
  }

  /**
   * @param { Any } payload
   * @param { Array } queueList
   * @param { Boolean } nextCallReject
   */
  __runConsume(payload, queueList, nextCallReject = false) {
    const consume = () => {
      const [iterateItem, ...restQueue] = queueList

      if (restQueue.length <= 0) {
        delete this[pendingQueueProp]
        return
      }

      if (iterateItem.isFinally) {
        this.__iterateExec(iterateItem.complete)
        return this.__runConsume(payload, restQueue, nextCallReject)
      }

      const {
        hasError,
        fulfilled,
        reason,
        result
      } = this.__iterateExec(nextCallReject ? iterateItem.fail : iterateItem.success, payload)

      if (hasError) {
        return this.__runConsume(reason, restQueue, true)
      }

      if (!fulfilled) {
        return this.__runConsume(payload, restQueue, nextCallReject)
      }

      if (PromiseLike.isLikePromise(result)) {
        result
          .then(
            (data) => this.__runConsume(data, restQueue, false),
            (reason) => this.__runConsume(reason, restQueue, true)
          )
      } else {
        return this.__runConsume(result, restQueue, false)
      }
    }

    this.__microtaskWork(consume)
  }

  __microtaskWork(fn) {
    // @Todo: use MutationObserver Better !
    setTimeout(fn, 0)
  }

  /**
   * @typedef { Object } callResultInfo
   *
   * @property { Boolean } fulfilled
   * @property { Any } result
   * @property { Boolean } hasError
   * @property { Any } reason
   */

  /**
   *
   * @param { Function || any } handler
   * @param { Any } [payload]
   * @return { callResultInfo } callResultInfo
   */
  __iterateExec(handler, payload) {

    const callResultInfo = {}

    try {
      callResultInfo.fulfilled = 'function' === typeof handler
      if (callResultInfo.fulfilled) {
        callResultInfo.result = handler(payload)
      }

    } catch (err) {
      callResultInfo.hasError = true
      callResultInfo.reason = err

    }
    return callResultInfo
  }
}
