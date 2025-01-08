<template>
	<div class="home">
		<h1>訂單管理系統</h1>
		<button @click="viewOrders">查看訂單</button>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const viewOrders = () => {
	// 當用戶點擊按鈕時，導航到訂單頁面
	router.push("/nav")
}
</script>
