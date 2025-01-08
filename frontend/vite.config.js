import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(), // 使用 Vue 插件
		AutoImport({
			resolvers: [ElementPlusResolver()], // 自動導入 Element Plus
		}),

		Components({
			resolvers: [ElementPlusResolver()], // 自動導入組件
		}),
	],
})
