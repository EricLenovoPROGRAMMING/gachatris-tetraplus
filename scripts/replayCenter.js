class ReplayCenter
{
	constructor() {
		this.replayString;
		this.replayStringSession = ""
		this.testReplayString
		this.replayBox = docId('replayCenterBox')
		this.replayCenterStation = docId('replayCenter-station')
		this.replayReq = {
			main: [
      "keyList",
      "tuning",
      "mode",
      "character",
      "seed",
      ],
			tuning: [
      "DAS",
      "ARR",
      "GRAV",
      "SFT",
      "LCK",
      "PREV",
      "name"
      ],
			AI: {
				main: [
      		      "keyList",
      		      "tuning",
      		      "name",
      		      "character",
      		      "seed",
      		],
				tuning: [
      		      "DAS",
      		      "ARR",
      		      "GRAV",
      		      "SFT",
      		      "LCK",
      		      "PREV",
      	 ]
			}
		}
	}

	testReplay() {
		var playable = true
		var errors = 0
		var undefineds = 0
		var errorMessage = ""
		try {
			if (this.replayBox.value == "") {
				throw gtris_transText("rp_enterCodePlease")
			} else {
				this.testReplayString = JSON.parse(this.replayBox.value)
				for (var main of this.replayReq.main) {
					if (typeof this.testReplayString[main] == "undefined") {
						errors++
						undefineds++
					}
				}
				if (undefineds == 0) {
					if (typeof this.testReplayString.mode !== "number") {
						errors++
					}
					if (typeof this.testReplayString.keyList !== "object") {
						errors++
					}
					if (typeof this.testReplayString.tuning !== "object") {
						errors++
					}
				}
				for (var e of this.replayReq.tuning) {
					if (typeof this.testReplayString.tuning[e] == "undefined") {
						errors++
					}
				}
				if (this.testReplayString?.tuning?.name)
					if (this.testReplayString.tuning.name.length > 25) {
						throw gtris_transText('rp_nameError')
					}
				switch (this.testReplayString.mode) {
					case 1: {
						this.checkModeParameters("lineRun", [['lines', "number"], ['type',"number"]])
						break
					}
					case 2: {
						this.checkModeParameters("scoreAtk", [['timer', "number"]])
						break
					}
					case 3: {
						this.checkModeParameters("fourWide", [['timer',"number"]])
						break
					}
					case 5: {
						this.checkModeParameters("dsFrenzy", [['timer'], ['phase'], ['fails']])
						break
					}
					case 6: {
						this.checkModeParameters("garbageSurvival", [['autolevel','number'], ['receptioncount',"number"], ['initduration',"number"]])
						break
					}
					case 7: {
						this.checkModeParameters("levelrun", [['level',"number"], ['lines',"both"], ['aretype',"number"], ['linestorequire',"number"], ['levelcap',"both"]])
						break
					}
					case 8: {
						this.checkModeParameters("area20", [['level', "number"], ['lines', "both"], ['linestorequire', "number"], ['levelcap', "both"]])
						break;
					}
					case 9: {
						this.checkModeParameters("amogus", [['timer', "number"]])
						break
					}
					case 10: {
						this.checkModeParameters("versusGarbage", [['receptioncount', "number"]])
						break
					}
					case 11: {
						this.checkModeParameters("frenzyWar", [['timer', "number"], ['phase', "number"], ['health', "number"]])
						break
					}
				}
			}
		} catch (e) {
			playable = false
			errorMessage = e
			this.showError("replayFailed", "replayFailedInputError", errorMessage)
		} finally {
			if (playable && errors == 0) {
				replayData = this.testReplayString
				this.replayString = this.testReplay
				gameStart("REPLAY", this.testReplayString.mode)
			} else if (errorMessage == "") {
				this.showError("replayFailed", "replayFailedNoInpErr")
			}
		}
	}

	checkAIParameter(t) {
		var parameters = this.replayReq.AI.main,
			parametersTuning = this.replayReq.AI.tuning
		var isModeError = ""
		var isParamError = ""
		var errors = []
		var paramErrors = []
		var n = "player2"
		if (typeof this.testReplayString[n] !== "object") {
			isModeError = n
		} else {
			if (typeof this.testReplayString[n]["main"] !== "object") {
				isParamError = "main"
			} else for (var h of parameter) {
					if (typeof this.testReplayString[n]["main"][h] !== "number") {
						errors.push(h)
					}
				}
		}
		if (isModeError !== "") {
			throw gtris_transText("rp_AIError", isModeError)
			return
		} else
		if (errors.length !== 0) {
			throw gtris_transText("rp_AIParameterError", [errors.length, (function() {
				var str = ""
				for (var e of errors) {
					str += `"${e}"<br>`
				}
				return str
			})()])
		}
	}

	checkModeParameters(mode, arr) {
		var parameters = arr
		var isModeError = ""
		var errors = []
		var n = mode
		if (typeof this.testReplayString[n] !== "object") {
			isModeError = n
		} else {
			for (var h of parameters) {
				if ((h[1] == "both" && (typeof this.testReplayString[n][h[0]] !== "number" && typeof this.testReplayString[n][h[0]] !== "string")) || (typeof this.testReplayString[n][h[0]] !== h[1])) {
					errors.push(h[0]);
				}
			}
		}
		if (isModeError !== "") {
			throw gtris_transText("rp_modeError", isModeError)
			return
		} else
		if (errors.length !== 0) {
			throw gtris_transText("rp_modeParameterError", [errors.length, (function() {
				var str = ""
				for (var e of errors) {
					str += `"${e}"<br>`
				}
				return str
			})()])
		}
	}

	generateReplay() {
		this.openReplayCenter();
		this.replayString = JSON.stringify(replayData);
		this.replayStringSession = this.replayString;
		this.replayBox.innerHTML = this.replayString;
	}
	openReplayCenter() {
		switchMenu(12, true, "rp_center")
		this.replayCenterStation.innerHTML = `
         <gtris-listCell>
            <gtris-text>${gtris_transText("rp_centerDesc")}</gtris-text>
         </gtris-listCell>
         <gtris-listCell>
            <textarea id="replayCenterBox" onchange="replayCenter.replayStringSession = this.value" spellcheck="false" style="width:80%;height:30em;resize:none;background:#232323;color:#fff">${this.replayStringSession}</textarea>
         </gtris-listCell>
         <gtris-listCell>
            <gtris-button onclick="replayCenter.testReplay()">${gtris_transText("rp_tryReplay")}</gtris-button>
         </gtris-listCell>
         <gtris-listCell>
            <gtris-button onclick="replayCenter.uploadReplay()">${gtris_transText("rp_openFileReplay")}</gtris-button>
         </gtris-listCell>
         <gtris-listCell>
            <gtris-button onclick="replayCenter.downloadReplay()">${gtris_transText("rp_saveFileReplay")}</gtris-button>
         </gtris-listCell>
         `
		this.replayBox = docId('replayCenterBox')
		RESIZE()
	}

	downloadReplay() {
		function download(filename, _textInput) {
			let textIn = _textInput
			var blobs = new Blob([textIn], { type: 'text/plain' })
			var blobURL = URL.createObjectURL(blobs)
			var element = document.createElement('a')
			element.setAttribute('href', blobURL)
			element.setAttribute('download', filename);
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		}
		if (this.replayString !== void 0) {
			var text = this.replayString
			var filename = "gachatris_tetraplus_replay_" + Date.now() + Math.random().toString().replace(".", "-%") + ".gttp-json";
			download(filename, text);
		}
	}
	uploadReplay() {
		var input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('multiple', 'true')
		input.onchange = (e) => {
			var fileDetect = e.target.files;
			var file
			var test
			if (fileDetect.length == 1) {
				file = fileDetect[0]
				if (file.name.endsWith('.gttp-json')) {
					let reader = new FileReader()
					reader.readAsText(file, 'UTF-8')
					reader.onload = (ReaderEv) => {
						var ctx = ReaderEv.target.result
						var bool = true
						try {
							test = JSON.parse(ctx)
						} catch (e) {
							bool = false
							this.showError("uploadFailed", "uploadFailedJSON", e)
						} finally {
							if (bool) {
								this.replayStringSession = ctx
								docId('replayCenterBox').value = ctx
							}
						}
					}
				} else this.showError("uploadFailed", "uploadFailedFileExt", file.name)
			}
		}
		input.click();

	}
	showError(header, error, reason) {
		switchMenu(13, true, `rp_${header}`)
		docId('replayResults-window').innerHTML = `
      <gtris-listCell>
      <gtris-text>${gtris_transText(`rp_${error}`,reason)}</gtris-text>
      </gtris-listCell>
      `
		uiSound.playse("error")
	}
}

const replayCenter = new ReplayCenter()
