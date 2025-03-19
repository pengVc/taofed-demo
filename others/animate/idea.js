/**
 * 执行动画绘制
 * @param {Object} params - 动画参数对象
 * @returns {{cancel: (function(): void)}} - 返回一个包含取消动画方法的对象
 */
function runRaf(params) {
  // 解构动画参数，设置默认动画时间为10秒
  const {
    duration = 10,
    curve,
    request,
    manual
  } = params ?? {}
  let requestId
  // 使用performance.now()获取更精确的开始时间
  let startTime = performance.now()
  let count = 0

  /**
   * 动画每一帧的回调函数
   * @param {number} time - 当前时间戳
   */
  const frame = (time) => {
    // 计算当前时间与开始时间的差值
    const dfTime = time - startTime
    // 计算动画的进行比例
    const progress = dfTime / (duration * 1000)
    // 判断动画是否结束
    const isEnd = progress >= 1

    // 计数当前绘制次数
    count++

    // 执行请求函数，传入当前动画进行比例和缓动值
    request?.(curve(progress), {
      end: isEnd,
      count
    })

    // 如果动画未结束，继续请求下一帧
    if (!isEnd) {
      requestId = requestAnimationFrame(frame)
    }
  }

  // 如果不手动控制动画，则自动开始
  if (!manual) {
    requestId = requestAnimationFrame(frame)
  }

  // 手动控制动画的函数
  const run = () => {
    requestId = requestAnimationFrame(frame)
  }

  /**
   * 返回一个对象，包含取消动画的方法
   * @returns {void}
   */
  return {
    run,
    cancel: () => cancelAnimationFrame(requestId)
  }
}

/**
 * 使用Sine函数模拟动画的easeIn效果
 * @param {number} x - 动画的进行比例，范围为0到1
 * @returns {number} - 返回动画进行比例对应的缓动值
 */
const easeInSine = (x) => {
  return 1 - Math.cos((x * Math.PI) / 2)
}

// 定义动画的总距离为500px
const totalDistance = 500

// 定义动画的持续时间为1秒
const duration = 1

// 记录动画开始的时间戳
const startTime = Date.now()
console.log('Start time:', startTime)

// 执行动画，传入动画参数
runRaf({
  duration,
  curve  : easeInSine,
  request: (offset, { end, count }) => {
    // 计算动画位移量，真实场景下，需要加上原始坐标，得到当前帧的坐标
    const currentDistance =  Math.min(totalDistance * offset, totalDistance)

    // 根据动画进行比例计算当前应移动的距离，并限制在总距离范围内
    console.log({
      offset,
      currentDistance,
    })

    // 动画结束时，输出绘制次数和帧率
    if (end) {
      const endTime = Date.now()
      console.log(`动画绘制了 ${count} 次，`, `帧率约为 ${count / duration} 帧`)
      console.log('End time:', endTime)
      console.log('Time cost', endTime - startTime)
    }
  }
})
