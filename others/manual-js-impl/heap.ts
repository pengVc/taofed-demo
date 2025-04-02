interface IHeap {
  size(): number

  swap(aIndex: number, bIndex: number): void

  left(i: number): number | null

  right(i: number): number | null

  parent(i: number): number | null

  findDeepRightLeafByBFS(index: number): number

  findDeepRightLeafByDFS(index: number, depth: number)
}

export default class Heap implements IHeap {
  private maxHeap: number[]
  private __rightLeaf: number

  constructor(maxHeap) {
    this.maxHeap = maxHeap
  }

  size(): number {
    return this.maxHeap.length
  }

  swap(aIndex: number, bIndex: number) {
    const rawA = this.maxHeap[aIndex]

    this.maxHeap[aIndex] = this.maxHeap[bIndex]
    this.maxHeap[bIndex] = rawA
  }

  // 辅助方法：检查索引是否有效
  private isValidIndex(index: number): boolean {
    // 假设树的大小为 this.size，具体实现根据实际需求调整
    return index >= 0 && index < this.size()
  }

  /* 获取左子节点的索引 */
  left(i: number): number | null {
    const resultIndex = 2 * i + 1
    const size = this.size()

    // 无左子节点
    if (resultIndex >= size) {
      return null
    }

    return resultIndex
  }

  /* 获取右子节点的索引 */
  right(i: number): number | null {
    const resultIndex = 2 * i + 2
    const size = this.size()

    // 无右子节点
    if (resultIndex >= size) {
      return null
    }

    return resultIndex
  }

  /* 获取父节点的索引 */
  parent(i: number): number | null {
    const resultIndex = Math.floor((i - 1) / 2) // 向下整除

    // 无父亲节点 (根节点)
    if (resultIndex < 0) {
      return null
    }

    return resultIndex
  }

  // 寻找右侧叶节点，BFS 模式
  findDeepRightLeafByBFS(index) {
    let reuslt

    const children = [index]

    while (true) {
      const curIndex = children.unshift()

      const curChildLeft = this.left(curIndex)
      if (curChildLeft) {
        children.push(curChildLeft)
      }

      const curChildRight = this.right(curIndex)
      if (curChildRight) {
        children.push(curChildRight)
      }

      if (children.length === 0) {
        reuslt = curIndex
        break
      }
    }

    return reuslt
  }

  /**
   * 使用深度优先搜索找到当前节点下的最深右叶节点
   * @param index 当前节点的索引
   * @param depth 当前节点的深度，默认为1
   * @returns 返回最深右叶节点的索引
   */
  findDeepRightLeafByDFS(index: number) {
    // 获取当前节点的左子节点和右子节点，过滤掉不存在的节点
    const children = [this.left(index), this.right(index)].filter(Boolean)

    // 如果没有子节点，说明当前节点是叶节点，直接返回其索引
    if (children.length === 0) {
      return index
    }

    // 从右到左遍历子节点，寻找最深的右叶节点
    for (let lastIndex = children.length - 1; lastIndex >= 0; lastIndex--) {
      // 如果已经找到了右叶节点，则停止搜索
      if (this.__rightLeaf) {
        break
      }

      // 获取当前子节点
      const child = children[lastIndex]
      // 递归在当前子节点中寻找最深的右叶节点
      this.findDeepRightLeafByDFS(child)

      // 经过递归之后，调用栈第一次执行的是最深的右叶节点，所以直接返回即可
      this.__rightLeaf = child
    }

    // 保存最深的右叶节点的索引
    const result = this.__rightLeaf
    // 删除标记，以便下一次搜索
    delete this.__rightLeaf

    // 返回最深的右叶节点的索引
    return result
  }

  /**
   * 使用深度优先搜索找到当前节点下的最深右叶节点
   * @param index 当前节点的索引
   * @param depth 当前节点的深度，默认为1
   * @returns 返回最深右叶节点的索引
   */
  findDeepRightLeaf_DFS_V2(index: number): number | null {
    // 边界条件检查：如果索引无效，直接返回 null
    if (!this.isValidIndex(index)) {
      return null
    }

    // 获取当前节点的左子节点和右子节点，过滤掉不存在的节点
    const children = [this.left(index), this.right(index)].filter(Boolean)


    // 如果没有子节点，说明当前节点是叶节点，直接返回其索引
    if (children.length === 0) {
      return index
    }

    // 从右到左遍历子节点，寻找最深的右叶节点
    for (let lastIndex = children.length - 1; lastIndex >= 0; lastIndex--) {
      // 获取当前子节点
      const child = children[lastIndex]

      // 递归在当前子节点中寻找最深的右叶节点
      const result = this.findDeepRightLeafByDFS(child)

      // 如果找到了右叶节点，则停止搜索并返回结果
      if (result !== null) {
        return result
      }
    }

    // 如果所有子节点都没有找到右叶节点，返回 null
    return null
  }
}
