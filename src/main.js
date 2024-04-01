import '@/assets/styles/index.sass'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import NumberText from '@/components/NumberText.vue'
import UniversalImage from '@/components/UniversalImage.vue'
import App from '@/App.vue'

const app = createApp(App)

app.component('NumberText', NumberText)
app.component('UniversalImage', UniversalImage)
app.use(createPinia())
app.mount('#app')
