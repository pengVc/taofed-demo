import { bubbleSort } from './bubbleSort'

// 定义一个简单的断言函数
const assertEqualArrays = (actual: number[], expected: number[], testName: string): void => {
  const isPassing = JSON.stringify(actual) === JSON.stringify(expected)
  if (isPassing) {
    console.log(`✅ Test Passed: ${testName}`)
  } else {
    console.error(`❌ Test Failed: ${testName}`)
    console.error(`Expected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`)
  }
};

// 测试用例
(() => {
  // 测试用例 1: 空数组
  const nums1: number[] = []
  bubbleSort(nums1)
  assertEqualArrays(nums1, [], 'Test Case 1: Empty array')

  // 测试用例 2: 单个元素
  const nums2: number[] = [1]
  bubbleSort(nums2)
  assertEqualArrays(nums2, [1], 'Test Case 2: Single element array')

  // 测试用例 3: 已排序数组
  const nums3: number[] = [1, 2, 3, 4, 5]
  bubbleSort(nums3)
  assertEqualArrays(nums3, [1, 2, 3, 4, 5], 'Test Case 3: Already sorted array')

  // 测试用例 4: 反向排序数组
  const nums4: number[] = [5, 4, 3, 2, 1]
  bubbleSort(nums4)
  assertEqualArrays(nums4, [1, 2, 3, 4, 5], 'Test Case 4: Reverse sorted array')

  // 测试用例 5: 随机顺序数组
  const nums5: number[] = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
  bubbleSort(nums5)
  assertEqualArrays(nums5, [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9], 'Test Case 5: Randomly ordered array')

  // 测试用例 6: 包含重复元素的数组
  const nums6: number[] = [3, 3, 2, 1, 2, 1]
  bubbleSort(nums6)
  assertEqualArrays(nums6, [1, 1, 2, 2, 3, 3], 'Test Case 6: Array with duplicate elements')
})()
