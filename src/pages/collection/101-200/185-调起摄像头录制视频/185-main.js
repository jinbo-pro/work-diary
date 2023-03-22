var mediaStream
var recorderFile
var stopRecordCallback
var openBtn = document.getElementById('openCamera')
var startBtn = document.getElementById('start-recording')
var stopBtn = document.getElementById('stop-recording')
var saveBtn = document.getElementById('save-recording')
openBtn.onclick = function () {
  this.disabled = true
  startBtn.disabled = false
  openCamera()
}

startBtn.onclick = function () {
  this.disabled = true
  stopBtn.disabled = false
  startRecord()
}
stopBtn.onclick = function () {
  this.disabled = true
  startBtn.disabled = false
  // 结束
  stopRecord(function () {
    alert('录制成功!')
    openBtn.disabled = false
    saveBtn.disabled = false
    stopBtn.disabled = false
    console.log(recorderFile)
    // send();
  })
}

saveBtn.onclick = function () {
  saver()

  // alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');
}

var mediaRecorder
var videosContainer = document.getElementById('videos-container')

function openCamera() {
  var len = videosContainer.childNodes.length
  for (var i = 0; i < len; i++) {
    videosContainer.removeChild(videosContainer.childNodes[i])
  }

  var video = document.createElement('video')

  var videoWidth = 320
  var videoHeight = 240

  video.controls = false
  video.muted = true
  video.width = videoWidth
  video.height = videoHeight
  MediaUtils.getUserMedia(true, false, function (err, stream) {
    if (err) {
      throw err
    } else {
      // 通过 MediaRecorder 记录获取到的媒体流
      console.log()
      mediaRecorder = new MediaRecorder(stream)
      mediaStream = stream
      var chunks = [],
        startTime = 0
      video.srcObject = stream
      video.play()

      videosContainer.appendChild(video)
      mediaRecorder.ondataavailable = function (e) {
        mediaRecorder.blobs.push(e.data)
        chunks.push(e.data)
      }
      mediaRecorder.blobs = []

      mediaRecorder.onstop = function (e) {
        recorderFile = new Blob(chunks, {
          type: mediaRecorder.mimeType
        })
        chunks = []
        if (null != stopRecordCallback) {
          stopRecordCallback()
        }
      }
    }
  })
}

// 停止录制
function stopRecord(callback) {
  stopRecordCallback = callback
  // 终止录制器
  mediaRecorder.stop()
  // 关闭媒体流
  MediaUtils.closeStream(mediaStream)
}

var MediaUtils = {
  /**
   * 获取用户媒体设备(处理兼容的问题)
   * @param videoEnable {boolean} - 是否启用摄像头
   * @param audioEnable {boolean} - 是否启用麦克风
   * @param callback {Function} - 处理回调
   */
  getUserMedia: function (videoEnable, audioEnable, callback) {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      window.getUserMedia
    var constraints = {
      video: videoEnable,
      audio: audioEnable
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          callback(false, stream)
        })
        ['catch'](function (err) {
          callback(err)
        })
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        constraints,
        function (stream) {
          callback(false, stream)
        },
        function (err) {
          callback(err)
        }
      )
    } else {
      callback(new Error('Not support userMedia'))
    }
  },

  /**
   * 关闭媒体流
   * @param stream {MediaStream} - 需要关闭的流
   */
  closeStream: function (stream) {
    if (typeof stream.stop === 'function') {
      stream.stop()
    } else {
      let trackList = [stream.getAudioTracks(), stream.getVideoTracks()]

      for (let i = 0; i < trackList.length; i++) {
        let tracks = trackList[i]
        if (tracks && tracks.length > 0) {
          for (let j = 0; j < tracks.length; j++) {
            let track = tracks[j]
            if (typeof track.stop === 'function') {
              track.stop()
            }
          }
        }
      }
    }
  }
}

function startRecord() {
  mediaRecorder.start()
}

function createVideo() {
  const fileName = `msr-${new Date().toISOString().replace(/:|\./g, '-')}.mp4`
  return new File([recorderFile], fileName, { type: 'video/mp4' })
}

function saver() {
  const file = createVideo()
  saveAs(file)
}

async function send() {
  const file = createVideo()
  const body = new FormData()
  const response = await fetch('/uploadFile', {
    method: 'post',
    body
  })
  if (!response.ok) return console.log('上传失败')
  const res = await response.json()
  console.log(res, '--- res')
}
