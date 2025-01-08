import { createApp } from "vue"
import App from "./App.vue"
import router from "./router" // 確保這裡是正確的路由實例
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "./assets/tailwind.css"
import "./assets/style.css"

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount("#app")
