console.log('128-Sticky粘性布局')

for (let i = 0; i < 100; i++) {
  if (i < 10) {
    $('.sticky').before(`<p>${i}</p>`)
  } else {
    $('.sticky').after(`<p>${i}</p>`)
  }
}
