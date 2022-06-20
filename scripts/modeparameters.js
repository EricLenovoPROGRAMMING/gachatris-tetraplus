var modeParameters = {
	texts: {
		zen: {},
		linerun: {
			LINE: range(20, 1020, 20),
			TYPE: [gtris_transText('m_linerunQueueType_0'), gtris_transText('m_linerunQueueType_1'), gtris_transText('m_linerunQueueType_2')]
		},
		scoreatk: {
			TIMER: range(60 * 120, 3610 * 120, 10 * 120)
		},
		fourwide: {
			TIMER: range(60 * 120, 3610 * 120, 10 * 120)
		},
		tsd: {},
		dsfrenzy: {
			TIMER: range(60 * 120, 3610 * 120, 10 * 120),
			FAILS: range(0, 51),
			PHASE: range(1, 14)
		},
		survival: {
			GALEVEL: range(1, 11),
			GRLIMIT: range(0, 16),
			INIT: range(0, 2010, 10)
		},
		levelrun: {
			LEVEL: range(1, 61),
			LINE: range(30, 480, 30),
			LINEREQ: range(4, 30),
			ARETYPE: ["NO DELAY", "SHORT", "LONG"],
			LEVELCAP: range(15, 50),
		},
		area20: {
			LEVEL: range(1, 61),
			LINE: range(30, 780, 30),
			LINEREQ: range(4, 50),
			LEVELCAP: range(15, 50),
		},
		amogus: {
			TIMER: range(60 * 120, 3610 * 120, 10 * 120)
		},
	},

}
modeParameters.texts.levelrun.LEVELCAP.push(gtris_transText("m_levelrunInfinity"))
modeParameters.texts.levelrun.LINE.push(gtris_transText("m_levelrunEndless"))
modeParameters.texts.area20.LEVELCAP.push(gtris_transText("m_area20Infinity"))
modeParameters.texts.area20.LINE.push(gtris_transText("m_area20Endless"))

function modeParameterChange(varia, mode, varObj, varObjText) {
	var value = varia
	var val = bool => bool ? value : ~~(value)
	var t = modeParameters.texts[mode][varObj]
	selectedSettings.Modes[mode][varObj] = val(false)
	if (typeof varObjText == "object")
		switch (varObjText.type) {
			case 'arrStr': {
				$iH(`0x327496-${varObjText.id}`, t[val(false)])
				break
			}
			case 'number': {
				$iH(`0x327496-${varObjText.id}`, val(true))
				break
			}
			case 'timer': {
				$iH(`0x327496-${varObjText.id}`, returnStatistics(t[val(false)]))
				break
			}
		}
}

function modeParamSwitch(mode, name) {
	//try {
	let a = (iH) => { $iH('mode-parameter-station', iH) }
	switch (mode) {
		case 0: {
			a(`
        <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
         <gtris-text style='text-align:center'>
         ${gtris_transText('m_zenDesc')}
         </gtris-text>
          </gtris-listCell>
              <gtris-listCell>
              <gtris-button onclick="gameStart(0)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
            </gtris-listCell>
      `)
			break
		}
		case 1: {
			modeParameters.texts.linerun.TYPE = [gtris_transText('m_linerunQueueType_0'), gtris_transText('m_linerunQueueType_1'), gtris_transText('m_linerunQueueType_2')]
			a(`
        <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
         <gtris-text style='text-align:center'>
         ${gtris_transText('m_linerunDesc')}
         </gtris-text>
          </gtris-listCell>
            <gtris-listcell style="height: 10%; display: table; width: 100%;">
    <div style="display: flex;">
          <gtris_normaltext style="width: auto; height: 100%;">Lines To Complete:&nbsp</gtris_normaltext>
      <gtris_normaltext id=0x327496-378 style="width: auto; height: 100%;">${modeParameters.texts.linerun.LINE[selectedSettings.Modes.linerun.LINE]}</gtris_normaltext>
    </div>
    <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.linerun.LINE.length - 1}" value="${selectedSettings.Modes.linerun.LINE}" oninput="modeParameterChange(this.value,'linerun','LINE',{id:'378',type:'arrStr'})" style="height: 100%;"></div>
  </gtris-listcell>
            <gtris-listcell style="height: 10%; display: table; width: 100%;">
    <div style="display: flex;">
          <gtris_normaltext style="width: auto; height: 100%;">Piece Queue Type:&nbsp</gtris_normaltext>
      <gtris_normaltext id=0x327496-108 style="width: auto; height: 100%;">${modeParameters.texts.linerun.TYPE[selectedSettings.Modes.linerun.TYPE]}</gtris_normaltext>
    </div>
    <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.linerun.TYPE.length - 1}" value="${selectedSettings.Modes.linerun.TYPE}" oninput="modeParameterChange(this.value,'linerun','TYPE',{id:'108',type:'arrStr'})" style="height: 100%;"></div>
  </gtris-listcell>

              <gtris-listCell>
              <gtris-button onclick="gameStart(1)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
            </gtris-listCell>
      `)
			break
		}
		case 2: {
			a(`
              <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
               <gtris-text style='text-align:center'>
               ${gtris_transText('m_scoreatkDesc')}
               </gtris-text>
                </gtris-listCell>
       
                  <gtris-listCell style="height: 10%; display: table; width: 100%;">
          <div style="display: flex;">
                <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_scoreatkTimer')}:&nbsp</gtris_normaltext>
            <gtris_normaltext id=0x327496-199 style="width: auto; height: 100%;">${returnStatistics(modeParameters.texts.scoreatk.TIMER[selectedSettings.Modes.scoreatk.TIMER])}</gtris_normaltext>
          </div>
          <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.scoreatk.TIMER.length - 1}" value="${selectedSettings.Modes.scoreatk.TIMER}" oninput="modeParameterChange(this.value,'scoreatk','TIMER',{id:'199',type:'timer'})" style="height: 100%;"></div>
        </gtris-listCell>
      
                    <gtris-listCell>
                    <gtris-button onclick="gameStart(2)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
                  </gtris-listCell>
            `)
			break
		}
		case 3: {
			a(`
                    <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
                     <gtris-text style='text-align:center'>
                     ${gtris_transText('m_fourwideDesc')}
                     </gtris-text>
                      </gtris-listCell>
             
                        <gtris-listcell style="height: 10%; display: table; width: 100%;">
                <div style="display: flex;">
                      <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_fourwideTimer')}:&nbsp</gtris_normaltext>
                  <gtris_normaltext id=0x327496-a199 style="width: auto; height: 100%;">${returnStatistics(modeParameters.texts.fourwide.TIMER[selectedSettings.Modes.fourwide.TIMER])}</gtris_normaltext>
                </div>
                <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.fourwide.TIMER.length - 1}" value="${selectedSettings.Modes.fourwide.TIMER}" oninput="modeParameterChange(this.value,'fourwide','TIMER',{id:'a199',type:'timer'})" style="height: 100%;"></div>
              </gtris-listcell>
            
                          <gtris-listCell>
                          <gtris-button onclick="gameStart(3)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
                        </gtris-listCell>
                  `)
			break
		}
		case 4: {
			a(`
                    <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
                     <gtris-text style='text-align:center'>
                     ${gtris_transText('m_tsdDesc')}
                     </gtris-text>
                      </gtris-listCell>
                          <gtris-listCell>
                          <gtris-button onclick="gameStart(4)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
                        </gtris-listCell>
                  `)
			break
		}
		case 5: {
			a(`
                                <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
                                 <gtris-text style='text-align:center'>
                                 ${gtris_transText('m_dsfrenzyDesc')}
                                 </gtris-text>
                                  </gtris-listCell>
                                  
                  <gtris-listCell style="height: 10%; display: table; width: 100%;">
          <div style="display: flex;">
                <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_dsfrenzyTimer')}:&nbsp</gtris_normaltext>
            <gtris_normaltext id=0x327496-d79 style="width: auto; height: 100%;">${returnStatistics(modeParameters.texts.dsfrenzy.TIMER[selectedSettings.Modes.dsfrenzy.TIMER])}</gtris_normaltext>
          </div>
          <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.dsfrenzy.TIMER.length - 1}" value="${selectedSettings.Modes.dsfrenzy.TIMER}" oninput="modeParameterChange(this.value,'dsfrenzy','TIMER',{id:'d79',type:'timer'})" style="height: 100%;"></div>
        </gtris-listCell>
        
                          <gtris-listCell style="height: 10%; display: table; width: 100%;">
                  <div style="display: flex;">
                        <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_dsfrenzyPhase')}:&nbsp</gtris_normaltext>
                    <gtris_normaltext id=0x327496-d80 style="width: auto; height: 100%;">${modeParameters.texts.dsfrenzy.PHASE[selectedSettings.Modes.dsfrenzy.PHASE]}</gtris_normaltext>
                  </div>
                  <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.dsfrenzy.PHASE.length - 1}" value="${selectedSettings.Modes.dsfrenzy.PHASE}" oninput="modeParameterChange(this.value,'dsfrenzy','PHASE',{id:'d80',type:'arrStr'})" style="height: 100%;"></div>
                </gtris-listCell>
                
                                          <gtris-listCell style="height: 10%; display: table; width: 100%;">
                                  <div style="display: flex;">
                                        <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_dsfrenzyFails')}:&nbsp</gtris_normaltext>
                                    <gtris_normaltext id=0x327496-d81 style="width: auto; height: 100%;">${modeParameters.texts.dsfrenzy.FAILS[selectedSettings.Modes.dsfrenzy.FAILS]}</gtris_normaltext>
                                  </div>
                                  <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.dsfrenzy.FAILS.length - 1}" value="${selectedSettings.Modes.dsfrenzy.FAILS}" oninput="modeParameterChange(this.value,'dsfrenzy','FAILS',{id:'d81',type:'arrStr'})" style="height: 100%;"></div>
                                </gtris-listCell>

                                      <gtris-listCell>
                                      <gtris-button onclick="gameStart(5)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
                                    </gtris-listCell>
                              `)
			break
		}
		case 6: {
			a(`
                                <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
                                 <gtris-text style='text-align:center'>
                                 ${gtris_transText('m_survivalDesc')}
                                 </gtris-text>
                                  </gtris-listCell>
                         
                                    <gtris-listcell style="height: 10%; display: table; width: 100%;">
                            <div style="display: flex;">
                                  <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_survivalGarbAutoLevel')}:&nbsp</gtris_normaltext>
                              <gtris_normaltext id=0x327496-0028 style="width: auto; height: 100%;">${modeParameters.texts.survival.GALEVEL[selectedSettings.Modes.survival.GALEVEL]}</gtris_normaltext>
                            </div>
                            <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.survival.GALEVEL.length - 1}" value="${selectedSettings.Modes.survival.GALEVEL}" oninput="modeParameterChange(this.value,'survival','GALEVEL',{id:'0028',type:'arrStr'})" style="height: 100%;"></div>
                          </gtris-listcell>
                          
                                                              <gtris-listcell style="height: 10%; display: table; width: 100%;">
                                                      <div style="display: flex;">
                                                            <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_survivalGarbageReceptionLimit')}:&nbsp</gtris_normaltext>
                                                        <gtris_normaltext id=0x327496-00399 style="width: auto; height: 100%;">${modeParameters.texts.survival.GRLIMIT[selectedSettings.Modes.survival.GRLIMIT]}</gtris_normaltext>
                                                      </div>
                                                      <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.survival.GRLIMIT.length - 1}" value="${selectedSettings.Modes.survival.GRLIMIT}" oninput="if(this.value=='0'){$iH('0x327496-00399', gtris_transText('m_survivalNoLimit')); modeParameterChange(this.value, 'survival', 'GRLIMIT')} else {modeParameterChange(this.value,'survival','GRLIMIT',{id:'00399',type:'arrStr'})}" style="height: 100%;"></div>
                                                    </gtris-listcell>
                        
                                          <gtris-listCell style="height: 10%; display: table; width: 100%;">
                                  <div style="display: flex;">
                                        <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_survivalInitGarbDuration')}:&nbsp</gtris_normaltext>
                                    <gtris_normaltext id=0x327496-1E style="width: auto; height: 100%;">${returnStatistics(modeParameters.texts.survival.INIT[selectedSettings.Modes.survival.INIT])}</gtris_normaltext>
                                  </div>
                                  <div style="display: flex;"><input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts.survival.INIT.length - 1}" value="${selectedSettings.Modes.survival.INIT}" oninput="modeParameterChange(this.value,'survival','INIT',{id:'1E',type:'timer'})" style="height: 100%;"></div>
                                </gtris-listCell>
                                
                                      <gtris-listCell>
                                      <gtris-button onclick="gameStart(6)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
                                    </gtris-listCell>
                              `)
			break
		}
		case 7: {
			modeParameters.texts.levelrun = {
				LEVEL: range(1, 61),
				LINE: range(30, 480, 30),
				LINEREQ: range(4, 30),
				ARETYPE: [gtris_transText("m_levelrunAreType0"), gtris_transText("m_levelrunAreType1"), gtris_transText("m_levelrunAreType2")],
				LEVELCAP: range(15, 50),
			}
			modeParameters.texts.levelrun.LEVELCAP.push(gtris_transText("m_levelrunInfinity"))
			modeParameters.texts.levelrun.LINE.push(gtris_transText("m_levelrunEndless"))

			a(`
                    <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
                     <gtris-text style='text-align:center'>
                     ${gtris_transText('m_levelrunDesc')}
                     </gtris-text>
                      </gtris-listCell>
                      ${makeParaneterSlider("levelrun", "Lines", "levelrun", "LINE", "arrStr")}
                      ${makeParaneterSlider("levelrun", "Level", "levelrun", "LEVEL", "arrStr")}
                      ${makeParaneterSlider("levelrun", "LineReq", "levelrun", "LINEREQ", "arrStr")}
                      ${makeParaneterSlider("levelrun", "AreType", "levelrun", "ARETYPE", "arrStr")}
                      ${makeParaneterSlider("levelrun", "LevelCap", "levelrun", "LEVELCAP", "arrStr")}

                          <gtris-listCell>
                          <gtris-button onclick="gameStart(7)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
                        </gtris-listCell>
                  `)
			break
		}
		case 8: {
			modeParameters.texts.area20 = {
				LEVEL: range(1, 91),
				LINE: range(30, 780, 30),
				LINEREQ: range(4, 30),
				LEVELCAP: range(30, 50),
			}
			modeParameters.texts.area20.LEVELCAP.push(gtris_transText("m_area20Infinity"))
			modeParameters.texts.area20.LINE.push(gtris_transText("m_area20Endless"))

			a(`
		                    <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
		                     <gtris-text style='text-align:center'>
		                     ${gtris_transText('m_area20Desc')}
		                     </gtris-text>
		                      </gtris-listCell>
		                      ${makeParaneterSlider("area20", "Lines", "area20", "LINE", "arrStr")}
		                      ${makeParaneterSlider("area20", "Level", "area20", "LEVEL", "arrStr")}
		                      ${makeParaneterSlider("area20", "LineReq", "area20", "LINEREQ", "arrStr")}
		                      ${makeParaneterSlider("area20", "LevelCap", "area20", "LEVELCAP", "arrStr")}
		
		                          <gtris-listCell>
		                          <gtris-button onclick="gameStart(8)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
		                        </gtris-listCell>
		                  `)
			break
		}
		case 9: {
			a(`
		        <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
		         <gtris-text style='text-align:center'>
		         ${gtris_transText('m_amogusDesc1')}
		         </gtris-text>
		          </gtris-listCell>
		          <gtris-listCell>
		          <div style = "display:table; padding: 1em 1em 1em 1em">
		          ${(function(){
		          let a=3,
		          b= 7,
		          c= 6,
		          d= 5,
		          e = 2,
		          bcolors = ["#222", "#0ff", "#00f", "#a60", "#ff0", "#0f0", "#f0f", "#f00"]
		          var grid = [
		          	[0, 0, 0, 0, 0, 0, a],
		          [0, b, b, c, a, a, a],
		          [b, b, 0, c, c, 0, 0],
		          [0, d, d, c, e, e, e],
		          [0, 0, d, d, 0, 0, e],
		          [0, 0, 0, 0, 0, 0, 0]]
		          
		          var str = ""
		          for(var y = 0; y < 7; y++){
		          	str += `<riv style="display:flex;height:${cellSize}px;width:${cellSize*5}px;position:relative;padding:0 0;${y < 2 ? "background:#000":"none"};">`
		          	for(var x = 0; x < 5; x++){
		          			str += `<niv style="display:flex;height:${cellSize}px;width:${cellSize}px;position:relative;padding:0 0;background:${grid[x][y] !== 0?bcolors[grid[x][y]]:y<2?"#444":y>1?"#444":"none"};border: 1px solid #000"></niv>`
		          	}
		          	str += "</riv>"
		          }
		          return str
		          }
		          )()}
		          
		          </div>
		          		          <div style = "display:table; padding: 1em 1em 1em 1em">
		          ${(function(){
		          let a=7,
		          b= 3,
		          c= 6,
		          d= 5,
		          e = 2,
		          bcolors = ["#222", "#0ff", "#00f", "#a60", "#ff0", "#0f0", "#f0f", "#f00"]
		          var grid = [
		          	[0, 0, a, a, 0, 0, b],
		          [0, a, a, c, b, b, b],
		          [d, d, 0, c, c, 0, 0],
		          [0, d, d, c, e, e, e],
		          [0, 0, 0, 0, 0, 0, e],
		          [0, 0, 0, 0, 0, 0, 0]]
		          
		          var str = ""
		          for(var y = 0; y < 7; y++){
		          	str += `<riv style="display:flex;height:${cellSize}px;width:${cellSize*5}px;position:relative;padding:0 0;${y < 2 ? "background:#000":"none"};">`
		          	for(var x = 0; x < 5; x++){
		          			str += `<niv style="display:flex;height:${cellSize}px;width:${cellSize}px;position:relative;padding:0 0;background:${grid[x][y] !== 0?bcolors[grid[x][y]]:y<2?"#444":y>1?"#444":"none"};border: 1px solid #000"></niv>`
		          	}
		          	str += "</riv>"
		          }
		          return str
		          }
		          )()}
		          </div>
		          </gtris-listCell>
		          		        <gtris-listCell style="height: auto; display: flex; width: 100%;padding-bottom:0.5em">
		          		         <gtris-text style='text-align:center'>
		          		         ${gtris_transText('m_amogusDesc2')}
		          		         </gtris-text>
		          		         </gtris-listCell>
		          		${makeParaneterSlider("amogus", "Timer", "amogus", "TIMER", "timer")}
		              <gtris-listCell>
		              <gtris-button onclick="gameStart(9)">${gtris_transText('startGame').toUpperCase()}</gtris-button>
		            </gtris-listCell>
		      `)
			break
		}
	}
	switchMenu(11, true, name)
	RESIZE()
	/*  } catch (e) {
	    alert(e)
	  }*/
}

const makeParaneterSlider = function(name, nametype, mode, param, type) {
	var randId = (Math.random() * 2147483647).toFixed(8)
	return ` <gtris-listCell style = "height: 10%; display: table; width: 100%;" >
			<div style="display: flex;">
	           <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText(`m_${name}${nametype}`)}:&nbsp</gtris_normaltext>
	            <gtris_normaltext id=0x327496-${randId} style="width: auto; height: 100%;">${type.toUpperCase() == "TIMER" ? returnStatistics(modeParameters.texts[mode][param][selectedSettings.Modes[mode][param]]) : modeParameters.texts[mode][param][selectedSettings.Modes[mode][param]]}</gtris_normaltext>
	          </div> <div style = "display: flex;" > <input type="range" onchange="saveSTORAGE()" min="0" max="${modeParameters.texts[mode][param].length - 1}" value="${selectedSettings.Modes[mode][param]}" oninput="modeParameterChange(this.value,'${mode}','${param}',{id:'${randId}',type:'${type}'})" style="height: 100%;"></div>
	        </gtris-listCell>
	`
}

function modeButtons() {
	var f = []

	for (var e in modeParameters.texts)
		f.push(e),
		a = docId('modes-station')
	a.innerHTML = ''
	for (let u = 0; u < f.length; u++) {
		a.innerHTML += `
    <gtris-listCell>
    <gtris-button onclick="modeParamSwitch(${u},'m_${f[u]}')">${gtris_transText(`m_${f[u]}`)}</gtris-button>
    </gtris-listCell>
                `
	}
	switchMenu(10, true, 'h_playmodes')
	RESIZE()
}

function copyn(ai) {
	/* Get the text field */
	var copyText = document.getElementById(ai);
	var ct = copyText.innerHTML.toString()

	navigator.clipboard.writeText(ct);

	/* Alert the copied text */
	alert("Copied the text: " + ct);
}
