const isArray = (arr) => {
  return Array.isArray(arr)
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export const flatMap = (arr) => {
  // arr: [1, [2, 3], [4, [5, 6]]]
  const result = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    if (isArray(item)) {
      // 二选一：前者不借助 `...` 展开符
      result.push.apply(result, item)
      // result.push(...flatMap(item))
    }else{
      result.push(item)
    }

  }

  return result
}
