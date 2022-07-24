function sleep(t) {
  return new Promise((a) => setTimeout(a, t))
}

function clickHandel(i) {
  console.log(i + 1)
}

function douClick(fn) {
  var time = null
  return function (i) {
    if (time) {
      return
    }
    time = setTimeout(() => {
      fn(i)
      time = null
    }, 100)
  }
}

async function run() {
  const a = douClick(clickHandel)
  for (let i = 0; i < 10; i++) {
    await sleep(50)
    a(i)
  }
}

run()
