<template>
    <ul class="menu">
        <li class="menu__item"><router-link exact to="/">Add data</router-link></li>
        <li class="menu__item"><router-link to="/logs">Logs</router-link></li>
        <li class="menu__item"><router-link to="/data">Data</router-link></li>
    </ul>
</template>

<script>
export default {
	name: 'Menu',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<style scoped>
    .menu {
        margin: 0;
        padding: 0;
        list-style: none;;
    }

    .menu__item_active {
        color: red;
    }
</style>
