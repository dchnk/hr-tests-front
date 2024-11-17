import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(vuetify).mount('#app')
