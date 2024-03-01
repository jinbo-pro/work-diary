import { bufferToWave } from './buffer2wav.js'
import { BufferedOLA } from './bufferedOla.js'

// 原始音频的AudioBuffer
let originAudioBuffer

new Vue({
  el: '#app',
  data() {
    return {
      rate: 1,
      orgAudioUrl: '/public/assets/test.mp3',
      rateList: [0.5, 1, 1.5, 2, 5],
      distAudioUrl: '',
      distProAudioUrl: ''
    }
  },
  created() {
    this.getAudioBuffer(this.orgAudioUrl)
  },
  methods: {
    getAudioBuffer(url) {
      // 获取原始音频的audiobuffer数据
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => new AudioContext().decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          // 获取原始音频的采样率
          originAudioBuffer = audioBuffer
        })
    },
    displayHandle() {
      this.easyDisplay()
      this.proDisplay()
    },
    // 简易转换
    easyDisplay() {
      // 获取选中的倍速
      const rate = this.rate
      // 创建新的AudioBuffer
      const audioBuffer = new AudioContext().createBuffer(
        originAudioBuffer.numberOfChannels,
        originAudioBuffer.length / rate,
        originAudioBuffer.sampleRate
      )
      // 复制原始音频的数据到新的AudioBuffer
      for (let channel = 0; channel < originAudioBuffer.numberOfChannels; channel++) {
        const originChannelData = originAudioBuffer.getChannelData(channel)
        const newChannelData = audioBuffer.getChannelData(channel)
        for (let i = 0; i < audioBuffer.length; i += 1) {
          newChannelData[i] = originChannelData[Math.floor(i * rate)] || 0
        }
      }
      // 创建新的音频
      const blob = bufferToWave(audioBuffer, audioBuffer.length)
      this.distAudioUrl = URL.createObjectURL(blob, { type: 'audio/wav' })
    },
    // 高保真转换
    proDisplay() {
      const rate = this.rate
      // 创建新的audiobuffer
      const audioBuffer = new AudioContext().createBuffer(
        originAudioBuffer.numberOfChannels,
        originAudioBuffer.length / rate,
        originAudioBuffer.sampleRate
      )
      const myOLATS = new BufferedOLA()
      myOLATS.set_audio_buffer(originAudioBuffer)
      myOLATS.alpha = 1 / rate
      myOLATS.process(audioBuffer)
      // 播放合成的新音频
      const blob = bufferToWave(audioBuffer, audioBuffer.length)
      this.distProAudioUrl = URL.createObjectURL(blob, { type: 'audio/wav' })
    }
  }
})
