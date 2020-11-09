window.addEventListener('load', () => {
	const dropdownSelectors = document.getElementsByClassName("nav-dropdown")
	for (const selector of dropdownSelectors) {
		for (const link of selector.children) {
			link.addEventListener("click", e => {
				let a = document.getElementById(link.dataset.invocable)
				if (a) a.click()
			})
		}
	}
	const pdfSelectors1 = document.getElementsByClassName("DP-1-pdf-selector")
	const pdfFrame1 = document.getElementById("DP-1-frame")
	const pdfLink1 = document.getElementById("DP-1-link")
	for (const selector of pdfSelectors1) {
		selector.addEventListener("click", e => {
			pdfFrame1.src = selector.dataset.src
			pdfLink1.href = selector.dataset.src
		})
	}
})
