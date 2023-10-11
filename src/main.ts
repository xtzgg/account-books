import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 注册UI组件,后续按需引入，不推荐该方式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Vant from 'vant'
import { Dialog } from 'vant';
import 'vant/lib/index.css';

// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 注册UI组件
app.use(ElementPlus)
app.use(Vant)
app.use(Dialog)


// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
