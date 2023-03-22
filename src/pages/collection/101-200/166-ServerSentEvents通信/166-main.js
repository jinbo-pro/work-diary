console.log('166-ServerSentEvents通信')

var source = new EventSource('http://127.0.0.1:8844/stream')

function tips(massage, color) {
  $('#state').text(massage).css('color', color)
}

source.onopen = function (event) {
  tips('onopen 连接成功', 'green')
}

source.onerror = function (event) {
  tips('onerror sse 连接失败 请打开服务器 ./server.js', 'red')
}

source.connecttime = function (event) {
  $('#msgBox').append(`<li>connecttime ${event.data}</li>`)
}

source.onmessage = function (event) {
  $('#msgBox').append(`<li>onmessage ${event.data}</li>`)
}
