
/**
 * 获取指定的 querystring 中指定 name 的 value
 * @param {String} name
 * @param {String} querystring
 * @return {String|undefined}
 *
 * query('hello', '?hello=js') 结果是 js
 *
 */
function query (name, querystring) {
  const reg = new RegExp('(?:\\?)' + name + '=(.*)')
  const ret = reg.exec(querystring) || []
  return ret[1]
}

/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 ''
 */
function serialize (data) {
  if (typeof data === 'object') {
    const arr = []

    for (var key in data) {
      arr.push(`${key}=${data[key]}&`)
    }
    var str1 = arr.join('')
    let str = str1.replace(/&$/, '')
    str = '?' + str
    return str
  } else {
    return 'param should be object'
  }
}

/**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|Null}
 */
function $ (selector) {
  if(!selector || typeof selector != 'string') {
    return false
  }
  const domEle = document.querySelector(selector)
  return domEle
}

/**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */

function removeNode (node) {
  const p = node && node.parentNode
  if (p) {
    p.removeChild(node)
  }else {
    return false
  }
}

/**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target
 */
function insertAfter (node, target) {
  if(!node || !target || node.nodeType !== 1 || target.nodeType !== 1) {
    return false
  }
  if (!target.nextElementSibling) {
    target.parentNode.appendChild(node)
  } else {
    target.parentNode.insertBefore(node, target.nextElementSibling)
  }
}

/**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
function addClass (node, className) {
  if (node && className) {
    node.classList.add(className)
  }
}

/**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
function removeClass (node, className) {
  if (node && className) {
    node.classList.remove(className)
  }else {
    return false
  }
}

/**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
function getAbsoluteUrl (url) {
  if(!url) {return null}
  var a = document.createElement('a')
  a.setAttribute('href', url)
  return a.href
}

/**
 * 防抖动
 * 防抖动函数了啦，有做个这个习题，不清楚回去复习
 */
function createDebounce (callback, time) {
  var timer
  var time = time || 300

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        callback()
        clearTimeout(timer)
        timer = null
      }, time)
    }
  }
}

/**
 *  根据所以移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
function removeItemByIndex (index, arr) {
  if (index < arr.length) {
    arr.splice(index, 1)
    return arr
  } else {
    return null
  }
}

module.exports = {
  serialize: serialize,
  removeItemByIndex: removeItemByIndex,
  $: $,
  removeNode: removeNode,
  insertAfter: insertAfter,
  addClass: addClass,
  removeClass: removeClass,
  getAbsoluteUrl: getAbsoluteUrl,
  query: query,
  createDebounce: createDebounce,
  getAbsoluteUrl: getAbsoluteUrl
}
