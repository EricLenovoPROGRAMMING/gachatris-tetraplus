const GtrisLoader = new class{
	constructor(){
		this.loaded = true
	}
	initLoad() {
		if (field.allAssetsLoaded && field2.allAssetsLoaded &&
			soundPlayer.ALL_LOADED && musicPlayer.allLoaded &&
			field.rectanim.allLoaded && field2.rectanim.allLoaded) {
			initializeLoop()
			if (docId("loadingScreen").style.display !== "none") {
				docId("loadingScreen").style.display = "none"
			}
		} else {
			window.requestAnimationFrame(GtrisLoader.initLoad)
			if(docId("loadingScreen").style.display !== "block"){
				docId("loadingScreen").style.display = "block"
			}
			$iH("loadingText", gtris_transText("loadingText"))
 		}
	}
}()
