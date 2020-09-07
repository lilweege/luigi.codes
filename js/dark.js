const darkSwitch = document.getElementById('darkSwitch');
const mainNav = document.getElementById("main-nav");

window.addEventListener('load', () => {
	if (darkSwitch) {
		darkSwitch.checked = localStorage.getItem('darkSwitch') === 'dark';
		setTheme();
		darkSwitch.addEventListener('change', setTheme);
	}
});

const setTheme = () => {
	if (darkSwitch.checked) {
		localStorage.setItem('darkSwitch', 'dark');
		document.body.setAttribute('data-theme', 'dark');
		mainNav.classList.remove("navbar-light");
		mainNav.classList.add("navbar-dark");
	}
	else {
		localStorage.removeItem('darkSwitch');
		document.body.removeAttribute('data-theme');
		mainNav.classList.remove("navbar-dark");
		mainNav.classList.add("navbar-light");
	}
}
