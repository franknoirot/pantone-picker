import { writable, derived } from 'svelte/store'

export let hsbStore = {
	h: writable(271),
	s: writable(60),
	b: writable(50)
}

let {h, s, b} = hsbStore

export let hslStore = {
	h: derived([h, s, b], ([$h, $s, $b]) => hsbToHSL($h, $s, $b).h),
	s: derived([h, s, b], ([$h, $s, $b]) => hsbToHSL($h, $s, $b).s),
	l: derived([h, s, b], ([$h, $s, $b]) => hsbToHSL($h, $s, $b).l)
}

function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

function toTwoDecimals(num) {
	return Math.round(num * 100) / 100
}
	
function hsbToHSL(hue, sat, bright) {
	sat = clamp(sat, 0, 100) / 100
	bright = clamp(bright, 0, 100) / 100

	let light = .5 * bright * (2 - sat) || 0;
	let hslSat = bright * sat / (1 - Math.abs(2 * light - 1)) || 0

	return {h: hue,
					s: toTwoDecimals(hslSat*100),
					l: toTwoDecimals(light*100)}
}

export let rgbStore = {
	r: derived([h, s, b], ([$h, $s, $l]) => hslToRGB(hsbToHSL($h,$s,$l)).r),
	g: derived([h, s, b], ([$h, $s, $l]) => hslToRGB(hsbToHSL($h,$s,$l)).g),
	b: derived([h, s, b], ([$h, $s, $l]) => hslToRGB(hsbToHSL($h,$s,$l)).b)
}

function hslToRGB({h, s, l}) {
	s = clamp(s, 0, 100) / 100
	l = clamp(l, 0, 100) / 100
	h = h % 360

	let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs((h / 60) % 2 - 1)),
			m = l - c/2,
			r = 0,
			g = 0,
			b = 0

	if (0 <= h && h < 60) {
		r = c; g = x; b = 0
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0
	} else if (120 <= h && h < 180) {
		r = 0; g = c; b = x
	} else if (180 <= h && h < 240) {
		r = 0; g = x; b = c
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c
	} else if (300 <= h && h < 360) {
		r = c; g = 0; b = x
	}
	r = Math.round((r + m) * 255)
	g = Math.round((g + m) * 255)
	b = Math.round((b + m) * 255)

	return {r, g, b}
}
