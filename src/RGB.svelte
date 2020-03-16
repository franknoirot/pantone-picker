<script>
  import { hsbStore, rgbStore } from './colorStore.js'
	
	let red, green, blue
	rgbStore.r.subscribe(val => red = val)
	rgbStore.g.subscribe(val => green = val)
	rgbStore.b.subscribe(val => blue = val)
	
	function clamp(num, min, max) {
		return num <= min ? min : num >= max ? max : num;
	}
	
	function toTwoDecimals(num) {
		return Math.round(num * 100) / 100
	}
	 
	function rgbToHSL({red: r, green: g, blue: b}) {
		r = clamp(r, 0, 255) / 255;
		g = clamp(g, 0, 255) / 255;
		b = clamp(b, 0, 255) / 255;

		let cmin = Math.min(r,g,b),
				cmax = Math.max(r,g,b),
				delta = cmax - cmin,
				h = 0,
				s = 0,
				l = 0;
		
		if (delta == 0)
			h = 0;
		else if (cmax == r)
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			h = (b - r) / delta + 2;
		else
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		if (h < 0)
				h += 360;
		
		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		
		return {
			h,
			s: toTwoDecimals(s * 100),
			l: toTwoDecimals(l * 100)
		}
	}
	
	function hslToHSB({h, s, l}) {
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
		let newHSB = hslToHSB(rgbToHSL({red, blue, green}))
		hsbStore.h.set(newHSB.h)
		hsbStore.s.set(newHSB.s)
		hsbStore.b.set(newHSB.b)
	}
</script>

<h3>RGB</h3>
<section>
	<label>R: <input type=number min=0 max=255 bind:value={red} on:input={updateHSB}></label>
	<label>G: <input type=number min=0 max=255 bind:value={green} on:input={updateHSB}></label>
	<label>B: <input type=number min=0 max=255 bind:value={blue} on:input={updateHSB}></label>
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
		transition: all .13s ease-in-out;
	}
	
	@media(max-width: 600px) {
		label {
			margin: 1vmin;
		}
		
		section {
			justify-content: center;
		}
		
		input {
			width: 10ch;
		}
	}
</style>