Function.prototype.likeBind = function (...args) {
  // 使用解构赋值获取参数：
  // context 是绑定的目标上下文（默认为 null）
  // paramBind 是预绑定的参数列表（剩余参数）
  const [context = null, ...paramBind] = args

  // 保存当前函数的引用（this 指向调用 likeBind 的函数）
  const _this = this

  // 返回一个新的函数 bind，模拟原生 bind 的行为
  return function bind(...param) {
    // 判断新函数是否通过 new 调用（即是否是构造函数调用）
    if (this instanceof bind) {
      // 如果是构造函数调用，则返回一个新的实例
      // 使用 new 调用时，忽略传入的 context，直接使用 _this 作为构造函数
      return new _this(...[...paramBind, ...param])
    }

    // 如果不是构造函数调用，则将函数应用到指定的上下文 context 上
    // 将预绑定参数 paramBind 和调用时传入的参数 param 合并后执行
    return _this.apply(context, paramBind.concat(param))
  }
}

/* --- 运行示例 --- */

const aManNamedLuke = {
  name: 'Luke'
}

const aManNamedAlpha = {
  name: 'Alpha'
}

function greet(intro) {
  console.log(`hello my name is ${this.name}, and ${intro || 'nothing'}`)

  return this.name
}

let res

res = greet.likeBind(aManNamedLuke)()
console.assert(res, aManNamedLuke.name)

res = greet.likeBind(aManNamedAlpha)('i am good at analyzing')
console.assert(res, aManNamedLuke.name)

greet.likeBind(aManNamedAlpha, 'i am good at analyzing')()
console.assert(res, aManNamedAlpha.name)

const Man = function (name, intro) {
  this.name = name
  this.intro = intro
}.likeBind(null, 'jober', 'anything good at')

Man.prototype = {
  constructor: Man
}

const jober = new Man()

console.log(jober.name, jober.intro)
console.assert(jober.name, 'jober')
console.assert(jober.intro, 'anything good at')
