/**
 * 图片懒加载
 * @param {HTMLElement[]} imgDoms 图片列表
 */
export function lazyLoadImg(imgDoms) {
  const imgs = imgDoms ? imgDoms : document.querySelectorAll('img[data-lazy]')
  const observer = new IntersectionObserver((nodes) => {
    nodes.forEach((v) => {
      if (v.isIntersecting) {
        // 判断是否进入可视区域
        v.target.src = v.target.dataset.lazy // 赋值加载图片
        observer.unobserve(v.target) // 停止监听已加载的图片
      }
    })
  })
  imgs.forEach((v) => observer.observe(v))
}

/**
 * 将图片的 src 属性放到 date-lazy 上， 执行该方法即可自动加载
 */
