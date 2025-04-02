/**
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 */
function longestConsecutive(nums: number[]): number {
  let consecutiveLength = 0

  if (!nums || nums.length === 0) {
    return consecutiveLength
  }

  consecutiveLength = 1
  const memoCalculatedNums = []
  const pureNums = [...new Set(nums)]
  const numsLength = pureNums.length

  for (let curIndex = 0; curIndex < numsLength; curIndex++) {
    let count = 1
    let nextNum = pureNums[curIndex]

    if (memoCalculatedNums.includes(nextNum)) {
      continue
    }

    memoCalculatedNums.push(nextNum)

    if ((consecutiveLength + (numsLength - curIndex - 1)) > numsLength) {
      break
    }

    while (true) {
      nextNum++
      if (pureNums.includes(nextNum)) {
        count++
      } else {
        consecutiveLength = consecutiveLength > count ? consecutiveLength : count
        break
      }
    }
  }
  return consecutiveLength
}


// const nums = [100, 4, 200, 1, 3, 2]
const nums = [1, 0, -1]

const res = longestConsecutive(nums)

console.log(res)
