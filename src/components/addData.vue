<template>
	<div>
		<Title text="Add Data"/>
		<form action="" class="form" v-on:submit.prevent="onSubmit">
			<input placeholder="Title" name="title" type="text" class="input" required>
			<textarea placeholder="Text" name="text" id="text" cols="30" rows="10" class="textarea" required></textarea>
			<div class="form__footer">
				<button type="submit" class="submit-btn">Add</button>
				<span v-bind:class="{ form__text_error: !respStatus }" class="form__text">{{respMessage}}</span>
			</div>
		</form>
	</div>
</template>

<script>
import Title from './Title.vue'

export default {
	name: 'addData',
	data () {
		return {
			respMessage: '',
			respStatus: true
		}
	},
	methods: {
		onSubmit (e) {
			const date = new Date()
			const form = e.target

			let formFields = {}
			new FormData(form).forEach((val, name) => {
				formFields[name] = val
			})

			fetch('http://localhost:3000/api/addData', {
				method: 'POST',
				body: JSON.stringify({...formFields, date}),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			})
				.then(data => data.json())
				.then(data => {
					console.log(`Action type addData with time - ${date} was saved to db`)
					this.respMessage = 'done'
					this.respStatus = true

					setTimeout(() => {
						form.reset()
						this.respMessage = ''
					}, 3000)
				})
				.catch((err) => {
					console.log(err)
					this.respMessage = 'Error'
					this.respStatus = false
				})
		}
	},
	created () {
		const date = new Date()
		const type = 'login'

		fetch('http://localhost:3000/api/logs', {
			method: 'POST',
			body: JSON.stringify({ type, date }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then(data => data.json())
			.then(data => {
				console.log(`Action type login with time - ${date} was saved to db`)
			})
			.catch((err) => {
				console.log(err)
			})
	},
	components: {
		Title
	}
}
</script>

<style scoped>
	.form {
		display: flex;
		flex-direction: column;
		max-width: 400px;
		align-items: center;
		margin: 0 auto;
	}

	.input,
	.textarea {
		margin-bottom: 20px;
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid gray;
	}

	.input:focus,
	.textarea:focus {
		outline: none;
		box-shadow: 0 0 5px gray;
	}

	.input {
		height: 30px;
	}

	.submit-btn {
		width: 80px;
		height: 30px;
		border-color: gray;
	}

	.form__footer {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form__text {
		position: absolute;
		top: 4px;
		right: 10px;
		width: 100px;
		font-size: 14px;
		color: green;
		text-align: right;
	}

	.form__text_error {
		color: red;
	}
</style>
