// this is still very bad
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
		if (selector.dataset.src) {
			selector.addEventListener("click", e => {
				pdfFrame1.src = selector.dataset.src
				pdfLink1.href = selector.dataset.src
			})
		}
	}
	const pdfSelectors2 = document.getElementsByClassName("DP-2-pdf-selector")
	const pdfFrame2 = document.getElementById("DP-2-frame")
	const pdfLink2 = document.getElementById("DP-2-link")
	for (const selector of pdfSelectors2) {
		if (selector.dataset.src) {
			selector.addEventListener("click", e => {
				pdfFrame2.src = selector.dataset.src
				pdfLink2.href = selector.dataset.src
			})
		}
	}
	const pdfSelectors3 = document.getElementsByClassName("DP-3-pdf-selector")
	const pdfFrame3 = document.getElementById("DP-3-frame")
	const pdfLink3 = document.getElementById("DP-3-link")
	for (const selector of pdfSelectors3) {
		if (selector.dataset.src) {
			selector.addEventListener("click", e => {
				pdfFrame3.src = selector.dataset.src
				pdfLink3.href = selector.dataset.src
			})
			// selector.addEventListener("auxclick" e => {
			// 	// middle click
			// 	if (e.which === 2) {
			// 		e.preventDefault()
			// 		let oldSrc = pdfLink3.href
			// 		pdfLink3.href = selector.dataset.src
			// 		pdfLink3.click()
			// 		pdfLink3.href = oldSrc
			// 	}
			// })
		}
	}
})
