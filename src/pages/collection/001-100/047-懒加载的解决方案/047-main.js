console.log('047-懒加载的解决方案')
// 创建图片
function createImg() {
  var ulBox = $('#ulBox')
  for (let i = 1; i < 100; i++) {
    ulBox.append(
      `<li class="img_box"><img class="lazyload" data-src="http://www.ruanyifeng.com/images_pub/pub_${i}.jpg"></li>`
    )
  }
}
