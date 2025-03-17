// 定义 MutationObserver 的构造函数，优先使用标准的 MutationObserver，其次是 WebKit 和 Mozilla 的前缀版本
const
  MutationObserverConstructor = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
  queueCallback = [] // 用于存储需要在微任务队列中执行的回调函数

// 创建一个 MutationObserver 实例，并在 DOM 变化时执行回调函数
const observer = new MutationObserverConstructor(() => {
  // 遍历 queueCallback 数组，依次执行其中的回调函数
  queueCallback.forEach(cb => cb())
  // 清空 queueCallback 数组，以便后续重新使用
  queueCallback.length = 0
})

// 初始化一个计数器，用于触发 DOM 变化
let counter = 1
// 创建一个文本节点，其内容为计数器的当前值
const node = document.createTextNode(String(counter))
// 观察文本节点的内容变化
observer.observe(node, { characterData: true })

// 定义一个函数，用于将回调函数添加到微任务队列中
function setMicrotask(cb) {
  // 检查传入的参数是否为函数，如果不是则直接返回
  if ('function' !== typeof cb) { return }

  // 更新计数器的值，并将其转换为字符串后设置为文本节点的内容
  counter = (counter + 1) % 2
  node.data = String(counter)

  // 将回调函数添加到 queueCallback 数组中，以便在 DOM 变化时执行
  queueCallback.push(cb)
}

// 输出日志，表示当前处于执行上下文
console.log('i am in execution context')

// 将一个回调函数添加到微任务队列中
setMicrotask(() => {
  console.log('i am microtask I')
})

// 输出日志，表示当前处于执行上下文
console.log('i am in execution context II ')

// 将一个宏任务添加到任务队列中
setTimeout(() => {
  console.log('i am macrotask')
})

// 将另一个回调函数添加到微任务队列中
setMicrotask(() => {
  console.log('i am microtask II')
})
