let observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('active');
		}
	})
});

for (const item of [...document.querySelectorAll('[data-aos="fade-up"]')]) {
	observer.observe(item)
}
