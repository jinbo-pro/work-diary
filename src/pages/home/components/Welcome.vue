<template>
  <Weather v-if="!closeWelcome" :show.sync="show" />
</template>

<script>
import { session } from '@/utils/storage.js'
import { sleep } from '@/utils/time.js'
import Weather from '@/components/Weather.vue'
export default {
  name: 'Welcome',
  components: {
    Weather
  },
  data() {
    return {
      show: false,
      closeWelcome: false
    }
  },
  created() {
    this.closeWelcome = session.get('closeWelcome')
    this.init()
  },
  methods: {
    async init() {
      if (this.closeWelcome) return
      await sleep(1200)
      this.show = true
      await sleep(8000)
      this.close()
    },
    close() {
      this.show = false
      this.$emit('close')
      session.set('closeWelcome', true)
    }
  }
}
</script>
