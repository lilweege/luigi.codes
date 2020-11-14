window.addEventListener('load', () => {
	document.getElementById('loading-screen').className = "hidden";
	for (let low of document.images) {
		let full = document.createElement('img');
		full.src = low.src.replace(/\b\/low\/\b/g, "/full/");
		full.onload = function() {
			low.src = this.src;
		}
	}
});
