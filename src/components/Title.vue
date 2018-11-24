<template>
    <div class="title">{{text}}</div>
</template>

<script>
export default {
	name: 'Menu',
	props: ['text']
}
</script>

<style scoped>
    .title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
    }
</style>
