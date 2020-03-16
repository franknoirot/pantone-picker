# Pantone Color Picker
I think color pickers are my to-do list. This was a project I built to test out how I could use Svelte.js for practical problems, and work on my styling mimicry, because I like how Google has designed their color picker widget on search.

It's all pretty basic as far as Svelte goes. It uses Margaret2's great Pantone file resource to look up the nearest picked color and make a little card for it, then I generate a Google Image Search URL for that Panton color, or you can copy a color value with a click which is nice.

Some bugs:
- the UI breaks if you put in values outside of the range
- the UI doesn't include hex
- the transitions are slightly out of sync because I'm using `transition: all` somewhere