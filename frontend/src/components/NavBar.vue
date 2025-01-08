<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
const router = useRouter() // 獲取 router 實例

const isLogin = ref(false)

const login = () => {
	isLogin.value = true
	localStorage.setItem("isLogin", "true") // 登入成功後，將isLogin設為true
	ElMessage.success("登入成功")
	console.log("登入成功")
}
const logout = () => {
	isLogin.value = false
	localStorage.removeItem("isLogin") // 登出後，將isLogin設為false
	router.push("/") // 導航到首頁或指定頁面
	ElMessage.success("登出成功")
	console.log("登入失敗，請重新登入")
}
onMounted(() => {
	const saveStatus = localStorage.getItem("isLogin") // 取得localStorage的isLogin
	isLogin.value = saveStatus === "true" //字串轉布林
})
</script>

<template>
	<nav>
		<div>
			<h1>訂餐紀錄系統</h1>
		</div>
		<div>
			<button @click="login" v-if="!isLogin">登入</button>
			<button @click="logout" v-if="isLogin">登出</button>
		</div>
		<!-- 初始值為false，所以一開始會顯示請登入再繼續 -->
		<p v-if="isLogin">歡迎回來!</p>
		<p v-else>請登入再繼續</p>
	</nav>
</template>
