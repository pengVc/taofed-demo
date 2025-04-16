// 上下文类，用于存储全局信息
class Context {
  constructor(private data: string) {}

  // 获取数据
  getData(): string {
    return this.data
  }

  // 设置数据
  setData(data: string): void {
    this.data = data
  }
}

// 表达式接口
interface Expression {
  interpret(context: Context): number;
}

// 数字终结符表达式
class NumberExpression implements Expression {
  private value: number

  constructor(value: number) {
    this.value = value
  }

  // 解释数字
  interpret(context: Context): number {
    return this.value
  }
}

// 加法表达式
class AddExpression implements Expression {
  private left: Expression
  private right: Expression

  constructor(left: Expression, right: Expression) {
    this.left = left
    this.right = right
  }

  // 解释加法
  interpret(context: Context): number {
    return this.left.interpret(context) + this.right.interpret(context)
  }
}

// 减法表达式
class SubtractExpression implements Expression {
  private left: Expression
  private right: Expression

  constructor(left: Expression, right: Expression) {
    this.left = left
    this.right = right
  }

  // 解释减法
  interpret(context: Context): number {
    return this.left.interpret(context) - this.right.interpret(context)
  }
}

// 客户端代码
class InterpreterClient {
  /**
   * 构建抽象语法树
   *
   * @param expression 字符串形式的算术表达式
   * @returns 返回表达式的抽象语法树（AST）
   */
  private static buildAST(expression: string): Expression {
    // 将表达式分割成单词（tokens）
    const tokens = expression.split(' ')
    // 创建一个栈，用于存储表达式节点
    const stack: Expression[] = []

    // 遍历每个单词，构建抽象语法树
    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i]
      // 判断单词是否为数字
      if (!isNaN(Number(token))) {
        // 如果是数字，创建一个数字表达式，并压入栈中
        stack.push(new NumberExpression(Number(token)))
      } else {
        // 如果是操作符，从栈中弹出两个操作数，并创建一个新的表达式
        const left = stack.pop()
        // 由于中缀表达式的特点，需要提前获取下一个操作数
        const right = new NumberExpression(Number(tokens[i + 1]))

        // 如果栈中没有足够的操作数，抛出错误
        if (!left || !right) {
          throw new Error('Invalid expression format')
        }

        // 根据操作符类型，创建相应的表达式节点，并压入栈中
        if (token === '+') {
          stack.push(new AddExpression(left, right))
        } else if (token === '-') {
          stack.push(new SubtractExpression(left, right))
        }

        // 跳过下一个操作数，因为它已经被使用了
        i++
      }

    }

    // 返回根节点，即抽象语法树的入口
    return stack[0] as Expression
  }

  // 解释表达式
  public static interpret(expression: string): number {
    const context = new Context(expression)
    const ast = this.buildAST(expression)

    return ast.interpret(context)
  }
}

// 测试
const expression = '1 + 2 + 3 + 4 - 1 - 2'
const result = InterpreterClient.interpret(expression)
console.log(`The result of '${expression}' is ${result}`) // The result of '5 + 4 - 3' is 6
