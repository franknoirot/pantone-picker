<script>
	import Colorpicker from './Colorpicker.svelte'
	import Pantone from './Pantone.svelte'
</script>

<style>
	:global(body) {
		width: 100vw;
		padding-top: 2vh;
		margin: 0;
		height: 100vh;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
</style>

<Pantone />
<Colorpicker/>

