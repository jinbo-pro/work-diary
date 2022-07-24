var conut = 1
document.getElementById('but').onclick = function () {
  document.getElementById('count').innerText = ++conut
}

// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }
