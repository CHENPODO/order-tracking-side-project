<script setup>
import Home from "./components/Home.vue"
import NavBar from "./components/NavBar.vue"
</script>

<template>
	<div>
		<nav>
			<router-link to="/">Home</router-link>
			|
			<router-link to="/nav">NavBar</router-link>
		</nav>
		<router-view></router-view>
		<!-- 用於顯示當前路由的組件 -->
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
