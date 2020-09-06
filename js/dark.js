const darkSwitch = document.getElementById('darkSwitch');
let mainNav = document.getElementById("main-nav");

window.addEventListener('load', () => {
	if (darkSwitch) {
		initTheme();
		darkSwitch.addEventListener('change', setTheme);
	}
});

const initTheme = () => {
	if (darkSwitch.checked = localStorage.getItem('darkSwitch') === 'dark') {
		document.body.setAttribute('data-theme', 'dark');
		mainNav.className = mainNav.className.replace(/\blight\b/g, "dark");
	}
	else {
		document.body.removeAttribute('data-theme');
		mainNav.className = mainNav.className.replace(/\bdark\b/g, "light");
	}
}

const setTheme = () => {
	if (darkSwitch.checked) {
		document.body.setAttribute('data-theme', 'dark');
		mainNav.className = mainNav.className.replace(/\blight\b/g, "dark");
		localStorage.setItem('darkSwitch', 'dark');
	}
	else {
		document.body.removeAttribute('data-theme');
		mainNav.className = mainNav.className.replace(/\bdark\b/g, "light");
		localStorage.removeItem('darkSwitch');
	}
}
