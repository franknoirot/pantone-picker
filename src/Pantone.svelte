<script context="module">
	import { rgbToHSL } from './util.js'
	import Pantone from "./pantone-colors.js"
	
	Pantone.rgb = Pantone.values.map(rgb => rgb.split("#")[1]
											 .match(/.{1,2}/g)
											 .map(val => parseInt(val, 16)))
	Pantone.hsl = Pantone.rgb.map(color => rgbToHSL(color))
	
	Array.min = function( array ){
		return Math.min.apply( Math, array );
	};
</script>

<script>
	import {rgbStore} from './colorStore.js'
	
	let pantone = {
			name: 'unknown',
			hsl: {},
			rgb: {}
	}
	let r, g, b;
	rgbStore.r.subscribe(val => r = val)
	rgbStore.g.subscribe(val => g = val)
	rgbStore.b.subscribe(val => b = val)
	$: pantone = nearestPantone(r, g, b)

	function nearestPantone(r, g, b) {
		let nearestArr = Pantone.rgb.map(color => color
								.reduce((err, val, i) => err += Math.abs(val - [r, g, b][i]), 0))
		let nearest = nearestArr.reduce((min, val, i) => {
			return (min.val < val) ? min : {val, i}}, {val: nearestArr[0], index: 0})

		return {
			name: Pantone.names[nearest.i],
			hsl: Pantone.hsl[nearest.i],
			rgb: Pantone.rgb[nearest.i]
		}
	}
	
	function copyText(e) {
		let text = e.target.innerText
		let textArea = document.querySelector('.hidden-textarea')
		textArea.setAttribute('value', text)
		textArea.innerText = text
		textArea.select()
		document.execCommand('copy')
		e.target.focus()
	}
</script>

<style>
	section {
		box-sizing: border-box;
		background: rgb(var(--primary-rgb));
		color: var(--contrast);
		width: 70vmin;
		padding: 2vmin 4vmin;
		border-radius: 1vmin;
		transition: background .12s ease-in-out;
	}
	
	section :first-child {
		margin-top: 1vmin;
	}
	
	section :last-child {
		margin-bottom: 1vmin;
	}
	
	a.pantone {
		background: inherit;
		color: inherit;
		text-decoration: none;
		display: block;
	}

	h3 {
		margin: .3em 0;
		padding: .2em;
		border-bottom: solid 1px;
	}
	
	p {
		box-sizing: border-box;
		position: relative;
		padding: .2em;
		border-bottom: solid 1px;
		border-color: transparent;
		transition: border-color .12s ease-in-out;
	}

	p:hover {
		border-color: var(--contrast);
	}
	
	p:focus,
	a.pantone:hover {
		background: var(--contrast);
		color: rgb(var(--primary-rgb));
		border: none;
		outline: none;

	}
	
	p:focus::after {
		content: '+';
		font-weight: bold;
		position: absolute;
		top: 50%;
		--og-transform: translate(0, calc(-50% - .1em));
		transform: var(--og-transform) scale(1);
		right: .5em;
		color: rgb(var(--primary-rgb));
		vertical-align: middle;
		transform-origin: 53% 55%;
		animation: wiggle-scale .5s ease-in-out forwards;
	}
	
	@keyframes wiggle-scale {
		0% {
			transform: var(--og-transform) scale(1) rotate(0);
		}
		20% {
			transform: var(--og-transform) scale(0.9) rotate(-15deg);
		}		
		75% {
			transform: var(--og-transform) scale(1.4) rotate(60deg);
		}		
		100% {
			transform: var(--og-transform) scale(1) rotate(90deg);
		}
	}
		
	.hidden-textarea {
		position: fixed;
		left: 100%;
		width: 0;
		height: 0;
		opacity: 0;
	}
</style>

<section style="--primary-hsl: {pantone.hsl};
								--primary-rgb: {pantone.rgb.join(', ')};
								--contrast: {(pantone.hsl.l > 50) ? '#222' : 'white'};">
	<small>Nearest Pantone</small>
	<a class="pantone" href="https://www.google.com/search?tbm=isch&q=pantone+{pantone.name}" rel="noopener" target="_blank"><h3>{pantone.name}</h3></a>
	<div class="swatch"></div>
	<p tabindex=0 on:click={copyText}>hsl({pantone.hsl.h}deg, {pantone.hsl.s}%, {pantone.hsl.l}%)</p>
	<p tabindex=0 on:click={copyText}>rgb({pantone.rgb[0]}, {pantone.rgb[1]}, {pantone.rgb[2]})</p>
</section>
<textarea class="hidden-textarea"></textarea>