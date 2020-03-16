<script>
  import { hsbStore, hslStore } from './colorStore.js'
	
	let hue, saturation, lightness
	hslStore.h.subscribe(val => hue = val)
	hslStore.s.subscribe(val => saturation = val)
	hslStore.l.subscribe(val => lightness = val)
	
	function clamp(num, min, max) {
		return num <= min ? min : num >= max ? max : num;
	}
	
	function toTwoDecimals(num) {
		return Math.round(num * 100) / 100
	}
	
	function hslToHSB({hue: h, saturation: s, lightness: l}) {
		h = parseFloat(h)
		s = clamp(s, 0, 100) / 100
		l = clamp(l, 0, 100) / 100
		
		let bright = (2*l + s*(1 - Math.abs(2*l - 1))) / 2
		let hsbSat = (bright !== 0) ? 2 * (bright - l) / bright : 0
		 
		return {
			h,
			s: toTwoDecimals(hsbSat * 100),
			b: toTwoDecimals(bright * 100)
		}
	}
	
	function updateHSB() {
		let newHSB = hslToHSB({hue, saturation, lightness})
		hsbStore.h.set(newHSB.h)
		hsbStore.s.set(newHSB.s)
		hsbStore.b.set(newHSB.b)
	}
</script>

<h3>HSL</h3>
<section>
	<label>H: <input type=number min=0 max=360 bind:value={hue} on:input={updateHSB}><span class="mobile-hide"> deg</span></label>
	<label>S: <input type=number min=0 max=100 bind:value={saturation} on:input={updateHSB}><span class="mobile-hide"> %</span></label>
	<label>L: <input type=number min=0 max=100 bind:value={lightness} on:input={updateHSB}><span class="mobile-hide"> %</span></label>	
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