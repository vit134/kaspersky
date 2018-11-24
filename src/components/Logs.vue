<template>
	<div>
		<Title text="Logs" />
		<table class="table">
			<tr class="table__header">
				<th>Type</th>
				<th>Date</th>
			</tr>
			<tr class="table__row" v-for="(log, i) of logs" v-bind:key="i">
				<td>{{log.type}}</td>
				<td>{{log.date}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
import Title from './Title.vue'

export default {
	name: 'logs',
	data () {
		return {
			logs: []
		}
	},
	components: {
		Title
	},
	created () {
		fetch('http://localhost:3000/api/logs', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then(data => data.json())
			.then(data => {
				this.logs = data.result
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
