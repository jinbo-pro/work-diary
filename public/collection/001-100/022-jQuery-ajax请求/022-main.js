/**
 * 参数配置参考： https://www.w3school.com.cn/jquery/ajax_ajax.asp
 */

/**
 * ajax 请求包装
 * @param {string} method
 * @param {string} url
 * @param {any} data
 * @param {object} config
 * @returns
 */
function ajaxRequest(method, url, data, config = {}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      type: method,
      data,
      ...config,
      success: function (res) {
        resolve(res)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * get 请求
 * @param {string} url
 * @param {object} data
 * @param {object} config
 */
function apiGet(url, data, config) {
  return ajaxRequest('get', url, data, config)
}

/**
 * post 请求
 * @param {string} url
 * @param {object} data
 * @param {object} config
 */
function apiPost(url, data, config) {
  return ajaxRequest('post', url, data, config)
}

/**
 * post formdata 请求
 * @param {string} url
 * @param {FormData} data
 * @param {object} config
 */
function apiPostForm(url, data, config = {}) {
  return ajaxRequest(
    'post',
    url,
    data,
    Object.assign(config, {
      contentType: false, // 文件上传不能添加 contentType
      processData: false // 不将 FormData 转为查询字符串
    })
  )
}

/**
 * post json 请求
 * @param {string} url
 * @param {object} data
 * @param {object} config
 */
function apiPostJson(url, data, config = {}) {
  return ajaxRequest(
    'post',
    url,
    JSON.stringify(data),
    Object.assign(config, {
      contentType: 'application/json; charset=utf-8'
    })
  )
}

/**
 * 【请求测试】
 */
const serverPath = 'http://localhost:8899'

// get listData
function getListData() {
  apiGet(serverPath + '/api/listData', {
    count: 3
  }).then((res) => {
    console.log(res, '-->>> getListData res')
  })
}

// post createCrypto
function postCreateCrypto() {
  apiPost(serverPath + '/createCrypto', {
    content: '1564677900',
    type: 'md5'
  }).then((res) => {
    console.log(res, '-->>> postCreateCrypto res')
  })
}

// 测试 post upload
$('#selectFile').on('change', function (e) {
  var files = e.target.files
  console.log(files, '-->>> files')
  var fileData = new FormData()
  for (var i = 0; i < files.length; i++) {
    fileData.append('file' + i, files[i])
  }
  apiPostForm(serverPath + '/batchUpload', fileData).then((res) => {
    console.log(res, '-->>> postUpload res')
  })
})

// post-json
function postJsonlogin() {
  apiPostJson(serverPath + '/admin/user/login', {
    username: 'admin',
    password: '321321'
  }).then((res) => {
    console.log(res, '-->>> postJson res')
  })
}
