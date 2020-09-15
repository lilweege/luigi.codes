window.addEventListener('load', () => {
	const subpageSelectors = document.getElementsByClassName("list-group")
	const dropdownSelectors = document.getElementsByClassName("nav-dropdown")
	for (const selector of subpageSelectors) {
		for (const link of selector.children) {
			link.addEventListener("click", e => {
				e.preventDefault()
				for (const link of selector.children)
					link.classList.remove("active")
			})
		}
	}
	for (const selector of dropdownSelectors) {
		for (const link of selector.children) {
			link.addEventListener("click", e => {
				let a = document.getElementById(link.dataset.invocable);
				if (a)
					a.click()
			})
		}
	}
})
