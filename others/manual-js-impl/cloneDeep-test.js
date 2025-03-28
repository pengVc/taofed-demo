import cloneDeep from './cloneDeep.js'

// 测试辅助函数
function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.error(`❌Test failed: ${message}`)
    console.error(`ℹ️Expected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`)
  } else {
    console.log(`✅Test passed: ${message}`)
  }
}

function assertShadowEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌Test failed: ${message}`)
    console.error(`ℹ️Expected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`)
  } else {
    console.log(`✅Test passed: ${message}`)
  }
}

function assertNotEqual(actual, expected, message) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.error(`❌Test failed: ${message}`)
    console.error(`ℹ️Expected not to be equal: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`)
  } else {
    console.log(`✅Test passed: ${message}`)
  }
}

function assertNotShadowEqual(actual, expected, message) {
  if (actual === expected) {
    console.error(`❌Test failed: ${message}`)
    console.error(`ℹ️Expected not to be equal: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`)
  } else {
    console.log(`✅Test passed: ${message}`)
  }
}


// 测试用例
function testCloneDeep() {
  // 测试数组输入
  const arrayOriginal = [1, [2, 3], 4]
  const arrayCloned = cloneDeep(arrayOriginal)
  assertEqual(arrayCloned, arrayOriginal, 'Array should be cloned correctly')
  assertNotShadowEqual(arrayCloned, arrayOriginal, 'Cloned array should not be the same object')

  // 测试正则表达式输入
  const regexOriginal = /test/g
  const regexCloned = cloneDeep(regexOriginal)
  assertEqual(regexCloned.toString(), regexOriginal.toString(), 'Regex should be cloned correctly')
  assertNotShadowEqual(regexCloned, regexOriginal, 'Cloned regex should not be the same object')

  // 测试普通对象输入
  const objectOriginal = { a: 1, b: { c: 2, d: [3, 4] } }
  const objectCloned = cloneDeep(objectOriginal)
  assertEqual(objectCloned, objectOriginal, 'Object should be cloned correctly')
  assertNotShadowEqual(objectCloned, objectOriginal, 'Cloned object should not be the same object')

  // 测试基本类型输入
  const primitiveOriginal = 42
  const primitiveCloned = cloneDeep(primitiveOriginal)
  assertEqual(primitiveCloned, primitiveOriginal, 'Primitive should be returned correctly')

  // 测试空对象或空数组
  const emptyObjectOriginal = {}
  const emptyObjectCloned = cloneDeep(emptyObjectOriginal)
  assertEqual(emptyObjectCloned, emptyObjectOriginal, 'Empty object should be cloned correctly')
  assertNotShadowEqual(emptyObjectCloned, emptyObjectOriginal, 'Cloned empty object should not be the same object')

  const emptyArrayOriginal = []
  const emptyArrayCloned = cloneDeep(emptyArrayOriginal)
  assertEqual(emptyArrayCloned, emptyArrayOriginal, 'Empty array should be cloned correctly')
  assertNotShadowEqual(emptyArrayCloned, emptyArrayOriginal, 'Cloned empty array should not be the same object')

  // 测试循环引用
  const circularOriginal = {
    a: 1,
    b: 2,
    c: 3,
  }
  circularOriginal.self = circularOriginal
  const circularCloned = cloneDeep(circularOriginal)

  /**
   * assertEqual 内部使用了 JSON.stringify
   * 故此处需要删除循环引用的属性，再测试
   */
  delete circularOriginal.self
  const backupCircularCloned = circularCloned.self
  delete circularCloned.self
  assertEqual(circularCloned, circularOriginal, 'Circular reference should be handled correctly')
  circularOriginal.self = circularOriginal
  circularCloned.self = backupCircularCloned

  assertNotShadowEqual(circularCloned, circularOriginal, 'Cloned circular reference should not be the same object')
  assertShadowEqual(circularCloned.self, circularCloned, 'Cloned circular reference should point to itself')
}

// 运行测试
testCloneDeep()
