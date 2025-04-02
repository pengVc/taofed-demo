/**
 * 快速排序算法的实现
 * 通过递归的方式对数组进行排序
 *
 * @param arr 待排序的数组
 * @param leftIndex 排序开始的左边界索引
 * @param rightIndex 排序结束的右边界索引
 * @returns 返回排序后的数组
 */
const quickSort = (arr, leftIndex, rightIndex) => {
  let len = arr.length
  let partitionIndex

  // 初始化左右边界索引
  leftIndex = typeof leftIndex != 'number' ? 0 : leftIndex
  rightIndex = typeof rightIndex != 'number' ? len - 1 : rightIndex

  // 当左边界小于右边界时，执行快速排序
  if (leftIndex < rightIndex) {
    // 获取分区索引
    partitionIndex = partition(arr, leftIndex, rightIndex)
    // 对左半部分进行快速排序
    quickSort(arr, leftIndex, partitionIndex - 1)
    // 对右半部分进行快速排序
    quickSort(arr, partitionIndex + 1, rightIndex)
  }

  // 返回排序后的数组
  return arr
}

/**
 * 分区操作，将数组中小于基准值的元素放到基准值的左边，大于基准值的元素放到基准值的右边
 *
 * @param arr 待分区的数组
 * @param leftIndex 分区开始的左边界索引
 * @param rightIndex 分区结束的右边界索引
 * @returns 返回基准值的最终索引
 */
const partition = (arr, leftIndex, rightIndex) => {
  // 分区操作
  let pivot = leftIndex, // 设定基准值（pivot）
    index = pivot + 1

  // 遍历数组，根据基准值进行分区
  for (let i = index; i <= rightIndex; i++) {
    // 当前元素小于基准值时，将其与index位置的元素交换，并更新index
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }

  // 将基准值放置到正确的位置
  swap(arr, pivot, index - 1)

  // 返回基准值的最终索引
  return index - 1
}

/**
 * 交换数组中两个元素的位置
 *
 * @param arr 数组
 * @param leftIndex 左侧元素索引
 * @param rightIndex 右侧元素索引
 */
const swap = (arr, leftIndex, rightIndex) => {
  const temp = arr[leftIndex]

  // 交换元素位置
  arr[leftIndex] = arr[rightIndex]
  arr[rightIndex] = temp
}
