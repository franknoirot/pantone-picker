export let toTwoDecimals = (num) => {
	return Math.round(num * 100) / 100
}

export let clamp = (num, min, max) => {
	return num <= min ? min : num >= max ? max : num
}

export function rgbToHSL([r, g, b]) {
	// Make r, g, and b fractions of 1
	r /= 255;
	g /= 255;
	b /= 255;

	// Find greatest and smallest channel values
	let cmin = Math.min(r,g,b),
			cmax = Math.max(r,g,b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
	
	if (delta == 0)
		h = 0;
	// Red is max
	else if (cmax == r)
		h = ((g - b) / delta) % 6;
	// Green is max
	else if (cmax == g)
		h = (b - r) / delta + 2;
	// Blue is max
	else
		h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	// Make negative hues positive behind 360�
	if (h < 0)
			h += 360;
	
	// Calculate lightness
	l = (cmax + cmin) / 2;

	// Calculate saturation
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	// Multiply l and s by 100
	s = toTwoDecimals(s * 100)
	l = toTwoDecimals(l * 100)

	return {h, s, l};
}