/**
 * 快速排序算法的实现
 * 通过递归的方式对数组进行排序
 *
 * @param arr 待排序的数组
 * @param leftIndex 排序开始的左边界索引
 * @param rightIndex 排序结束的右边界索引
 * @returns 返回排序后的数组
 */
export const quickSortInPlace = (arr: number[], leftIndex?: number, rightIndex?: number) => {
  let len = arr.length
  let partitionIndex: number

  // 初始化左右边界索引
  leftIndex = typeof leftIndex === 'number' ? leftIndex : 0
  rightIndex = typeof rightIndex === 'number' ? rightIndex : len - 1

  // 当左边界小于右边界时，执行快速排序
  if (leftIndex < rightIndex) {
    // 获取分区索引
    partitionIndex = partition(arr, leftIndex, rightIndex)
    // 对左半部分进行快速排序
    quickSortInPlace(arr, leftIndex, partitionIndex - 1)
    // 对右半部分进行快速排序
    quickSortInPlace(arr, partitionIndex + 1, rightIndex)
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
const partition = (arr: number[], leftIndex: number, rightIndex: number) => {
  // 设定基准值（pivot）, 以第一个元素作为基准值
  let pivot = leftIndex
  // 从第二个元素开始遍历
  let rawIndex = pivot + 1

  /**
   * 此处的实现隐藏了部分细节：
   * 1、pivot 的索引在循环保持不变，即第一位不变
   * 2、从第二开始遍历，若比基准值小：
   *      2.1: 将小于基础值元素与 rawIndex 位置的元素交换，以保证 "小于基准值的元素移动到左侧(基准值)区域"
   *      2.2: rawIndex 会自增1，表示在循环后，基准索引将在 rawIndex 的位置
   * 3、循环的结果是："小于基准值的元素移动到左侧区域"，同样意味着 "大于基准值的元素移动到右侧区域"
   */

  // 遍历数组，根据基准值进行分区
  for (let compareIndex = rawIndex; compareIndex <= rightIndex; compareIndex++) {
    // 当前元素小于基准值时，将其与 index 位置的元素交换，并更新index
    if (arr[compareIndex] < arr[pivot]) {
      swap(arr, compareIndex, rawIndex)
      rawIndex++
    }
  }

  // 将基准值放置到正确的位置
  swap(arr, pivot, rawIndex - 1)

  // 返回基准值的最终索引
  return rawIndex - 1
}

/**
 * 交换数组中两个元素的位置
 *
 * @param arr 数组
 * @param leftIndex 左侧元素索引
 * @param rightIndex 右侧元素索引
 */
const swap = (arr: number[], leftIndex: number, rightIndex: number) => {
  const temp = arr[leftIndex]

  // 交换元素位置
  arr[leftIndex] = arr[rightIndex]
  arr[rightIndex] = temp
}
