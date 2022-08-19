import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const maxWidth = window.innerWidth
const maxHeight = window.innerHeight

// 初始化场景
const scene = new THREE.Scene()
// 初始化透视相机
const camera = new THREE.PerspectiveCamera(75, maxWidth / maxHeight, 0.1, 1000)
// 设置相机位置
camera.position.z = 5
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(maxWidth, maxHeight)
const container = renderer.domElement

// 渲染场景和相机
renderer.render(scene, camera)
// 渲染循环
const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

// 添加控制器
const controls = new OrbitControls(camera, container)
// 启用惯性
controls.enableDamping = true
// 相机向外移动极限
controls.maxDistance = 4.5

// 添加立方体
const geometry = new THREE.BoxGeometry(10, 10, 10)
// 左右、上下、后前
const urls = [
  { p: '4_l', u: 'https://cdn.huodao.hk/upload_img/20220620/3e532822bd445485d27677ca55a79b10.jpg?proportion=1' },
  { p: '4_r', u: 'https://cdn.huodao.hk/upload_img/20220620/cebf6fbcafdf4f5c945e0881418e34ec.jpg?proportion=1' },
  { p: '4_u', u: 'https://cdn.huodao.hk/upload_img/20220620/273081d1896fc66866842543090916d3.jpg?proportion=1' },
  { p: '4_d', u: 'https://cdn.huodao.hk/upload_img/20220620/8747f61fd2215aa748dd2afb6dce3822.jpg?proportion=1' },
  { p: '4_b', u: 'https://cdn.huodao.hk/upload_img/20220620/c34262935511d61b2e9f456b689f5c1c.jpg?proportion=1' },
  { p: '4_f', u: 'https://cdn.huodao.hk/upload_img/20220620/722d2bf88f6087800ddf116511b51e73.jpg?proportion=1' }
]
const boxMaterial = urls.map((e) => {
  // 纹理加载
  const texture = new THREE.TextureLoader().load(e.u)
  // 通过旋转修复天花板和地板
  if (e.p == '4_u' || e.p == '4_d') {
    texture.rotation = Math.PI
    texture.center = new THREE.Vector2(0.5, 0.5)
  }
  // 创建材质
  return new THREE.MeshBasicMaterial({ map: texture })
})
const house = new THREE.Mesh(geometry, boxMaterial)
// 翻转图片-进入正方体内部
house.geometry.scale(1, 1, -1)

// 添加场景
scene.add(house)
document.body.append(container)
