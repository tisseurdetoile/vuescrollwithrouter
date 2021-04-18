import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Wave UI from the src directory & create the Vue app.
import WaveUI from 'wave-ui/src/wave-ui/core'

const app = createApp(App)

// Import only the components you need. e.g.
import { WApp } from 'wave-ui/src/wave-ui/components'

app.use(router)

app.use(WaveUI, {
  components: { WApp },
})

// Instantiate the WaveUI class and register it in the Vue instance.
new WaveUI(app, {
  // Some Wave UI options.
})

app.mount('#app')
