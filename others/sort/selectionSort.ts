/**
 * 使用选择排序算法对数组进行排序
 * 该算法通过反复寻找剩余元素中的最小值，并将其放置于正确的位置
 *
 * @param nums 待排序的数字数组
 */
export const selectionSort = (nums: number[]) => {
  // 获取数组长度，用于后续的循环
  const numsLength = nums?.length

  // 外层循环，遍历数组的每一个元素
  for (let index = 0; index < numsLength; index++) {
    // 初始化当前认为的最小值的索引为当前外层循环的索引
    let minValIndex = index

    // 内层循环，用于寻找从index+1开始到数组末尾的最小值的索引
    for (let indexInner = index + 1; indexInner < numsLength; indexInner++) {
      // 如果找到了更小的值，则更新最小值的索引
      if (nums[indexInner] < nums[minValIndex]) {
        minValIndex = indexInner
      }
    }

    // 如果最小值的索引没有变化，说明当前外层循环的索引处已经是最小值，无需交换，继续下一次外层循环
    if (minValIndex === index) {
      continue
    }

    // 调用swap函数，交换当前外层循环索引处的值和找到的最小值
    swap(nums, index, minValIndex)
  }
}

/**
 * 交换数组中两个元素的位置
 *
 * @param nums 数组
 * @param left 要交换的第一个元素的索引
 * @param right 要交换的第二个元素的索引
 */
const swap = (nums, left, right) => {
  // 保存第一个元素的值
  const rawLeft = nums[left]

  // 将第一个元素的值替换为第二个元素的值
  nums[left] = nums[right]
  // 将第二个元素的值替换为第一个元素的值，完成交换
  nums[right] = rawLeft
}
