import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/Home.vue" // 確保這裡有一個 Home 元件

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home, // 指定首頁組件
	},
	{
		path: "/nav",
		name: "NavBar",
		component: () => import("./components/NavBar.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
