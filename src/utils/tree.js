/**
 * 树形数据处理
 * tree-tool
 * 参考：https://github.com/Lushenggang/js-tree-tool
 */

const DEFAULT_CONFIG = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}

const getConfig = (config) => Object.assign({}, DEFAULT_CONFIG, config)

/**
 * 列表结构转树结构
 * @param {array} list 列表数据
 * @param {object} config 键名配置
 * @returns
 */
export function toTree(list, config = {}) {
  config = getConfig(config)
  const nodeMap = new Map(),
    result = [],
    { id, children, pid } = config
  // 第一遍循环生成nodeMap
  for (const node of list) {
    nodeMap.set(node[id], node)
  }
  // 第二遍循环将【每项放到对应的父级下】，如果没有则父级放到result
  for (const node of list) {
    const parent = nodeMap.get(node[pid])
    if (parent) {
      if (parent[children]) {
        parent[children].push(node)
      } else {
        parent[children] = [node]
      }
    } else {
      result.push(node)
    }
  }
  return result
}

/**
 * 树结构转列表结构
 * @param {array} tree 树状数据
 * @param {object} config 键名配置
 * @param {boolean} delChildren 是否删除 children
 * @returns
 */
export function toList(tree, config = {}, delChildren) {
  config = getConfig(config)
  // 先放入第一层
  const { children } = config,
    result = [...tree]
  for (let i = 0; i < result.length; i++) {
    if (result[i][children] && result[i][children].length) {
      result.splice(i + 1, 0, ...result[i][children])
      if (delChildren) {
        delete result[i][children]
      }
    }
  }
  return result
}

/**
 * 查询节点路径
 * @param {array} tree
 * @param {function} func
 * @param {object} config
 * @returns
 */
export function treeFindPath(tree, func, config = {}, path = []) {
  config = getConfig(config)
  if (!tree) return []
  for (const data of tree) {
    path.push(data[config.id])
    if (func(data)) return path
    if (data[config.children]) {
      const findChildren = treeFindPath(data[config.children], func, config, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}

/**
 * 深度优先查询
 * @param {array} tree
 * @param {function} func
 * @returns
 */
export function findNodeDfs(tree, func, config = {}) {
  config = getConfig(config)
  const { children } = config
  var stark = []
  stark = stark.concat(tree)
  while (stark.length) {
    var temp = stark.shift()
    if (temp[children]) {
      stark = temp[children].concat(stark)
    }
    if (func(temp)) return temp
  }
  return null
}

/**
 * 广度优先查询
 * @param {array} tree
 * @param {function} func
 * @returns
 */
export function findNodeBfs(tree, func, config = {}) {
  config = getConfig(config)
  const { children } = config
  var stark = []
  stark = stark.concat(tree)
  while (stark.length) {
    var temp = stark.shift()
    if (temp[children]) {
      stark = stark.concat(temp[children])
    }
    if (func(temp)) return temp
  }
  return null
}

/**
 * 查找符合条件的所有节点
 * @param {array} tree 树型数据
 * @param {function} func 判断函数
 * @param {any} config 配置参数
 * @returns
 */
export function findNodeAll(tree, func, config = {}) {
  config = getConfig(config)
  const { children } = config,
    list = [...tree],
    result = []
  for (let node of list) {
    func(node) && result.push(node)
    node[children] && list.push(...node[children])
  }
  return result
}
