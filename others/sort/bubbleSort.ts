/**
 * 使用冒泡排序算法对数字数组进行排序
 * 冒泡排序是一种简单的排序算法，它重复地遍历要排序的数列，
 * 一次比较两个元素，如果它们的顺序错误就把它们交换过来
 * 遍历数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成
 *
 * @param nums 待排序的数字数组
 * @returns 排序后的数字数组
 */
export const bubbleSort = (nums: number[]) => {
  // 获取数组长度
  const numsLength = nums?.length

  // 如果数组为空或只有一个元素，则不需要排序，直接返回原数组
  if (!numsLength || numsLength < 2) {
    return nums
  }

  // 外层循环控制排序的轮数，每轮找到一个最大或最小的元素
  for (let len = numsLength; len >= 0; len--) {
    // 标记本轮是否进行了交换，如果没有交换说明数组已经有序，可以提前结束排序
    let isNumsSorted = true

    // 内层循环负责进行相邻元素的比较和交换
    for (let index = 0; index + 1 < len; index++) {
      // 获取当前元素和下一个元素
      const curNum = nums[index]
      const nextNum = nums[index + 1]

      // 如果当前元素大于下一个元素，则交换它们的位置
      if (curNum > nextNum) {
        swap(nums, index, index + 1)
        // 既然发生了交换，标记数组为未排序状态
        isNumsSorted = false
      }
    }

    // 如果本轮没有发生任何交换，说明数组已经排序完成，可以提前结束
    if (isNumsSorted) {
      break
    }
  }

}

/**
 * 交换数组中两个指定位置的元素
 *
 * @param nums 数组
 * @param left 左侧元素的索引
 * @param right 右侧元素的索引
 */
const swap = (nums, left, right) => {
  // 临时保存左侧元素的值
  const rawLeft = nums[left]

  // 将左侧位置的元素替换为右侧元素
  nums[left] = nums[right]
  // 将右侧位置的元素替换为原左侧元素
  nums[right] = rawLeft
}
