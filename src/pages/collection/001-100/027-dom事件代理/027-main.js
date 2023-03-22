// e.target 事件源对象

// 方案一：捕获每个dom然后一次添加点击事件
let ulBox1 = document.getElementById('ulBox1')
let liList = ulBox1.getElementsByTagName('li')
for (let i = 0; i < liList.length; i++) {
  let item = liList[i]
  item.onclick = function (e) {
    console.log(e.target.dataset.type, '-->>> 678')
    console.log(item.innerHTML, '-->>> innerHTML')
  }
}

// 方案二：使用事件代理的方式实现事件的分发
let ulBox2 = document.getElementById('ulBox2')
ulBox2.onclick = function (e) {
  // event.currentTarget 标识是当事件沿着 DOM 触发时事件的当前目标。它总是指向事件绑定的元素
  // event.target 则是事件触发的元素。
  let type = e.target.dataset.type
  if (type) {
    console.log(type, '-->>> type')
  }
}

// 动态添加dom事件
var tempIndex = 6
function addDom() {
  let li = document.createElement('li')
  li.setAttribute('data-type', Date.now())
  li.innerHTML = tempIndex++
  document.getElementById('ulBox1').appendChild(li)
  let li2 = li.cloneNode(true)
  document.getElementById('ulBox2').appendChild(li2)
}

/*
 * 事件代理的优势，减少操作dom的次数，同时动态创建的dom也可以通过事件代理的方式
 * 添加事件，就进一步减少了dom的操作，提高了性能，避免了有的时候循环添加事件造成的内存泄露
 */
