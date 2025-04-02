import Heap from './heap'

// 测试用例
function runTests() {
  let passed = 0;
  let failed = 0;

  function assertEqual(actual, expected, message) {
    if (actual === expected) {
      passed++;
      console.log(`✅ Test Passed: ${message}`);
    } else {
      failed++;
      console.error(`❌ Test Failed: ${message} - Expected: ${expected}, Got: ${actual}`);
    }
  }

  let heap
  let data
  let targetIndex

  // 测试 1: 无效索引
  // 创建一个 Heap 类实例用于测试
  heap = new Heap([1, 2, 3, 4, 5]);
  assertEqual(heap.findDeepRightLeaf_DFS_V2(10), null, "Invalid index should return null");

  // 测试 2: 叶节点
  heap = new Heap([1, 2, 3, 4, 5])
  assertEqual(heap.findDeepRightLeaf_DFS_V2(4), 4, "Leaf node should return its own index");

  // 测试 3: 单个子节点
  heap = new Heap([1, 2, 3, 4])
  assertEqual(heap.findDeepRightLeaf_DFS_V2(1), 3, "Node with a single child should return the leaf index");

  // 测试 4: 多个子节点
  data = [1, 2, 3, 4, 5, 6, 7]
  heap = new Heap(data)
  targetIndex = heap.findDeepRightLeaf_DFS_V2(0)
  assertEqual(data[targetIndex], 7, "Node with multiple children should return the deepest right leaf");

  // 测试 5: 无右叶节点
  data = [1, 2, 3]
  heap = new Heap([1, 2, 3])
  targetIndex = heap.findDeepRightLeaf_DFS_V2(0)
  assertEqual(data[targetIndex], 3, "Tree with no right leaf should return null");

  // 输出测试结果
  console.log(`\nTests Summary: Passed: ${passed}, Failed: ${failed}`);
}

// 运行测试
runTests();
