var musicBox = $('.music_box')
var audioPlay = $('.audio_play')
var audioTitle = $('.audio_title')
var audioContent = $('.audio_content')
var musicAllList = [] // 所有歌曲列表

var isRandom = false

function getRandomList(list) {
  const R = ~~(Math.random() * list.length)
  return list[R]
}
// 创建音乐播放组件
function createAudio(item) {
  var audio = $(
    `<audio controls="controls" autoplay="autoplay" src="${item.wma}"></audio>`
  )
  audio.on('play', function () {
    console.log(item.mname, '开始播放')
  })
  audio.on('ended', function () {
    console.log(item.mname, '播放结束')
    nextMusic(item)
  })
  audioTitle
    .attr('data-id', item.id)
    .find('div')
    .text(`[${item.index}] ${item.mname} - ${item.singer}`)
  audioContent.find('.audio').empty().append(audio)
}
// 下一首音乐
function nextMusic(current) {
  let musicItem = null
  if (isRandom) {
    musicItem = getRandomList(musicAllList)
  } else {
    let index = musicAllList.findIndex((m) => m.id == current.id)
    let nextItem = musicAllList[index + 1]
    musicItem = nextItem || musicAllList[0]
  }
  addActiveClass($(`.item_music_box[data-id=${musicItem.id}]`))
  createAudio(musicItem)
}
// 下一曲
$('.next').on('click', function () {
  let curId = audioTitle.attr('data-id')
  let curItem = musicAllList.find((item) => item.id == curId)
  if (curItem) {
    nextMusic(curItem)
  } else {
    console.log(curId, '-->>> curId 查找失败')
  }
})
// 顺序/随机播放切换
$('.play_type .shunxu').on('click', function () {
  isRandom = true
  $(this).hide().next().show()
})
$('.play_type .suiji').on('click', function () {
  isRandom = false
  $(this).hide().prev().show()
})
// 初始获取数据
$.get('./musicInfoList.json').done((res) => {
  res.forEach((item, index) => {
    item.index = index + 1
  })
  musicAllList = res
  createMusicList(res)
})

// 创建音乐列表
function createMusicList(list) {
  musicBox.empty()
  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i]
    let music = $(`
        <div class="item_music_box" data-id="${item.id}" data-index="${item.index}">
            <img class="lazyload" data-src="${item.zjpic}">
            <div class="right_music_info">
                <div class="title">[${item.index}] ${item.mname}</div>
                <div class="user">${item.singer} - ${item.zjname}</div>
            </div>
        </div>`)
    music.on('click', function () {
      addActiveClass($(this))
      audioPlay.show()
      createAudio(item)
    })
    musicBox.append(music)
  }
  lazyloadNew()
}

// 图片懒加载
function lazyloadNew() {
  const imgs = document.querySelectorAll('img.lazyload')
  const observer = new IntersectionObserver((nodes) => {
    nodes.forEach((v) => {
      if (v.isIntersecting) {
        // 判断是否进入可视区域
        v.target.src = v.target.dataset.src // 赋值加载图片
        observer.unobserve(v.target) // 停止监听已加载的图片
      }
    })
  })
  imgs.forEach((v) => observer.observe(v))
}

// 添加当前点击的样式
function addActiveClass(dom) {
  $('.item_music_box').removeClass('item_music_active')
  dom.addClass('item_music_active')
}

// 搜索
$('#serach').on('click', function () {
  let keyWord = $('.search').val()
  let list = musicAllList.filter((item) => item.mname.includes(keyWord))
  createMusicList(list)
})
// 重置搜索
$('#reset').on('click', function () {
  $('.search').val('')
  createMusicList(musicAllList)
})
