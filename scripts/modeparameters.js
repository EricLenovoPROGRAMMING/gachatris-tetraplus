var modeParameters = {
  texts: {
    zen:{},
    linerun: {
      LINE: range(20, 1020, 20),
      TYPE: [gtris_transText('m_linerunQueueType_0'), gtris_transText('m_linerunQueueType_1'), gtris_transText('m_linerunQueueType_2')]
    },
    scoreatk: {
      TIMER: range(60*120, 3610*120, 10*120)
    },
    fourwide: {
      TIMER: range(60 * 120, 3610 * 120, 10 * 120)
    },
    tsd:{}
  },
  
}

function modeParameterChange(varia, mode, varObj, varObjText) {
  var value = varia
  var val = bool => bool ? value : ~~(value)
  var t = modeParameters.texts[mode][varObj]
  selectedSettings.Modes[mode][varObj] = val(false)
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
  try {
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
                <gtris_normaltext style="width: auto; height: 100%;">${gtris_transText('m_scoreatkTimer')}&nbsp</gtris_normaltext>
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
    }
    switchMenu(11, true, name)
    RESIZE()
  } catch (e) {
    alert(e)
  }
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
