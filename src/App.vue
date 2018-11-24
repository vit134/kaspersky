<template>
  <div id="app">
		<header class="header">
			<h3>Kaspersky Lab</h3>
		</header>
		<main class="main">
			<aside class="sidebar">
				<div class="sidebar__inner">
					<Menu />
				</div>
			</aside>
			<div class="content">
				<router-view/>
			</div>
		</main>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
	name: 'App',
	components: {
		Menu
	}
}
</script>

<style>
	html,
	body {
		margin: 0;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	div,
	header,
	footer,
	main,
	aside {
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
		color: #222;
	}

	a:hover {
		opacity: .6;
		text-decoration: underline;
	}

	#app {
		color: #2c3e50;
		min-height: 100%;
	}

	.header {
		height: 60px;
		border-bottom: 1px solid gray;
		display: flex;
		align-items: center;
		padding: 0 20px;
	}

	.main {
		display: flex;
		min-height: calc(100vh - 60px);
	}

	.sidebar {
		flex: none;
		width: 250px;
		border-right: 1px solid gray;
		padding: 20px;
	}

	.sidebar__inner {
		position: sticky;
		top: 20px;
	}

	.content {
		width: 100%;
		padding: 20px;
	}
</style>
