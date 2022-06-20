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
			level: `Lv. ${_input}`,
			machlevel: `M${_input}`,

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

			nameChangeWindow: 'Change Name',
			h_namechange: 'Change Your Name',
			nameChangeDesc: "Your name serves as your nameplate below your Gachatris body. The maximum length of letters of your name is 20 characters.",

			rp_center: "Replay Center",
			rp_centerDesc: "Replay Center is where you can load replay data codes by pasting a replay data code or uploading your saved replay data files to the Game.",
			rp_openFileReplay: "Open .GTTP-JSON",
			rp_saveFileReplay: "Save as .GTTP-JSON",
			rp_tryReplay: "Watch",
			rp_replayFailedInputError: `Failed to parse a replay code.<br><br>Reason: ${_input}`,
			rp_enterCodePlease: "please enter your Replay Code!",
			rp_modeError: `missing mode parameter ${_input}`,
			rp_modeParameterError: `missing mode sub-parameter${_input[0] == 1 ? "" : "s"}:<br><br>${_input[1]}`,
			rp_nameError: "the length of the Player Name must not exceed 20 characters. Please shorten the value of such paraneter!",


			rp_replayFailedNoInpErr: `No input syntax errors have been found in your replay data but the data itself cannot be parsed because some parameters might be missing or wrong.`,
			rp_uploadFailedFileExt: `The name of a file you have uploaded (<eee style="color:#f0a">${_input}</eee>) does not end with ".gttp-json". You need to check first the end of a file's name before uploading it to the Game.`,
			rp_uploadFailedJSON: `JSON Parse error, cannot parse an uploaded replay file because the file itself may have been corrupted or has some parameters worng or missing.<br><br>Reason: ${_input}`,
			rp_uploadFailed: "Uploaded replay file failed to be parsed",
			rp_replayFailed: "Replay data code failed to be parsed",

			m_zen: 'Zen',
			m_zenDesc: 'Zen mode is the very basic mode where you can practice the way you play and excel your strategies.',

			m_linerun: 'Line Run',
			m_linerunDesc: 'Line Run is a mode where you must clear the number of lines as fast as you can. You can set how many lines you may clear, and the active type of bag generation (that contains a list of Gachaminoes.) The official parameters for this mode are 40 lines and the normal bag.',
			m_linerunLine: 'Lines to Clear',
			m_linerunQueueType: 'Bag Generation Type',
			m_linerunQueueType_0: `Normal (7-Gachamino bag)`,
			m_linerunQueueType_1: `Heaven (Long Bar-only bag)`,
			m_linerunQueueType_2: `L_ne Run (Bag excluding Long Bar)`,

			l_success: 'Success!',

			m_scoreatk: 'Score Attack',
			m_scoreatkDesc: 'Score Attack is basically the Ultra mode where you must get your highest possible score within the given time. You can set the timer to however long you can play this mode. When the timer runs out, you win, and you will see your final score. The official timer duration for this mode is 2 minutes.',
			m_scoreatkTimer: 'Timer',

			u_finish: 'Finish!',
			u_finishCTD: 'Time is<br>up!',

			m_fourwide: 'C4W Infinity',
			m_fourwideDesc: 'C4W Infinity is a mode where you must get your highest possible combo within the given time by clearing lines consecutively in an infinite Center-4-Wide board. You can set the timer to however long you can play this mode. When the timer runs out, you win, and you will see your maximum combo. The official timer duration for this mode is 2 minutes.',
			m_fourwideTimer: 'Timer',

			c4w_combo: 'Max Combo',

			c4w_finish: 'Finish!',
			c4w_finishCTD: 'Time is<br>up!',

			m_tsd: 'TSD Only Challenge',
			m_tsdDesc: 'If you are so used to doing T-Spin Doubles, try this challenge! This mode allows you to clear ONLY T-Spin Doubles and Mini T-Spin Doubles. However, if you either clear not a T-Spin Double or top out, you fail, but as long as you have achieved atleast 20 T-Spin Doubles, you win.',

			tsd_goal: 'T-Spin Doubles',
			tsd_reached: `${_input}TSD!!!`,
			tsd_reached_result: `You have achieved ${_input} TSDs!`,
			tsd_failed: 'Not TSD, Failed',

			m_dsfrenzy: "Frenzy Enhancement",
			m_dsfrenzyDesc: "Have you seen a game mode like this with its colorful appearance on <gtris-tYellow>Gachatris JavaScriptus</gtris-tYellow>? This mode uses <gtris-tYellow>Gachatris JavaScriptus</gtris-tYellow>' <gtris-tRainbow>Frenzy</gtris-tRainbow> state system with more improvements, additions, and changes for this Game. However, if you reach the maximum number of failures (when you fail to clear a map), you lose. The official parameters for this mode are 2 minutes, initial phase 1, and the maximum of 5 failures.",
			m_dsfrenzyTimer: "Frenzy Time",
			m_dsfrenzyPhase: "Initial Map Phase",
			m_dsfrenzyFails: "Max. Fails",

			dsfr_timer: "FRENZY TIME",
			dsfr_phase: `${_input == "MAX" ? "MAX PHASE" : `PHASE ${_input}`}`,
			dsfr_frenzy: "Frenzy Attack",
			dsfr_boardssuccess: `BOARDS: ${_input[0]}<br>SUCCESSES: ${_input[1]}`,
			dsfr_fails: "FAILS",
			dsfr_timeup: "Finish!",
			dsfr_failed: "Failed",

			m_survival: "Survival",
			m_survivalDesc: "Survival is a mode where you must SURVIVE a series of incoming garbage lines by neutralizing them depending on the power of line clears. The longer you survive is the better. The official parameters for this mode are garbage automation level 3, no garbage reception limit. and a 5-second automating initialization delay.",
			m_survivalGarbAutoLevel: "Garbage Automation Level",
			m_survivalGarbageReceptionLimit: "Garbage Reception Limit",
			m_survivalInitGarbDuration: "Initial Garbage Automation Duration",
			m_survivalNoLimit: "Normal (No Limit)",

			survival_apm: `LINES SENT, ${_input}/min`,

			m_levelrun: "Level Course",
			m_levelrunDesc: "This course gives you a task to clear the number of lines. This is like the <gtris-tYellow>Line Run</gtris-tYellow> mode but with the leveling system. You can make this game endless by changing the parameter of maximum lines. The higher the level is the faster and haster the piece gravity. The official parameters for this mode are 150 lines, level 1, 10 lines per level, no delay, and the limit of level 15.",
			m_levelrunLevel: "Level",
			m_levelrunLines: "Lines to Clear",
			m_levelrunLineReq: "Lines per Level",
			m_levelrunAreType: "Appearance/Spawn Delay (ARE)",
			m_levelrunAreType0: "No Delay",
			m_levelrunAreType1: "Short",
			m_levelrunAreType2: "Long",
			m_levelrunLevelCap: "Maximum Level Cap",
			m_levelrunEndless: "Endless",
			m_levelrunInfinity: "Infinity",
			
			levelrun_lines: `${_input} LINES`,
			levelrun_lineReq: `LEVEL LINES`,
			levelrun_success: "Success!",
			
 			m_area20: "Area 20",
				m_area20Desc: "This mode gives you a task to clear the number of lines. This is like the <gtris-tYellow>Line Run</gtris-tYellow> mode but with the leveling system as well as the fastest piece gravity, the 20G, which the piece right away instantly lands onto the blocks. You can make this game endless by changing the parameter of maximum lines. The higher the level is the shorter the piece delay as well as the lock delay. The official parameters for this mode are 300 lines, level 1, 10 lines per level, and the limit of level 30.",
				m_area20Level: "Level",
				m_area20Lines: "Lines to Clear",
				m_area20LineReq: "Lines per Level",
				m_area20LevelCap: "Maximum Level Cap",
				m_area20Endless: "Endless",
				m_area20Infinity: "Infinity",
			
				area20_lines: `${_input} LINES`,
				area20_lineReq: `LEVEL LINES`,
				area20_success: "Success!",
				
				m_amogus: "Amogus",
				m_amogusDesc1: "This mode has the ability to detect SUS in every 7 pieces placed. After every 7 pieces, the board, NEXT queue and HOLD placeholder are reset, and if a SUS opener exists in the board, it adds one to the SUS counter. This was inspired by Innersloth's <gtris-tYellow>Among Us</gtris-tYellow> game, from an Among Us meme, the Amogus, and by Tetris players who made the SUS opener. The more SUS made within the given time is the better. You need to build this SUS map almost like this below in a way as long as it is valid enough to be counted as a SUS to the SUS counter.",
    m_amogusDesc2: "If you block/lock out, obviously, you lose. The official timer duration in this mode is 2 minutes.",
    m_amogusTimer: "Sus Timer",
    
    amogus_suscounter: "SUS COUNTER",
    amogus_sustimer: "SUS TIMER",

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

			nameChangeWindow: 'Palitan ang Pangalan',
			h_namechange: 'Palitan ang Iyong Pangalan',
			nameChangeDesc: "Nagsisilbi ang pangalan mo bilang iyong nameplate na nasa baba ng iyong katawan ng Gachatris. Ang haba ng pangalan mo ay dapat hindi tataas sa 20.",

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
			level: `Ant. ${_input}`,
			machlevel: `M${_input}`,

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
			rp_modeError: `nawawalang parameter ng mode ${_input}`,
			rp_modeParameterError: `nawawala ang ${_input[0] == 1 ? "isang" : "mga sumusunod na"} sub-parameter ng mode:<br><br>${_input[1]}`,
			rp_nameError: "Hindi maaaring lumampas sa 20 mga karakter ang haba ng Pangalan ng Manlalaro. Nabigo ang pag-parse ng replay data.",

			rp_replayFailedNoInpErr: `Walang nakitang mga error sa input syntax sa iyong replay data ngunit ang data mismo ay hindi ma-parse dahil maaaring nawawala o mali ang ilang parameter.`,
			rp_uploadFailedFileExt: `Ang pangalan ng isang file na iyong na-upload (${_input}) ay hindi nagtatapos sa ".gttp-json". Kailangan mong suriin muna ang dulo ng pangalan ng file bago ito i-upload sa Laro.`,
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

			c4w_combo: 'Pinakamataas<br>na Combo',

			c4w_finish: 'Tapos na!',
			c4w_finishCTD: 'Ubos na<br>ang oras!',

			m_tsd: 'Hamon na TSD Lang',
			m_tsdDesc: 'Kung sanay ka na sa mga T-Spin Double, subukan ang hamon na ito! Binibigyang-daan ka ng mode na ito na i-clear LAMANG ang mga T-Spin Double at mga Mini T-Spin Double. Gayunpaman, kung hindi ka nag-clear ng isang T-Spin Double o nag-top out, mabibigo ka, ngunit hangga\'t nakamit mo ang hindi bababa sa 20 mga T-Spin Double, panalo ka.',

			tsd_goal: 'Mga T-Spin Double',
			tsd_reached: `${_input}TSD!!!`,
			tsd_reached_result: `Nakagawa ka ng ${_input} ${['4','6','9'].indexOf(_input.toString().split('')[_input.toString().length - 1]) !== -1 ? 'na':''} mga TSD!`,
			tsd_failed: 'Hindi TSD, Nabigo',

			m_dsfrenzy: "Pangmalakas na Frenzy",
			m_dsfrenzyDesc: "Nakakita ka na ba ng game mode na tulad nito na may makulay na hitsura sa <gtris-tYellow>Gachatris JavaScriptus</gtris-tYellow>? Gumagamit ang mode na ito ng sistema ng estado ng <gtris-tRainbow>Frenzy</gtris-tRainbow> ng <gtris-tYellow>Gachatris JavaScriptus</gtris-tYellow> na may higit pang mga pagpapabuti, pagdaragdag, at pagbabago para sa Larong ito. Gayunpaman, kung naabot mo ang maximum na bilang ng mga pagkabigo (kapag nabigo kang i-clear ang isang mapa), matatalo ka. Ang mga opisyal na parameter para sa mode na ito ay 2 minuto, pasimulang unang yugto, at ang maximum na 5 pagkabigo.",
			m_dsfrenzyTimer: "Oras ng Frenzy",
			m_dsfrenzyPhase: "Pasimulang Yugto ng Mapa",
			m_dsfrenzyFails: "Max. na Pagkabigo",

			dsfr_timer: "ORAS NG FRENZY",
			dsfr_phase: `${_input == "MAX" ? "MAX NA PHASE" : `${_input == 1 ? 'UNANG ' : _input == 0 ? 'IKA-0 NA' : `IKA-${_input}`} ${['4','6','9'].indexOf(_input) !== -1 ? 'NA ' : ''} PHASE`}`,
			dsfr_frenzy: `Atakeng Frenzy`,
			dsfr_boardssuccess: `MGA BOARD: ${_input[0]}<br>MGA NAPAGTAGUMPAYAN: ${_input[1]}`,
			dsfr_fails: "MGA KABIGUAN",
			dsfr_timeup: "Tapos!",
			dsfr_failed: "Nabigo",

			m_survival: "Survival",
			m_survivalDesc: "Ang Survival ay isang mode kung saan kailangan kang mag-SURVIVE ng isang serye ng mga papasok na linya ng basura sa pamamagitan ng pag-neutralize sa mga ito depende sa kapangyarihan ng mga nilinis na linya. Kung mas mahaba ang buhay mo ay mas mabuti. Ang mga opisyal na parameter para sa mode na ito ay ang antas 3 ng automation ng basura, walang limitasyon sa pagtanggap ng basura. at isang 5 segundong pagkaantala sa initialization ng pag-automate.",
			m_survivalGarbAutoLevel: "Antas ng Automation ng Basura",
			m_survivalGarbageReceptionLimit: "Limitasyon sa Pagtanggap ng Basura",
			m_survivalInitGarbDuration: "Paunang Tagal ng Automation ng Basura",
			m_survivalNoLimit: "Normal (Walang limitasyon)",

			survival_apm: `MGA LINYANG NA-SEND, ${_input}/min`,
			
			m_levelrun: "Kursong Antasan",
				m_levelrunDesc:"Ang kursong ito ay nagbibigay sa iyo ng gawain upang i-clear ang bilang ng mga linya. Ito ay tulad ng mode na <gtris-tYellow>Linyang Pabilisan</gtris-tYellow> ngunit kasama ang leveling system. Magagawa mong walang katapusan ang larong ito sa pamamagitan ng pagbabago ng parameter ng maximum mga linya. Ang mas mataas na antas ay mas mabilis at nagpapabilis ng gravity ng piraso. Ang mga opisyal na parameter para sa mode na ito ay 150 linya, antas 1, 10 linya bawat antas, walang pagkaantala, at ang limitasyon ng antas 15.",				m_levelrunLevel: "Level",
				m_levelrunLines: "Mga Linya para I-clear",
				m_levelrunLineReq: "Mga linya sa bawat lebel",
				m_levelrunAreType: "Pagkaantala mg mga Piraso(ARE)",
				m_levelrunAreType0: "Walang Pagkaantala",
				m_levelrunAreType1: "Maikli",
				m_levelrunAreType2: "Mataad",
				m_levelrunLevelCap: "Limitasyon ng Antas",
				m_levelrunEndless: "Wakang Katapusan",
				m_levelrunInfinity: "Walang Limitasyon",
			
				levelrun_lines: `${_input} ${['4','6','9'].indexOf(_input.toString().split('')[_input.toString().length - 1]) !== -1 ? 'NA':''} ${_input >= 2 ? "MGA" : ""} LINYA`,
				levelrun_lineReq: `${_input} ${['4','6','9'].indexOf(_input.toString().split('')[_input.toString().length - 1]) !== -1 ? 'NA':''} ${_input >= 2 ? "MGA" : ""} LINYA NG LEBEL`,
				levelrun_success: "Tagumpay!!",
			
				m_area20: "Area 20",
				m_area20Desc: "Ang mode na ito ay nagbibigay sa iyo ng isang gawain upang i-clear ang bilang ng mga linya. Ito ay tulad ng mode na <gtris-tYellow>Linyang Pabilisan</gtris-tYellow> ngunit may leveling system pati na rin ang pinakamabilis na gravity ng piraso, ang 20G, na agad na dumapo ang piraso sa mga bloke. Magagawa mong walang katapusan ang larong ito sa pamamagitan ng pagpapalit ng parameter ng maximum na mga linya. Kung mas mataas ang antas ay mas maikli ang pagkaantala ng piraso gayundin ang pagkaantala ng lock. Ang mga opisyal na parameter para sa mode na ito ay 300 linya, antas 1, 10 linya bawat antas, at ang limitasyon ng antas 30.",
				m_area20Level: "Antas",
				m_area20Lines: "Mga Linya para I-clear",
				m_area20LineReq: "Mga linya sa bawat Antas",
				m_area20LevelCap: "Kapasidad ng antas",
				m_area20Endless: "Walang Katapusan",
				m_area20Infinity: "Walang Limitasyon",
			
				area20_lines: `${_input} ${['4','6','9'].indexOf(_input.toString().split('')[_input.toString().length - 1]) !== -1 ? 'NA':''} ${_input >= 2 ? "MGA" : ""} LINYA`,
				area20_lineReq: `${_input} ${['4','6','9'].indexOf(_input.toString().split('')[_input.toString().length - 1]) !== -1 ? 'NA':''} ${_input >= 2 ? "MGA" : ""} LINYA NG LEBEL`,
				area20_success: "Tagumpay!!",
			
			 m_amogus: "Amogus",
			 	m_amogusDesc1: "Ang mode na ito ay may kakayahang makita ang SUS sa bawat 7 pirasong inilagay. Pagkatapos ng bawat 7 piraso, nire-reset ang board, ang pilahan ng mga SUMUSUNOD na piraso, at lalagyan ng isang ITINABING HAWAK na piraso, at kung mayroong SUS opener sa board, nagdaragdag ito ng isa sa bilangan ng mga SUS. Ito ay inspirasyon ng larong <gtris-tYellow>Among Us</gtris-tYellow> ng Innersloth, mula sa isang meme ng Among Us, ang Amogus, at ng mga manlalarong Tetris na gumawa ng SUS opener. Ang mas maraming SUS na ginawa sa loob ng ibinigay na oras ay mas mabuti. Kailangan mong buuin ang mapa ng SUS na ito na halos ganito sa ibaba sa isang paraan hangga't ito ay may sapat na bisa upang mabilang bilang isang SUS sa bilangan ng mga SUS.",   
			 	m_amogusDesc2: "Kung i-block/lock out mo, halatadong talo ka. Ang opisyal na tagal ng timer sa mode na ito ay 2 minuto.",
			 	m_amogusTimer: "Orasan ng Sus",
			 
			 	amogus_suscounter: "BILANG NG MGA SUS",
			 	amogus_sustimer: "ORASAN NG SUS",
			
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
	guiButton('nameplate', 'nameChangeWindow')
	guiButton('replay', 'replay')
	guiButton('forceend', 'forceend')
	guiClass('retry', 'retry')
	guiClass('mainmenu', 'backmain')
	guiText('characterUse', 'characteruse')
	guiText('keysSelecting', 'setkey')
	guiClass('replayCenterMenu', 'rp_center')
	for (var e of [docId('perfectClear1'), docId('perfectClear2')])
		e.innerHTML = gtris_transText('pc')
}
