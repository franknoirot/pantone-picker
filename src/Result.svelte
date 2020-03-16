<script>
	import HSB from './HSB.svelte'
	import HSL from './HSL.svelte'
	import RGB from './RGB.svelte'
	
	export let type = 'hsb'
</script>

<style>
	fieldset {
		width: 100%;
		box-sizing: border-box;
		padding: 0;
		margin: 1vmin 0;
		border: 0;
		position: relative;
		height: fit-content;
		
		--h-size-min: .6em;
		--h-w-min: 5;
		--h-w-max: 40;
		--h-w-diff: calc(var(--h-w-max) - var(--h-w-min));
		--h-size-w-min: calc(var(--h-w-min) * 1em);

		font-size: calc(var(--h-size-min) + .2 * (100vw - var(--h-size-w-min)) / var(--h-w-diff));
	}
</style>
 
<fieldset>
	{#if type==="hsb"}
	<HSB />
	{:else if type==="hsl"}
	<HSL />	
	{:else if type==="rgb"}
	<RGB />
	{/if}
</fieldset>

