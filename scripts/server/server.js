class BinaryWriter {
	constructor(bytes) {
		this.buffer = new ArrayBuffer(bytes);
		this.view = new DataView(this.buffer);
		this.offset = 0;
	}
	i8(value) {
		this.view.setInt8(this.offset, value);
		this.offset += 1;
	}
	i16(value) {
		this.view.setInt16(this.offset, value, true);
		this.offset += 2;
	}
	i32(value) {
		this.view.setInt32(this.offset, value, true);
		this.offset += 4;
	}
	u8(value) {
		this.view.setUint8(this.offset, value);
		this.offset += 1;
	}
	u16(value) {
		this.view.setUint16(this.offset, value, true);
		this.offset += 2;
	}
	u32(value) {
		this.view.setUint32(this.offset, value, true);
		this.offset += 4;
	}
	f32(value) {
		this.view.setFloat32(this.offset, value, true);
		this.offset += 4;
	}
	f64(value) {
		this.view.setFloat64(this.offset, value, true);
		this.offset += 8;
	}
	string(value, lentype = 8) {
		
		let enc = new TextEncoder().encode(value);
		this[`u${lentype}`](enc.byteLength);
		for (let h = 0; h < enc.byteLength; h++) {
			//console.log(enc[h])
			this.u8(enc[h]);
		}
	}
	
}

class BinaryReader {
	constructor(buffer) {
		this.buffer = buffer;
		this.view = new DataView(buffer);
		this.offset = 0;
	}
	i8() {
		let a = this.view.getInt8(this.offset);
		this.offset += 1;
		return a
	}
	i16() {
		let a = this.view.getInt16(this.offset, true);
		this.offset += 2;
		return a
	}
	i32() {
		let a = this.view.getInt32(this.offset, true);
		this.offset += 4;
		return a
	}
	u8() {
		let a = this.view.getUint8(this.offset);
		this.offset += 1;
		return a
	}
	u16() {
		let a = this.view.getUint16(this.offset, true);
		this.offset += 2;
		return a
	}
	u32() {
		let a = this.view.getUint32(this.offset, true);
		this.offset += 4;
		return a
	}
	f32() {
		let a = this.view.getFloat32(this.offset, true);
		this.offset += 4;
		return a
	}
	f64() {
		let a = this.view.getFloat64(this.offset, true);
		this.offset += 8;
		return a
	}
	string(lentype = 8) {
		let l = this[`u${lentype}`]();
		
		let u = new Uint8Array(this.buffer).subarray(this.offset, l + this.offset);
		let a = new TextDecoder().decode(u);
		this.offset += l;
		return a;
	}
}


const server = new class {
	#url = "wss://curly-paraleet-9gqqv7xgx442px54.github.dev:2400";
	#socket = {};
	userID = null;
	roomID = null;
	isOnline = false;
	isReady = false;
	isPrepared = false;
	#channels = {
		SERVER_CONNECT: 0,
		SERVER_LOGIN: 1,
		SERVER_CLOSE: 2,
		ROOM_JOIN: 3,
		ROOM_USER_ENTER: 4,
		ROOM_USER_LEAVE: 5,
		ROOM_LEAVE: 6,
		ROOM_USER_READY: 7,
		ROOM_START: 8,
		MATCH_START: 9,
		MATCH_READY: 10,
		MATCH_PREPARE: 18,
		MATCH_WIN: 11,
		MATCH_LOSE: 12,
		MATCH_END: 13,
		MATCH_ABORT: 14,
		PLAYER_MATCH_DATA: 15,
		PLAYER_SOUND: 16,
		PLAYER_GARBAGE: 17,
		PLAYER_CHARACTER_SOUND: 19,
		PLAYER_SUBMIT_REPLAYDATA: 21,
		PLAYER_CLEARTEXT: 20,
	};
	
	#uit = {
		8: 1,
		16: 2,
		32: 4,
		64: 8
	};
	
	constructor() {
		
	}
	
	createWriter(channel, byte) {
		let wr = new BinaryWriter(byte + 1);
		wr.u8(this.#channels[channel]);
		return wr;
	}
	
	emit(channel, data) {
		let byteLength = 1;
		for (let h = 0; h < data.length; h++) {
			let ref = data[h];
			let endsWith = ref[0].split("");
			let byteFromType = endsWith[endsWith.length - 1];
			if (byteFromType == "g") {
				byteLength += new TextEncoder().encode(ref[1]).length + (this.#uit[ref?.[2] || 8]);
				//console.log(new TextEncoder().encode(ref[1]))
			}
			if (byteFromType == "8") {
				byteLength += 1;
			}
			if (byteFromType == "6") {
				byteLength += 2;
			}
			if (byteFromType == "2") {
				byteLength += 4;
			}
			if (byteFromType == "4") {
				byteLength += 8;
			}
		}
		
		let wr = new BinaryWriter(byteLength);
		wr.u8(this.#channels[channel]);
		for (let h = 0; h < data.length; h++) {
			
			let ref = data[h];
			//console.log(wr.offset, ref[0], ref[1])
			wr[ref[0]](ref[1], ref?.[2] || 8);
		}
		this.send(wr.buffer);
	}
	
	send(data) {
		if (this.#socket) this.#socket.send(data);
	}
	
	init() {
		
	}
	close() {
		if (this.#socket) {
			this.#socket.close();
			
		}
	}
	
	prepReady() {
		let wr = new BinaryWriter(2);
		wr.u8(this.#channels.ROOM_USER_READY);
		this.#socket.send(wr.buffer);
	}
	
	enterRoom() {
		let code = docId("guiTextarea-roomname").value.replace(/ /gmi, "");
		if (code.length < 4) return;
		let ols = [
			[
				"string",
				code,
				16
			],
			[
				"string",
				selectedSettings.Names.Main,
				8
			],
			[
				"u16",
				selectedSettings.NonIterable.Character
			],
		];
		for (let g of ["DAS", "ARR", "SFT"]) {
			ols.push(["u16", selectedSettings.Tuning[g]]);
		}
		this.emit("ROOM_JOIN", ols);
	}
	
	connect(callback) {
		this.#socket = new WebSocket(this.#url);
		this.#socket.binaryType = "arraybuffer";
		let isOpen = false;
		let isAlreadyResponded = false;
		this.#socket.onopen = (e) => {
			isOpen = true;
			//callback(1, e)
			//console.log(this.emit)
			this.emit("SERVER_CONNECT", []);
			
			
		}
		this.#socket.onclose = (e) => {
			//callback(0, e, isOpen);
			this.isOnline = false;
			this.isReady = false;
			this.isPrepared = false;
			
			switchMenu(0, true, gtris_transText("title"), "startPoint");
			musicPlayer.playMfx('menu');
			this.#socket = null;
		}
		this.#socket.onmessage = (e) => {
			//console.log(new Uint8Array(e.data))
			let rd = new BinaryReader(e.data);
			//console.log(new Uint8Array(e.data))
			let type = rd.u8();
			switch (type) {
				case 0: {
					let userID = rd.string(16);
					this.userID = userID;
					this.isOnline = true;
					switchMenu(14, true, gtris_transText("title_online"), "startPoint");
					musicPlayer.playMfx('online_lobby');
					//console.log(userID);
					break;
				}
				case this.#channels.ROOM_JOIN: {
					$STYLE("playerbox-or-room-p1", "background", "#444");
					$STYLE("playerbox-or-room-p2", "background", "#444");
					//console.log(new Uint8Array(rd.buffer));
					let access = rd.u8();
					let code = rd.string(8);
					let pcount = rd.u8();
					
					let players = [];
					for (let g = 0; g < pcount; g++) {
						let ma = rd.string();
						let mb = rd.u16();
						let isReady = rd.u8();
						players.push([ma, mb, isReady]);
					}
					
					$iH("guiText-or-p1-uname", selectedSettings.Names.Main);
					$iH("guiText-or-p1-cname", "(" + settingsList.NonIterable.Character[selectedSettings.NonIterable.Character] + ")");
					
					
					let p = players[0];
					$iH("guiText-or-rname", code);
					if (pcount !== 0) {
						$iH("guiText-or-p2-uname", p[0]);
						$iH("guiText-or-p2-cname", "(" + settingsList.NonIterable.Character[p[1]] + ")");
						
						$STYLE("playerbox-or-room-p2", "background", p[2] ? "#5a5" : "#444");

					} else {
						$iH("guiText-or-p2-uname", "(empty)");
						$iH("guiText-or-p2-cname", "(...)");
					}
					switchMenu(15, true, gtris_transText("online_room"), "startPoint");
					
					break;
				}
				case this.#channels.ROOM_USER_ENTER: {
					//console.log(new Uint8Array(rd.buffer));
					
					
					let p = [rd.string(8), rd.u16()];
					//$iH("guiText-or-rname", code);
					{
						$iH("guiText-or-p2-uname", p[0]);
						$iH("guiText-or-p2-cname", "(" + settingsList.NonIterable.Character[p[1]] + ")");
					}
					//switchMenu(15, true, gtris_transText("online_room"), "startPoint");
					
					break;
				}
				case this.#channels.ROOM_USER_READY: {
					let c = rd.u8();
					//$iH("guiText-or-rname", code);
					for (let bs = 0; bs < c; bs++) {
						let p = [rd.string(16), rd.u8(), rd.string(16)];
						if (p[0] === this.userID) {
							$STYLE("playerbox-or-room-p1", "background", p[1] ? "#5a5" : "#444");
							continue;
						}
						$STYLE("playerbox-or-room-p2", "background", p[1] ? "#5a5" : "#444");
					}
					break;
				}
				case this.#channels.MATCH_PREPARE: {
					//console.log(rd.buffer)
					let mode = rd.u8();
					let c = rd.u8();
					//$iH("guiText-or-rname", code);
					let k = {
						player1: {},
						player2: {}
					}
					for (let bs = 0; bs < c; bs++) {
						let p = [rd.string(16)];
						p.push(rd.string(16));
						p.push(rd.u16());
						p.push(rd.u16());
						p.push(rd.u16());
						p.push(rd.u16());
						p.push(rd.u32());
						if (p[0] === this.userID) {
							k.player1.name = p[1];
							k.player1.character = p[2];
							k.player1.das = p[3];
							k.player1.arr = p[4];
							k.player1.sft = p[5];
							k.player1.seed = p[6];
							continue;
						}
						k.player2.name = p[1];
						k.player2.character = p[2];
						k.player2.das = p[3];
						k.player2.arr = p[4];
						k.player2.sft = p[5];
						k.player2.seed = p[6];
						
					}
					//console.log(k.player1.seed, k.player2.seed)
					this.isRunning = false;
					this.isPrepared = false;
					this.isReady = false;
					gameStart(mode, null, true, k);
					$STYLE("playerbox-or-room-p1", "background", "#444");
					$STYLE("playerbox-or-room-p2", "background", "#444");
					break;
				}
				case this.#channels.MATCH_START: {
					this.isReady = true;
					this.isRunning = true;
					break;
				}
				case this.#channels.PLAYER_MATCH_DATA: {
					let isActive = rd.u8();
					let active = rd.u8();
					let rot = rd.u8()
					gachamino2.tetro = TETRO_MAP[active][rot];
					gachamino2.x = rd.i8();
					gachamino2.y = rd.i8();
					for (let n = 0; n < 210; n++) {
						let x = ~~(n / 21);
						let y = n % 21;
						field2.grid[x][field2.height - 21 + y] = rd.u8();
					}
					
					gachamino2.held = rd.u8();
					let o = rd.i8();
					hold2.piece = o == -1 ? void 0 : o;
					let prevc = rd.u8();
					for (let g = 0; g < prevc; g++) {
						preview2.grabBag[g] = rd.u8();
					}
					field2.garbageLength = rd.u8();
					field2.warning = rd.u8();
					field2.pieces = rd.u16();
					field2.score = rd.u32();
					field2.statistics.atk = rd.u16();
					//this.isRunning = true;
					break;
				}
				
				case this.#channels.ROOM_USER_LEAVE: {
					//console.log(new Uint8Array(rd.buffer));
					
					
					//let p = [rd.string(8), rd.u16()];
					//$iH("guiText-or-rname", code);
					{
						$iH("guiText-or-p2-uname", "(empty)");
						
						$iH("guiText-or-p2-cname", "(...)");
					}
					if (server.isRunning || server.isReady || server.isPrepared) {
						mforceEnd();
					}
					//switchMenu(15, true, gtris_transText("online_room"), "startPoint");
					
					break;
				}
				
				case this.#channels.MATCH_LOSE: {
					let lose = rd.string(8);
					field2.fieldResult(lose, true, 'lose');
					this.isReady = false;
					this.isPrepared = false;
					this.isRunning = false;
					
					
					//field.fieldResult("onevone_pwinres", false, "win");
					break;
				}
				
				case this.#channels.PLAYER_CLEARTEXT: {
					let line = rd.u8();
					let spin = rd.u8();
					let ren = rd.i16();
					let b2b = rd.i16();
					let pc = rd.u8();
					
					if (spin == 2) {
						field2.showClearTextTSPIN('', gtris_transText('spin'), "outward", gtris_transText('spinAnimated'))
						
					}
					if (spin == 1) {
						field2.showClearTextTSPIN('', gtris_transText('mini'), "outward", gtris_transText('miniAnimated'))
						
					}
					
					if (line == 1) {
						field2.showClearText('', gtris_transText('line1'), "outward")
					}
					if (line == 2) {
						field2.showClearText('', gtris_transText('line2'), "outward")
					}
					if (line == 3) {
						field2.showClearText('', gtris_transText('line3'), spin == 2 ? "inward" : "outward", gtris_transText('line3'), spin == 2, "#80FF")
					}
					if (line == 4) {
						field2.showClearText('', gtris_transText('line4'), "inward", gtris_transText('line4'), true, "#0CCF")
					}
					if (line >= 5) {
						field2.showClearText('', gtris_transText('line5'), "inward", gtris_transText('line5'), true, "#0CCF") //redundancy ;'('
					}
					
					if (b2b !== -2) {
						if (b2b > 0) field2.showClearTextB2B('show', gtris_transText("b2bcounter", b2b))
						else field2.showClearTextB2B('hide');
					}
					if (ren !== -2) {
						if (ren > 0) field2.showClearTextREN('show', gtris_transText('combo', ren));
						
						else field2.showClearTextREN('hide')
					}
					if (pc) {
						field2.engagePC(true, gtris_transText("pc"))
					}
					
					//field2.fieldResult("onevone_pwinres", false, "win");
					break;
				}
				case this.#channels.PLAYER_SOUND: {
					let c = rd.u8();
for (let g = 0; g < c; g++) {
	let lo = rd.string(8);
	soundPlayer.playse(lo);
}
					//field.fieldResult("onevone_pwinres", false, "win");
					break;
				}
				case this.#channels.PLAYER_CHARACTER_SOUND: {
					let lo = rd.string(8);
field2.playVoice(lo);
					//field.fieldResult("onevone_pwinres", false, "win");
					break;
				}
				case this.#channels.PLAYER_GARBAGE: {
					field.addGarbageToArray(rd.u16());
					break;
				}
				case this.#channels.PLAYER_SUBMIT_REPLAYDATA: {
					let gsv = JSON.parse(rd.string(32));
					replayData.player2.keyList = gsv.keys;
					replayData.player2.garbage = gsv.garbage;
					break;
				}
			}
		}
	}
}();