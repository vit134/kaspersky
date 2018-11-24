<template>
	<div>
		<Title text="Data" />
		<table class="table" v-if="datas.length > 0">
			<tr class="table__header">
				<th>Title</th>
				<th>Text</th>
			</tr>
			<tr class="table__row" v-for="(item, i) of datas" v-bind:key="i">
				<td>{{item.title}}</td>
				<td>{{item.text}}</td>
			</tr>
		</table>
		<div v-else>
			<h5 colspan="2">Пока нет данных</h5>
		</div>
	</div>
</template>

<script>
import Title from './Title.vue'

export default {
	name: 'datas',
	data () {
		return {
			datas: []
		}
	},
	components: {
		Title
	},
	created () {
		fetch('http://localhost:3000/api/data', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then(data => data.json())
			.then(data => {
				this.datas = data.result.data
			})
	}
}
</script>

<style scoped>
	.page {
		min-height: 100vh;
	}
	.header {
		height: 60px;
		border-bottom: 1px solid gray;
		display: flex;
		align-items: center;
		padding: 0 40px;
	}

	.main {
		display: flex;
		height: calc(100vh - 60px);
	}

	.sidebar {
		flex: none;
		width: 250px;
		border-right: 1px solid gray;
		padding: 20px;
	}

	.content {
		padding: 20px;
	}

	.table {
		width: 400px;
		margin: 0 auto;
		border: 1px solid gray;
		border-collapse: collapse;
	}

	th {
		padding: 10px 0;
		border-bottom: 2px solid gray;
	}

	td {
		padding: 10px 0;
		border-bottom: 1px solid #eee;
		text-align: center;
	}

	.table__row:last-child td {
		border-bottom: none;
	}

	.table__header {
		font-weight: bold;
	}
</style>
