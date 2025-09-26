const GtrisLoader = new class {
	constructor() {
		this.loaded = true;
		this.assetsLoaded = true;
		this.loadingEntranceFrames = 100;
	};
	initLoad() {
		let baseLoad = field.allAssetsLoaded && field2.allAssetsLoaded &&
			soundPlayer.ALL_LOADED && musicPlayer.allLoaded &&
			field.rectanim.allLoaded && field2.rectanim.allLoaded;
		let canLoad = baseLoad; //redundancy
		
		if (baseLoad) {
			if (!this.assetsLoaded) {
				this.assetsLoaded = true;
				RESIZE();
			}
		}
			if (!isReplay && (server.isOnline)) {
				if (baseLoad && !server.isPrepared) {
					server.isPrepared = true;
					server.emit("MATCH_READY", []);
				}
				if (!server.isReady) {
					canLoad = false;
				}
			}
			
			
		if (canLoad) {
			 if(!this.loaded) {
			  field.doStartup();
	  		field2.doStartup();
     this.loaded = true;
			 }
			initializeLoop();
			if (docId("loadingScreen").style.display !== "none") {
				docId("loadingScreen").style.display = "none";
			}
			  mobileButtons.showHide(true);
			  mobileButtons.checkButtons();

		} else {
			window.requestAnimationFrame(() => this.initLoad());
		 this.loaded = false;
		 
			if(docId("loadingScreen").style.display !== "block"){
				docId("loadingScreen").style.display = "block";
			}
			$iH("loadingText", server.isPrepared && this.assetsLoaded ? gtris_transText("online_wait") : gtris_transText("loadingText"))
 		}
	}
}()
