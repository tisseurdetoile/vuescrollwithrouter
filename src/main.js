import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'

const app = createApp(App)

app.use(router)

new WaveUI(app, {
  // Some Wave UI options.
})
app.mount('#app')
