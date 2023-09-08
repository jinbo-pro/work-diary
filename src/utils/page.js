/**
 * 页面相关
 */
/**判断是否为pc端 */
export function isPC() {
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
  return !agents.some((x) => navigator.userAgent.includes(x)) || window.screen.width >= 768
}

/**
 * queryString转queryObject
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * queryObject转queryString
 * @param {Object} json
 * @returns {Array}
 */
export function getQueryString(json) {
  if (!json) return ''
  return Object.keys(json)
    .map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
    .join('&')
}

/**
 * 判断dom是否有 Class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 添加dom Class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 删除元素 Class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 停止页面滚动[pc端]
 */
export function stopMove() {
  let m = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', m, { passive: false })
}

/**
 * 开启页面滚动[pc端]
 */
export function canMove() {
  let m = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = ''
  document.removeEventListener('touchmove', m, { passive: true })
}

// 阻止滚动穿透[移动端]
export function stopMoveMobile() {
  /**
     *  阻止滚动穿透 css
        body.static { position:fixed;left:0;width:100%; }
    */
  const scrollTop = document.scrollingElement.scrollTop
  document.body.classList.add('static')
  document.body.style.top = `-${scrollTop}px`
}

// 开启滚动穿透[移动端]
export function canMoveMobile() {
  document.body.classList.remove('static')
  // 关闭弹窗后同步body滚动条位置
  document.scrollingElement.scrollTop = Math.abs(parseInt(document.body.style.top))
  document.body.style.top = ''
}

/**
 * 移动端元素长按方法
 * @param {HTMLElement} dom 元素
 * @param {function} fn 回调
 * @param {number} time 执行间隔
 * @returns
 */
export function addLongPress(dom, fn, time = 300) {
  if (!dom) return console.log('没有元素')
  if (!fn) return console.log('没有回调方法')
  var timeOutEvent = null
  dom.ontouchstart = function (e) {
    timeOutEvent = setInterval(() => {
      fn(e)
    }, time)
    e.preventDefault()
  }
  dom.ontouchmove = function (e) {
    if (e.cancelable) {
      timeOutEvent && clearTimeout(timeOutEvent)
      timeOutEvent = null
    }
  }
  dom.ontouchend = function (e) {
    timeOutEvent && clearTimeout(timeOutEvent)
    timeOutEvent = null
    return false
  }
}

/**
 * blob 流文件下载
 * @param {Blob} blob
 * @param {string} fileName
 */
export function blobFileDown(blob, fileName) {
  const elink = document.createElement('a')
  if (fileName) {
    elink.download = fileName
  } else {
    elink.setAttribute()
  }

  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href) // 释放URL 对象
  document.body.removeChild(elink)
}

/**
 * 点击按钮上传文件
 * @param {string} accept
 * @param {boolean} multiple
 * @returns {Promise<File[]>}
 */
export function clickUploadFile(accept, multiple) {
  const input = document.createElement('input')
  input.type = 'file'
  if (accept) {
    input.accept = accept
  }
  if (multiple) {
    input.multiple = 'multiple'
  }
  input.click()
  return new Promise((resolve, reject) => {
    input.onchange = (f) => {
      resolve(f.target.files)
    }
    input.onerror = reject
  })
}

/**
 * 复制文字到剪切板
 * @param {string} text
 * @returns
 */
export function copyText(text) {
  if (!text) {
    console.info('没有要复制的内容')
    return
  }
  document.execCommand('Copy')
  var inputZ = document.createElement('input')
  inputZ.setAttribute('id', 'inputCopy')
  inputZ.value = text
  document.body.appendChild(inputZ)
  document.getElementById('inputCopy').select()
  document.execCommand('Copy')
  document.body.removeChild(inputZ)
}
/**
 * 文件base64/buffer 解析
 * @param {File} file
 * @param {string} type
 * @returns
 */
export function fileParse(file, type = 'base64') {
  return new Promise((resolve) => {
    let fileRead = new FileReader()
    if (type === 'base64') {
      fileRead.readAsDataURL(file)
    } else if (type === 'buffer') {
      fileRead.readAsArrayBuffer(file)
    }
    fileRead.onload = (ev) => {
      resolve(ev.target.result)
    }
  })
}
