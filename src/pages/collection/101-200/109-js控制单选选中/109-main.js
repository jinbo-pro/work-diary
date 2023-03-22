// jq
$('.but').on('click', function () {
  const value = $(this).attr('data-id')
  /**
   * attr 从自定义属性开始查找，固有属性可能无法修改
   * prop 支持所有固有属性的编辑
   * */
  $(`input[name=aaa][value=${value}]`).prop('checked', 'checked')
  $(`input[name=bbb][value=${value}]`).prop('checked', 'checked')
})
// ori
document.getElementById('but-1').onclick = function () {
  let domList = document.querySelectorAll('input[value="1"]')
  ;[].forEach.call(domList, (item, index) => {
    item.checked = true
  })
}
document.getElementById('but-2').onclick = function () {
  let domList = document.querySelectorAll('input[value="0"]')
  ;[].forEach.call(domList, (item, index) => {
    item.checked = true
  })
}
