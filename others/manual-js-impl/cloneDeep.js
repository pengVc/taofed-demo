const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

const isRegExp = (obj) => {
  return Object.prototype.toString.call(obj) === '[object RegExp]'
}

const cloneDeep = (raw, extra) => {
  const { resultRoot, iteratedMap = new Map() } = extra ?? {}
  const result = {}

  if (isArray(raw)) {
    return raw.map(item => cloneDeep(item, { resultRoot: resultRoot ?? result, iteratedMap }))
  }

  if (isRegExp(raw)) {
    return new RegExp(raw)
  }

  // 扩写 日期、symbol
  // if(isDate(obj)){ return new Date(ob) }

  if (isObject(raw)) {
    iteratedMap.set(raw, result)

    // 遍历对象
    for (const key in raw) {
      if (!raw.hasOwnProperty(key)) {
        return
      }

      let val = raw[key]

      switch (true) {
        case isObject(val):
          // 破解循环引用
          if (iteratedMap.has(val)) {
            result[key] = iteratedMap.get(val)
            break
          }

        /**
         * 此次不需 break
         * noinspection FallThroughInSwitchStatementJS
         */

        case isArray(val):
        case isRegExp(val):
          // case isData(val):
          result[key] = cloneDeep(val, { resultRoot: resultRoot ?? result, iteratedMap })
          break

        default:
          result[key] = val
          break
      }
    }

    return result
  }

  return raw
}

export default cloneDeep
