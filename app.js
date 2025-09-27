(function() {
	let resize = () => {
		let dom = document.getElementsByTagName("iframe")[0];
		dom.style.width = "5px";
		dom.style.height = "5px";
		
		let w = window.innerWidth;
		let h = window.innerHeight;
		
		dom.style.width = w + "px";
		dom.style.height = h + "px";
	};
	window.addEventListener("resize", resize)
	resize()
})();