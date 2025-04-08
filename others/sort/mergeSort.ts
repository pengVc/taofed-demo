/**
 * 使用归并排序对数组进行排序
 * 归并排序是一种分而治之的算法，它将数组分成两半，分别排序，然后合并
 *
 * @param nums 待排序的数组
 * @returns 返回排序后的数组
 */
export const mergeSort = (nums: number[]) => {
  // 获取数组长度
  const numsLen = nums.length

  // 如果数组长度小于等于1，说明数组已经排序完成，直接返回
  if (numsLen <= 1) {
    return nums
  }

  // 计算分割数组的索引
  const divIndex = Math.floor(numsLen / 2)

  // 递归地对右半部分数组进行归并排序
  const rightNums = mergeSort(nums.splice(divIndex))
  // 递归地对左半部分数组进行归并排序
  const leftNums = mergeSort(nums.splice(0, divIndex))

  // 将两个有序数组合并
  while (leftNums.length && rightNums.length) {
    // 将较小的元素放入结果数组，并从原数组中移除该元素
    nums.push(leftNums[0] < rightNums[0] ? leftNums.shift() : rightNums.shift())
  }

  // 如果左半部分数组还有剩余，直接添加到结果数组
  nums.push(...leftNums)
  // 如果右半部分数组还有剩余，直接添加到结果数组
  nums.push(...rightNums)

  // 返回合并后的数组
  return nums
}


/**
 * 使用归并排序对数组进行排序
 * 归并排序是一种分而治之的算法，它将数组分成两半，分别排序，然后合并
 *
 * @param nums 待排序的数组
 * @returns 返回排序后的数组
 */
export const mergeSortOpt = (nums: number[]): number[] => {
  // 输入校验
  if (!Array.isArray(nums) || !nums.every((num) => typeof num === 'number')) {
    throw new Error('Input must be an array of numbers')
  }

  // 如果数组长度小于等于1，说明数组已经排序完成，直接返回
  if (nums.length <= 1) {
    return nums
  }

  // 计算分割数组的索引
  const mid = Math.floor(nums.length / 2)

  // 递归地对左半部分和右半部分数组进行归并排序
  const left = mergeSort(nums.slice(0, mid))
  const right = mergeSort(nums.slice(mid))

  nums.length = 0
  // 合并两个有序数组
  nums.push(...merge(left, right))

  return nums
}

/**
 * 合并两个有序数组
 *
 * @param left 左侧有序数组
 * @param right 右侧有序数组
 * @returns 合并后的有序数组
 */
const merge = (left: number[], right: number[]): number[] => {
  const result: number[] = []
  let i = 0 // 左数组指针
  let j = 0 // 右数组指针

  // 使用双指针合并两个有序数组
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }

  // 将剩余元素添加到结果数组
  while (i < left.length) {
    result.push(left[i])
    i++
  }
  while (j < right.length) {
    result.push(right[j])
    j++
  }

  return result
}
