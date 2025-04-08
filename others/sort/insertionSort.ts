export const insertionSort = (nums: number[]) => {
  // 获取数组长度
  const numsLength = nums.length

  // 外层循环遍历数组，从第二个元素开始
  for (let index = 1; index < numsLength; index++) {
    // 内层循环，将当前元素与前面已排序的元素比较并交换位置
    for (let indexInner = index; indexInner > 0; indexInner--) {
      // 如果当前元素小于前一个元素，则交换两者位置
      if (nums[indexInner] < nums[indexInner - 1]) {
        swap(nums, indexInner, indexInner - 1)
      } else {
        // 如果当前元素不小于前一个元素，则跳出内层循环
        break
      }
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
