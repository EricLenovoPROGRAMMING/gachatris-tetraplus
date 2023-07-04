const GtrisLoader = new class {
	constructor() {
		this.loaded = true;
		this.loadingEntranceFrames = 100;
	};
	initLoad() {
		if (field.allAssetsLoaded && field2.allAssetsLoaded &&
			soundPlayer.ALL_LOADED && musicPlayer.allLoaded &&
			field.rectanim.allLoaded && field2.rectanim.allLoaded) {
			 if(!GtrisLoader.loaded) {
			  field.doStartup();
	  		field2.doStartup();
     GtrisLoader.loaded = true;
			 }
			initializeLoop();
			if (docId("loadingScreen").style.display !== "none") {
				docId("loadingScreen").style.display = "none";
			}
			  mobileButtons.showHide(true);
			  mobileButtons.checkButtons();

		} else {
			window.requestAnimationFrame(GtrisLoader.initLoad);
		 GtrisLoader.loaded = false;
		 
			if(docId("loadingScreen").style.display !== "block"){
				docId("loadingScreen").style.display = "block"
			}
			$iH("loadingText", gtris_transText("loadingText"))
 		}
	}
}()
