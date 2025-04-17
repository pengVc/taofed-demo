(() => {

  // 保存原生Promise的then方法
  const then = Promise.prototype.then
  // 定义停止和恢复的信号常量
  const STOP_SIG = {}
  const RESUME_SIG = 'resume'

  // 在Promise对象上添加停止方法，返回一个特殊的停止信号
  Promise.stop = () => STOP_SIG

  // 在Promise对象上添加恢复方法，接收一个解析函数作为参数
  Promise.resume = (onResolved) => {
    // 返回一个恢复函数，用于处理恢复后的值
    return function resume(res) {
      // 如果提供了解析函数，则调用它，否则直接返回结果
      return 'function' === typeof onResolved ? onResolved(res) : res
    }
  }

  // 重写Promise的then方法，添加对停止和恢复信号的支持
  Promise.prototype.then = function (onResolved, onRejected) {
    // 调用原始的then方法，传入自定义的解析函数
    return then.call(this, (val) => {
      // 判断是否准备恢复执行
      const willResume = _isResumeSignal(onResolved)
      // 判断是否收到停止信号
      const shouldStop = _isStopValue(val)

      // 如果收到停止信号且不准备恢复，则直接返回停止信号
      if (shouldStop && !willResume) {
        return val
      }

      // 如果准备恢复且当前值是停止信号，则恢复执行
      if (willResume && _isStopValue(val)) {
        // 准备进行垃圾回收
        let newValue = val.stopedValue
        val.stopedValue = null
        val = newValue
      }

      // 调用用户提供的解析函数，或直接返回当前值
      const nextValue = 'function' === typeof onResolved ? onResolved(val) : val

      // 如果没有收到停止信号，但新的值是停止信号，则缓存当前值
      if (!shouldStop && _isStopValue(nextValue)) {
        nextValue.stopedValue = val
      }

      // 返回新的值
      return nextValue

    }, onRejected)
  }

  // 判断一个值是否是停止信号
  function _isStopValue(val) {
    return val === STOP_SIG
  }

  // 判断一个函数是否是恢复信号
  function _isResumeSignal(onResolved) {
    return 'function' === typeof onResolved && onResolved.name === RESUME_SIG
  }

})()

/* --- Usage --- */

// 创建一个Promise实例，并进行then链的处理
const iPr = Promise
  .resolve('hello')

  .then((res) => {
    console.log('then I: ', res)
    return 'wow!'
  })

  .then((res) => {
    // 停止
    return Promise.stop()
  })

  .then((res) => {
    // 这个回调永远不会被调用
    console.log('then II: ', res)
  })

/*
    .then(function resume(res) {
        console.log("then III: ", res);
        return res;
    })
*/

// 在1秒后恢复执行
setTimeout(() => {
  iPr
    // 恢复
    .then(Promise.resume((res) => {
      console.log('then III-2: ', res)
    }))

    .finally(() => {
      console.log('finally end!')
    })
}, 1000)


