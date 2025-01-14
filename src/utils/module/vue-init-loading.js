;(() => {
  const app = document.getElementById('app')
  if (!app) return
  app.innerHTML = `
<style>
html[data-theme='dark'] .app-loading {
  background-color: #2c344a;
}

html[data-theme='dark'] .app-loading .app-loading-title {
  color: rgb(255 255 255 / 85%);
}

.app-loading {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f4f7f9;
}

.app-loading .app-loading-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate3d(-50%, -50%, 0);
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dot {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 48px;
  margin-top: 30px;
  font-size: 32px;
  transform: rotate(45deg);
  box-sizing: border-box;
  -webkit-animation: antRotate 1.2s infinite linear;
  animation: antRotate 1.2s infinite linear;
}

.dot i {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  background-color: #0065cc;
  border-radius: 100%;
  opacity: 30%;
  transform: scale(0.75);
  -webkit-animation: antSpinMove 1s infinite linear alternate;
  animation: antSpinMove 1s infinite linear alternate;
  transform-origin: 50% 50%;
}

.dot i:first-child {
  top: 0;
  left: 0;
}

.dot i:nth-child(2) {
  top: 0;
  right: 0;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.dot i:nth-child(3) {
  right: 0;
  bottom: 0;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.dot i:nth-child(4) {
  bottom: 0;
  left: 0;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
}

@keyframes antRotate {
  to {
    transform: rotate(405deg);
  }
}

@keyframes antSpinMove {
  to {
    opacity: 100%;
  }
}
</style>
<div class="app-loading">
<div class="app-loading-wrap">
  <div class="app-loading-dots">
    <span class="dot dot-spin">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </span>
  </div>
</div>
</div>
`
})()
