<script>
  import { hsbStore } from './colorStore.js'
	
	let hue, saturation, brightness
	hsbStore.h.subscribe(val => hue = val)
	hsbStore.s.subscribe(val => saturation = val)
	hsbStore.b.subscribe(val => brightness = val)
	
	function updateHSB() {
		hsbStore.h.set(hue)
		hsbStore.s.set(saturation)
		hsbStore.b.set(brightness)
	}
</script>


<h3>HSB</h3>
<section>
	<label>H:<input type=number min=0 max=360 bind:value={hue} on:input={updateHSB}><span class="mobile-hide"> deg</span></label>
	<label>S: <input type=number min=0 max=100 bind:value={saturation} on:input={updateHSB}><span class="mobile-hide"> %</span></label>
	<label>B: <input type=number min=0 max=100 bind:value={brightness} on:input={updateHSB}><span class="mobile-hide"> %</span></label>	
</section>

<style>
	h3 {
		border-bottom: solid 2px;
		margin: 0 10% .5em 10%;
	}
	
	section {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	label {
		font-weight: bold;
		margin: 0 1em;
		display: flex;
		justify-content: space-between;
	}
	
	input {
		background: hsl(var(--hue), var(--saturation), var(--brightness));
		color: var(--contrast);
		border: 0;
		border-bottom: solid var(--contrast) 1px;
		text-align: center;
		width: 7ch;
		padding: 0;
		margin: 0 .4em;
		text-align: center;
		transition: all .13s ease-in-out;
	}
	
	@media(max-width: 600px) {
		.mobile-hide {
			position: absolute;
			width: 1px;
			opacity: 0;
		}
		
		label {
			margin: 0 1vmin;
		}
		
		section {
			justify-content: center;
		}
		
		input {
			width: 10ch;
		}
	}
</style>
