const input = document.getElementById('take-video')
const container = document.getElementById('video-show')
input.onchange = function (event) {
  const files = event.target.files
  if (files && files.length > 0) {
    let file = files[0]
    if (file.size > 50 * 1024 * 1024) {
      alert('视频大于50M，请重新上传')
      return
    }
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('loadend', function () {
      const localVideo = document.getElementById('local-video')
      if (localVideo) {
        localVideo.src = reader.result
      } else {
        const video = document.createElement('video')
        video.src = reader.result
        video.id = 'local-video'
        video.setAttribute('controls', 'controls')
        container.appendChild(video)
      }
    })
  } else {
    alert('请重新上传视频')
  }
}
