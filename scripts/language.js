function gtris_transText(name, input) {
  var langSetting = selectedSettings.Other.Language
  var _input = typeof input !== 'object' ? [input].toString() : input
  return {
    en: {
      splash1: 'EricLenovo - ELSQPPH presents...',
      splash2: 'Developed on May 5, 2022',
      splash3: `Gachatris Tetraplus, v${_input}`,

      title: 'Gachatris Tetraplus Alpha',

      play: 'Play',
      settings: 'Settings',
      controls: 'Controls',

      h_settings: 'Settings',
      h_controls: 'Controls',

      audvol: 'Audio/Volume',
      tuning: 'Handling/Tuning',
      character: 'Characters',
      miscellaneous: 'Miscellaneous',

      h_audvol: 'Audio and Volume',
      h_tuning: 'Handling and Tuning',
      h_character: 'Select a Character for the Game',
      h_miscellaneous: 'Miscellaneous Settings',

      h_controls: 'Set Control Mapping',
      h_setkey: 'Press Any Key',

      characteruse: 'You are now using:',
      characterdetail: `
      Gender: ${_input[0]}<br>
      Author: ${_input[1]}<br>
      Date Featured: ${_input[2]} (v${_input[3]} Release)<br>
      <br>
      "${_input[4]}"
      `,

      setkey: 'PRESS ANY KEY TO CHANGE THE KEY EVENT FOR THE SELECTED BINDING.',

      ready3: 'READY <br> 3',
      ready2: 'READY <br> 2',
      ready1: 'READY <br> 1',
      ready0: 'START',

      hold: 'HOLD',
      inithold: 'INITIAL',

      next: 'NEXT',

      main_timer: `${_input[0]}:${_input[1]}`,
      pieces: `PIECES, ${_input}/sec`,
      lines: 'LINES',

      line1: 'Single',
      line2: 'Double',
      line3: 'Triple',
      line4: 'Gachatris',
      line5: 'Gachatris Plus',

      spin: 'T-Spin',
      mini: 'T-Spin Mini',
      pc: 'PERFECT<br>CLEAR',

      blockout: 'Blocked Out!',
      lockout: 'Lock Out!',
      forceended: 'Forcibly Ended!',
      replayended: 'Replay Ended',

      retry: 'Start Over',
      replay: 'View Replay',
      backmain: 'Main Menu',
      resume: 'Resume',
      forceend: 'Force End',

      statistics: 'Statistics:',
      ss_time: `Time: ${_input[0]} (${_input[1]} frames)`,
      ss_pieces: `Pieces: ${_input[0]}, ${_input[1]}/sec`,
      ss_gtris: `Gachatrises: ${_input[0]}, ${_input[1]}%`,
      ss_lines: `Lines: ${_input[0]}, ${_input[1]}/piece`,
      
    },
    fil: {
      splash1: 'Hatid ni EricLenovo - ELSQPPH...',
      splash2: 'Nagsimulang buuin noong Mayo 5, 2022',
      splash3: `Gachatris Tetraplus, v${_input}`,

      title: 'Gachatris Tetraplus Alpha',

      play: 'Maglaro',
      settings: 'Mga setting',
      controls: 'Mga kontrol',

      h_settings: 'Mga setting',
      h_controls: 'Mga kontrol',

      audvol: 'Tunog/Bolyum',
      tuning: 'Kapabilidad/Pagtu-tune',
      character: 'Mga tauhan',
      miscellaneous: 'Miscellaneous',

      h_audvol: 'Tunog at Bolyum',
      h_tuning: 'Kapabilidad at Pagtu-tune',
      h_character: 'Pumili ng isang Karakter para sa Laro',
      h_miscellaneous: 'Sari-saring mga Setting',

      h_controls: 'Itakda ang Control Mapping',
      h_setkey: 'Pindutin ang Kahit Anong Key',

      characteruse: 'Ginagamit mo na ngayon si:',
      characterdetail: `
      Kasarian: ${_input[0]}<br>
      Awtor: ${_input[1]}<br>
      Petsa ng Pagkatampok: ${_input[2]} (v${_input[3]} Release)<br>
      <br>
      "${_input[4]}"
      `,
      setkey: 'PINDUTIN ANG ANUMANG KEY UPANG BAGUHIN ANG PAGKOKONTROL PARA SA NAPILING KONTROL.',

      ready3: 'MAGHANDA <br> 3',
      ready2: 'MAGHANDA <br> 2',
      ready1: 'MAGHANDA <br> 1',
      ready0: 'MAGSIMULA<br>NA!',

      hold: 'HAWAK',
      inithold: 'INISYAL',

      next: 'SUSUNOD',

      main_timer: `${_input[0]}:${_input[1]}`,
      pieces: `MGA PIRASO, ${_input}/seg
      `,
      lines: 'MGA LINYA',

      line1: 'Single',
      line2: 'Double',
      line3: 'Triple',
      line4: 'Gachatris',
      line5: 'Gachatris Plus',

      spin: 'T-Spin',
      mini: 'T-Spin Mini',
      pc: 'PERPEKTONG<br>KALINISAN',

      blockout: 'Na-block Out!',
      lockout: 'Na-lock Out!',
      forceended: 'Sapilitang Tinapos!',
      replayended: 'Natapos ang Replay',

      retry: 'Magsimulang Muli',
      replay: 'Tingnan ang Replay',
      backmain: 'Pangunahing Menu',
      resume: 'Ipagpatuloy',
      forceend: 'Sapilitang Tapusin',

      statistics: 'Mga Istatistiko:',
      ss_time: `Oras: ${_input[0]} (${_input[1]} mga frame)`,
      ss_pieces: `Mga piraso: ${_input[0]}, ${_input[1]}/seg`,
      ss_gtris: `Mga Gachatris: ${_input[0]}, ${_input[1]}%`,
      ss_lines: `Mga linya: ${_input[0]}, ${_input[1]}/piraso`,
      
    }
  } [{
    0: 'en',
    1: 'fil'
  } [langSetting]][name]
}

function guiButton(name, string) {
  $iH(`guiButton-${name}`, gtris_transText(string))
}

function guiText(name, string) {
  $iH(`guiText-${name}`, gtris_transText(string))
}

function guiClass(name, string) {
  for (let e in $CN(`guiClass-${name}`))
    $CN(`guiClass-${name}`, e).innerHTML = gtris_transText(string)
}

function localizeText() {
  guiButton('play', 'play')
  guiButton('settings', 'settings')
  guiButton('controls', 'controls')
  guiButton('handlingtuning', 'tuning')
  guiButton('audio', 'audvol')
  guiButton('selChar', 'character')
  guiButton('misc', 'miscellaneous')
  guiButton('replay', 'replay')
  guiButton('forceend', 'forceend')
  guiClass('retry', 'retry')
  guiClass('mainmenu', 'backmain')
  guiText('characterUse', 'characteruse')
  guiText('keysSelecting', 'setkey')
  for(var e of [docId('perfectClear1'), docId('perfectClear2')])
  e.innerHTML = gtris_transText('pc')
}
