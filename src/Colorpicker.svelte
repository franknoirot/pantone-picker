<script>
	import { hsbStore, hslStore } from './colorStore.js'
	import { toTwoDecimals } from './util.js'
	import Result from './Result.svelte'
	
	let hue, saturation, lightness, hsbSaturation, hsbBrightness
	hslStore.h.subscribe(val => hue = val)
	hslStore.s.subscribe(val => saturation = val)
	hslStore.l.subscribe(val => lightness = val)
	
	hsbStore.s.subscribe(val => hsbSaturation = val)
	hsbStore.b.subscribe(val => hsbBrightness = val)
	
	function updateSatBright(e) {
		let {width, height} = e.target.getBoundingClientRect()
		hsbStore.s.set(toTwoDecimals(e.offsetX / width * 100))
		hsbStore.b.set(toTwoDecimals(100 - e.offsetY / height * 100))
	}

	function updateHSB() {
		hsbStore.h.set(hue)
	}
</script>

<div id="colorpicker" 
		 style="--hue: {hue}deg;
						--saturation: {saturation}%;
						--lightness: {lightness}%;
						--hsb-saturation: {hsbSaturation};
						--hsb-brightness: {hsbBrightness};
						--contrast: {(lightness > 50) ? '#222' : 'white'};">
	<div id="result" >
		<Result type="hsb" />
		<Result type="hsl" />
		<Result type="rgb" />
	</div>
	<div id="sl-picker" on:click={updateSatBright}>
		<div id="sl-dot" style="--dot-x: {hsbSaturation}%;
														--dot-y: {hsbBrightness}%;">
		</div>
	</div>
	<label id="h-picker">
		<input type="range" min=0 max=360 bind:value={hue} on:input={updateHSB}>
		<div id="h-dot" style="--dot-x: {hue / 360 * 80 + 10}%;"></div>
	</label>
</div>

<style>
	
	#colorpicker {
		width: 80vw;
		height: 50vh;
		margin: 5vmin;
		border-radius: 1.5vmin;
		box-shadow: 0 1vmin 1vmin rgba(0,0,0,0.3),
								0 1.7vmin 2vmin hsla(var(--hue), var(--saturation), var(--lightness), .3);
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: 4fr 1fr;
		overflow: hidden;
		--contrast: black;
		color: var(--contrast);
	}
	
	#result {
		grid-column: 1 / 2;
		grid-row: 1 / 3;
		background: hsl(var(--hue), var(--saturation), var(--lightness));
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 5% 0;
		transition: all .13s ease-in-out;
	}
	
	
	#sl-picker {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
		background: linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent), hsl(var(--hue), 100%, 50%);
		position: relative;
	}
	
	#h-dot, #sl-dot {
		pointer-events: none;
		position: absolute;
		width: 3vmin;
		height: 3vmin;
		transform: translate(-50%, 50%);
		border-radius: 50%;
		border: solid var(--contrast);
	}
	
	#sl-dot {
		bottom: var(--dot-y);
		left: var(--dot-x);
		transition: all .13s ease-in-out;
	}
	
	#h-dot {
		bottom: 50%;
		left: var(--dot-x);
		background: hsl(var(--hue), 100%, 50%);
		border-color: white;
	}
	
	#h-picker {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	
	#h-picker input {
		opacity: 0;
	}
	
	#h-picker input,
	#h-picker::before {
		width: 80%;
	}
	
	#h-picker::before {
		pointer-events: none;
		content: '';
		position: absolute;
		height: 2vh;
		border-radius: 1vh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: linear-gradient(to right, #f00, #cc0, #0f0, #0cc, #00f, #c0c, #f00);
	}
		
	@media(max-width: 650px) {
		#colorpicker {
			height: 90vh;
			width: 100%;

			display: flex;
			flex-direction: column;
		}
		
		#result {
			grid-column: 1 / 2;
			grid-row: 1 / 2;
			padding: 2% 0;
		}
		
		#sl-picker {
			height: 100%;
			grid-column: 1 / 2;
		}
		
		#h-picker {
			grid-column: 1 / 2;
		}
	}
</style>