/**
 * 快速排序算法
 * 通过递归方式，对数组进行排序
 *
 * @param nums 待排序的数字数组
 * @returns 排序后的数组
 */
export function quickSort(nums: number[]) {
  // 获取数组长度
  let len = nums.length
  // 如果数组长度小于2，说明数组已经有序或为空，直接返回
  if (len < 2) { return nums }

  // 随机选取 基准值
  const pivotVal = nums[Math.floor(Math.random() * len)]
  // 初始化左右两个子数组
  const leftArr = [], rightArr = []

  // 保存原始数组长度，用于后续判断
  const originLength = len
  // 初始化基准值重复计数器
  let edgeCount = 0

  // 遍历数组，将元素分配到左右子数组
  while (len--) {
    let item = nums.pop()

    // 根据元素与基准值的比较，决定其所属的子数组
    if (item >= pivotVal) {
      rightArr.push(item)
    } else {
      leftArr.push(item)
    }

    // 记录 与基准值 重复值
    if (item === pivotVal) { edgeCount++ }
  }

  // 特殊 Case：本组数据均是重复值，直接返回
  if (edgeCount === originLength) { return rightArr }

  // 尾递归，对左右子数组进行快速排序，并合并结果
  return nums.concat(quickSort(leftArr), quickSort(rightArr))
}


/**
 * 快速排序算法
 * 通过递归方式，对数组进行排序
 *
 * @param nums 待排序的数字数组
 * @returns 排序后的数组
 */
export function quickSortV2(nums: number[]): number[] {
  // 如果数组长度小于等于1，直接返回
  if (nums.length <= 1) return [...nums];

  // 使用三数取中法选择基准值
  const pivotIndex = medianOfThree(nums, 0, nums.length - 1);
  const pivotVal = nums[pivotIndex];

  // 将数组分为小于、等于和大于基准值的三部分
  const leftArr: number[] = [];
  const rightArr: number[] = [];
  const equalArr: number[] = [];

  for (const num of nums) {
    if (num < pivotVal) {
      leftArr.push(num);
    } else if (num > pivotVal) {
      rightArr.push(num);
    } else {
      equalArr.push(num);
    }
  }

  // 递归排序左右子数组，并合并结果
  return [...quickSort(leftArr), ...equalArr, ...quickSort(rightArr)];
}

/**
 * 三数取中法，选择一个更优的基准值
 * @param arr 输入数组
 * @param left 左边界索引
 * @param right 右边界索引
 * @returns 中位数的索引
 */
function medianOfThree(arr: number[], left: number, right: number): number {
  const center = Math.floor((left + right) / 2);

  // 按顺序排列三个值
  if (arr[left] > arr[center]) swap(arr, left, center);
  if (arr[left] > arr[right]) swap(arr, left, right);
  if (arr[center] > arr[right]) swap(arr, center, right);

  // 返回中间值的索引
  return center;
}

/**
 * 交换数组中的两个元素
 * @param arr 数组
 * @param i 索引1
 * @param j 索引2
 */
function swap(arr: number[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
