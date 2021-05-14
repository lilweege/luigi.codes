// local storage key/vals
const THEME = 'theme'
const DARK = 'dark'
const LIGHT = 'light'

const setTheme = (currentTheme) => {
	if (currentTheme === LIGHT) {
		localStorage.setItem(THEME, LIGHT)
		document.body.removeAttribute('data-theme')
	}
	else {
		localStorage.setItem(THEME, DARK)
		document.body.setAttribute('data-theme', 'dark')
	}
}

window.addEventListener('load', () => {
	let currentTheme = localStorage.getItem(THEME)

	if (!currentTheme) { // first time visitor
		const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
		// if no-preference, theme will be set to dark
		currentTheme = prefersLight ? LIGHT : DARK
	}
	setTheme(currentTheme)
	
	// const darkSwitch = document.getElementById('darkSwitch')
	if (darkSwitch) {
		darkSwitch.checked = currentTheme === DARK
		darkSwitch.addEventListener('change', () => {
			setTheme(darkSwitch.checked ? DARK : LIGHT)
		})
	}
})
