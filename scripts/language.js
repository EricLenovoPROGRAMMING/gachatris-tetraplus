function gtris_transText(name, input) {
  var langSetting = selectedSettings.Other.Language
  var _input = typeof input !== 'object' ? [input].toString() : input
  return {
    en: {
      splash1: 'EricLenovo - ELSQPPH presents...',
      splash2: 'Development started on May 5, 2022',
      splash3: `Gachatris Tetraplus, v${_input}`,

      title: 'Gachatris Tetraplus Alpha',

      play: 'Play',
      startGame: 'Start',
      settings: 'Settings',
      controls: 'Controls',

      h_settings: 'Settings',
      h_controls: 'Controls',
      h_playmodes: 'Play a Game Mode',

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
      texttime: 'Time',
      pieces: `PIECES, ${_input}/sec`,
      lines: 'LINES',

      line1: 'Single',
      line2: 'Double',
      line3: 'Triple',
      line4: 'Gachatris',
      line5: 'Gachatris Plus',

      combo: `${_input} ren`,

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
      ss_maxren: `Max Combo: ${_input}`,
      ss_tsd: `T-Spin Doubles: ${_input}`,
      ss_pc: `Perfect Clears: ${_input}`,
      ss_score: `Score: ${_input}`,

      rp_center: "Replay Center",
      rp_centerDesc: "Replay Center is where you can load replay data codes by pasting a replay data code or uploading your saved replay data files to the Game.",
      rp_openFileReplay: "Open .GTTP-JSON",
      rp_saveFileReplay: "Save as .GTTP-JSON",
      rp_tryReplay: "Watch",
      rp_replayFailedInputError: `Failed to parse a replay code.<br><br>Reason: ${_input}`,
      rp_enterCodePlease: "please enter your Replay Code!",
      rp_modeError:`missing mode parameter ${_input}`,
      rp_modeParameterError:`missing mode sub-parameter${_input[0] == 1 ? "" : "s"}:<br><br>${_input[1]}`,

      rp_replayFailedNoInpErr: `No input syntax errors have been found in your replay data but the data itself cannot be parsed because some parameters might be missing or wrong.`,
      rp_uploadFailedFileExt:`The name of a file you have uploaded (${_input}) does not end with ".gttp-json". You need to check first the end of a file's name before uploading it to the Game.`,
      rp_uploadFailedJSON: `JSON Parse error, cannot parse an uploaded replay file because the file itself may have been corrupted or has some parameters worng or missing.<br><br>Reason: ${_input}`,
      rp_uploadFailed: "Uploaded replay file failed to be parsed",
      rp_replayFailed: "Replay data code failed to be parsed",

      m_zen: 'Zen',
      m_zenDesc: 'Zen mode is the very basic mode where you can practice the way you play and excel your strategies.',

      m_linerun: 'Line Run',
      m_linerunDesc: 'Line Run is a mode where you must clear the number of lines as fast as you can. You can set how many lines you may clear, and the active type of bag generation (that contains a list of Gachaminoes.) The official parameters for this mode are 40 lines and the normal bag.',
      m_linerunLine: 'Lines to Clear:',
      m_linerunQueueType: 'Bag Generation Type:',
      m_linerunQueueType_0: `Normal (7-Gachamino bag)`,
      m_linerunQueueType_1: `Heaven (Long Bar-only bag)`,
      m_linerunQueueType_2: `L_ne Run (Bag excluding Long Bar)`,

      l_success: 'Success!',

      m_scoreatk: 'Score Attack',
      m_scoreatkDesc: 'Score Attack is basically the Ultra mode where you must get your highest possible score within the given time. You can set the timer to however long you can play this mode. When the timer runs out, you win, and you will see your final score. The official timer duration for this mode is 2 minutes.',
      m_scoreatkTimer: 'Timer:',

      u_finish: 'Finish!',
      u_finishCTD: 'Time is<br>up!',

      m_fourwide: 'C4W Infinity',
      m_fourwideDesc: 'C4W Infinity is a mode where you must get your highest possible combo within the given time by clearing lines consecutively in an infinite Center-4-Wide board. You can set the timer to however long you can play this mode. When the timer runs out, you win, and you will see your maximum combo. The official timer duration for this mode is 2 minutes.',
      m_fourwideTimer: 'Timer:',

      c4w_combo: 'Max Combo',

      c4w_finish: 'Finish!',
      c4w_finishCTD: 'Time is<br>up!',

      m_tsd: 'TSD Only Challenge',
      m_tsdDesc: 'If you are so used to doing T-Spin Doubles, try this challenge! This mode allows you to clear ONLY T-Spin Doubles and Mini T-Spin Doubles. However, if you either clear not a T-Spin Double or top out, you fail, but as long as you have achieved atleast 20 T-Spin Doubles, you win.',

      tsd_goal: 'T-Spin Doubles',
      tsd_reached: `${_input}TSD!!!`,
      tsd_reached_result: `You have achieved ${_input} TSDs!`,
      tsd_failed: 'Not TSD, Failed'
    },
    fil: {
      splash1: 'Hatid ni EricLenovo - ELSQPPH...',
      splash2: 'Nagsimulang buuin noong Mayo 5, 2022',
      splash3: `Gachatris Tetraplus, v${_input}`,

      title: 'Gachatris Tetraplus Alpha',

      play: 'Maglaro',
      startGame: 'Magsimula ng Laro',
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
      h_playmodes: 'Maglaro ng isang mode',


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
      texttime: 'Oras',
      pieces: `MGA PIRASO, ${_input}/seg`,
      lines: 'MGA LINYA',

      line1: 'Single',
      line2: 'Double',
      line3: 'Triple',
      line4: 'Gachatris',
      line5: 'Gachatris Plus',

      combo: `${_input} REN`,

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
      ss_maxren: `Pinakamataas na Combo: ${_input}`,
      ss_tsd: `Mga T-Spin Double: ${_input}`,
      ss_pc: `Mga Perpektong Kalinisan: ${_input}`,
      ss_score: `Puntos: ${_input}`,
      
      rp_center: "Replay Center",
      rp_centerDesc: "Ang Replay Center ay kung saan ka makakapag-load ng mga replay data code sa pamamagitan ng pag-paste ng replay data code o pag-upload ng iyong mga naka-save na replay data file sa Laro.",
      rp_openFileReplay: "Bumukas ng .GTTP-JSON",
      rp_saveFileReplay: "I-save bilang .GTTP-JSON",
      rp_tryReplay: "Manood",
      rp_replayFailedInputError: `Nabigong mag-parse ng replay code.<br><br>Dahilan: ${_input}`,
      rp_enterCodePlease: "pakilagay ang iyong Replay Code!",
      rp_modeError:`nawawalang parameter ng mode ${_input}`,
      rp_modeParameterError:`nawawalang ${_input[0] == 1 ? "isang" : "mga"} sub-parameter ng mode:<br><br>${_input[1]}`,

      rp_replayFailedNoInpErr: `Walang nakitang mga error sa input syntax sa iyong replay data ngunit ang data mismo ay hindi ma-parse dahil maaaring nawawala o mali ang ilang parameter.`,
      rp_uploadFailedFileExt:`Ang pangalan ng isang file na iyong na-upload (${_input}) ay hindi nagtatapos sa ".gttp-json". Kailangan mong suriin muna ang dulo ng pangalan ng file bago ito i-upload sa Laro.`,
      rp_uploadFailedJSON: `JSON Parse error, hindi ma-parse ang isang na-upload na replay file dahil ang file mismo ay maaaring nasira o may ilang parameter na sira o nawawala.<br><br>Dahilan: ${_input}`,
      rp_uploadFailed: "Nabigong ma-parse ang na-upload na replay file",
      rp_replayFailed: "Nabigong ma-parse ang replay data code",


      m_zen: 'Zen',
      m_zenDesc: 'Ang Zen mode ay ang pinakapangunahing mode kung saan maaari kang magsanay sa paraan ng iyong paglalaro at maging mahusay sa iyong mga diskarte.',

      m_linerun: 'Linyang Pabilisan',
      m_linerunDesc: 'Ang Linyang Pabilisan ay isang mode kung saan dapat mong i-clear ang bilang ng mga linya nang mas mabilis hangga\'t maaari. Maaari mong itakda kung gaano karaming mga linya ang maaari mong i-clear, at ang aktibong uri ng paggawa ng bag (na naglalaman ng isang listahan ng mga Gachamino.) Ang mga opisyal na parameter para sa mode na ito ay 40 linya at normal na bag.',
      m_linerunLine: 'Mga Linya para I-clear:',
      m_linerunQueueType: 'Uri ng Pagbuo ng Bag:',
      m_linerunQueueType_0: `Normal (Bag na may 7 mga Gachamino)`,
      m_linerunQueueType_1: `Heaven (Bag na "long bar" lang ang laman)`,
      m_linerunQueueType_2: `L_nyang Pab_l_san (Bag na nawawalng "long bar")`,

      l_success: 'Tagumpay!',

      m_scoreatk: 'Pataasan ng Puntos',
      m_scoreatkDesc: 'Ang Pataasan ng Puntos ay karaniwang ang Ultra mode kung saan dapat mong makuha ang iyong pinakamataas na posibleng puntos sa loob ng ibinigay na oras. Maaari mong itakda ang orasan sa gaano man katagal maaari mong laruin ang mode na ito. Kapag naubos ang orasan, panalo ka, at makikita mo ang iyong huling puntos. Ang opisyal na tagal ng orasan para sa mode na ito ay 2 minuto.',
      m_scoreatkTimer: 'Oras:',

      u_finish: 'Tapos na!',
      u_finishCTD: 'Ubos na<br>ang oras!',

      m_fourwide: 'Walang-katapusang C4W',
      m_fourwideDesc: 'Ang walang-katapusang C4W ay isang mode kung saan dapat mong makuha ang iyong pinakamataas na posibleng combo (REN) sa loob ng ibinigay na oras sa pamamagitan ng pag-clear ng mga linya nang sunud-sunod sa isang board na may walang-katapusang Center-4-Wide. Maaari mong itakda ang orasan sa gaano man katagal maaari mong laruin ang mode na ito. Kapag naubos ang timer, panalo ka, at makikita mo ang iyong pinakamataas na combo. Ang opisyal na tagal ng orasan para sa mode na ito ay 2 minuto.',
      m_fourwideTimer: 'Oras:',

      c4w_combo: 'Pinakamataas na Combo',

      c4w_finish: 'Tapos na!',
      c4w_finishCTD: 'Ubos na<br>ang oras!',

      m_tsd: 'Hamon na TSD Lang',
      m_tsdDesc: 'Kung sanay ka na sa mga T-Spin Double, subukan ang hamon na ito! Binibigyang-daan ka ng mode na ito na i-clear LAMANG ang mga T-Spin Double at mga Mini T-Spin Double. Gayunpaman, kung hindi ka nag-clear ng isang T-Spin Double o nag-top out, mabibigo ka, ngunit hangga\'t nakamit mo ang hindi bababa sa 20 mga T-Spin Double, panalo ka.',

      tsd_goal: 'Mga T-Spin<br>Double',
      tsd_reached: `${_input}TSD!!!`,
      tsd_reached_result: `Nakagawa ka ng ${_input} ${['4','6','9'].indexOf(_input.toString().split('')[_input.toString().length - 1]) !== -1 ? 'na':''} mga TSD!`,
      tsd_failed: 'Hindi TSD, Nabigo'
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
  guiClass('replayCenterMenu','rp_center')
  for (var e of [docId('perfectClear1'), docId('perfectClear2')])
    e.innerHTML = gtris_transText('pc')
}
