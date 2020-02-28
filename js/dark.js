const darkSwitch = document.getElementById('darkSwitch');
window.addEventListener('load', () => {
	if (darkSwitch) {
		initTheme();
		darkSwitch.addEventListener('change', () => { resetTheme(); });
	}
});

function initTheme() {
	const darkThemeSelected = localStorage.getItem('darkSwitch') !== null && localStorage.getItem('darkSwitch') === 'dark';
	darkSwitch.checked = darkThemeSelected;
	if (darkThemeSelected) {
		document.body.setAttribute('data-theme', 'dark');
		document.getElementById("main-nav").className = document.getElementById("main-nav").className.replace(/\blight\b/g, "dark");
	}
	else {
		document.body.removeAttribute('data-theme');
		document.getElementById("main-nav").className = document.getElementById("main-nav").className.replace(/\bdark\b/g, "light");
	}
}

function resetTheme() {
	if (darkSwitch.checked) {
		document.body.setAttribute('data-theme', 'dark');
		document.getElementById("main-nav").className = document.getElementById("main-nav").className.replace(/\blight\b/g, "dark");
		localStorage.setItem('darkSwitch', 'dark');
	}
	else {
		document.body.removeAttribute('data-theme');
		document.getElementById("main-nav").className = document.getElementById("main-nav").className.replace(/\bdark\b/g, "light");
		localStorage.removeItem('darkSwitch');
	}
}
