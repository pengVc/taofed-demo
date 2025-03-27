const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

const isRegExp = (obj) => {
  return Object.prototype.toString.call(obj) === '[object RegExp]'
}

const cloneDeep = (obj) => {
  const result = {}

  if (isArray(obj)) {
    return obj.map(item => cloneDeep(item))
  }

  if (isRegExp(obj)) {
    return new RegExp(val)
  }

  // 扩写 日期、symbol
  // if(isDate(obj)){ return new Date(ob) }

  if (isObject(obj)) {
    // 遍历对象
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        return
      }

      const val = obj[key]

      switch (true) {
        case isObject(val):
        case isArray(val):
        case isRegExp(val):
          // case isData(val):
          result[key] = cloneDeep(val)
          break

        default:
          result[key] = val
          break
      }
    }
  }

  return result
}


