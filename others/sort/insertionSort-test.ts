import { insertionSort } from './insertionSort'

const assertEqualArrays = (actual: number[], expected: number[], testName: string): void => {
  const isPassing = JSON.stringify(actual) === JSON.stringify(expected)
  if (isPassing) {
    console.log(`✅ Test Passed: ${testName}`)
  } else {
    console.error(`❌ Test Failed: ${testName}`)
    console.error(`Expected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`)
  }
}

function runTests() {
  // Test case 1: Empty array
  let arr: number[] = []
  insertionSort(arr)
  assertEqualArrays(arr, [], 'Test case 1: Empty array')

  // Test case 2: Single element
  arr = [1]
  insertionSort(arr)
  assertEqualArrays(arr, [1], 'Test case 2: Single element')

  // Test case 3: Already sorted array
  arr = [1, 2, 3, 4, 5]
  insertionSort(arr)
  assertEqualArrays(arr, [1, 2, 3, 4, 5], 'Test case 3: Already sorted array')

  // Test case 4: Unsorted array
  arr = [5, 3, 8, 4, 2]
  insertionSort(arr)
  assertEqualArrays(arr, [2, 3, 4, 5, 8], 'Test case 4: Unsorted array')

  // Test case 5: Array with duplicate elements
  arr = [3, 1, 2, 3, 1]
  insertionSort(arr)
  assertEqualArrays(arr, [1, 1, 2, 3, 3], 'Test case 5: Array with duplicate elements')

  // Test case 6: Array with negative numbers and zero
  arr = [-1, 0, 5, -3, 2]
  insertionSort(arr)
  assertEqualArrays(arr, [-3, -1, 0, 2, 5], 'Test case 6: Array with negative numbers and zero')
}

runTests()
