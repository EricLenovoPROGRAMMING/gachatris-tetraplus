/**EricLenovo 2022
 * Gachatris Tetraplus Initializer
 * ----------------------------------
 * Started developing on May 5, 2022
 */
/*const eval = () => {
  console.warn('JS Console is not usable in this site.')
} /**/
"use strict"
var SCREEN_WIDTH = window.innerWidth,
SCREEN_HEIGHT = window.innerHeight

function docId(id) {
	return document.getElementById(id)
}
function $ID(id) {
	return document.getElementById(id)
}
function $CN(id, n) {
	if (n !== void 0)
		return document.getElementsByClassName(id)[n]
	else
		return document.getElementsByClassName(id)
}

function $QSA(id, n) {
	if (n !== void 0)
		return document.querySelectorAll(id)[n]
	else
		return document.querySelectorAll(id)
}

function $tag(id, n) {
	if (n !== void 0)
		return document.getElementsByTagName(id)[n]
	else
		return document.getElementsByTagName(id)
}

function $create(tag, func) {
	let a = document.createElement(tag)
	func(a)
}

function $copy(arr) {
	var ARR = []
	for (let a = 0, len = arr.length; a < len; a++) {
		if (typeof arr[a] == "object" && arr[a] instanceof Array) {
			ARR.push([])
			for (let b = 0, len2 = arr[a].length; b < len2; b++) {
				ARR[a].push(arr[a][b])
			}
		}
		else {
			ARR.push(arr[a])
		}
	}
	return ARR
}

function range(start, end, inc) {
	inc = inc || 1
	var array = []
	for (var i = start; i < end; i += inc) {
		array.push(i)
	}
	return array
}

function $iH(id, innerHTM) {
	if (innerHTM !== void 0) {
		//f (docId(id).innerHTML !== innerHTM)
			docId(id).innerHTML = innerHTM
	}
	else return docId(id).innerHTML
	
}



Number.prototype.mod = function(n) {
	return ((this % n) + n) % n
};

function getElemPos(doc,pos){
	if(pos === "x"){
		return docId(doc).getBoundingClientRect().x
	}
	if (pos === "y") {
		return docId(doc).getBoundingClientRect().y
	}
	if (pos === "width") {
		return docId(doc).getBoundingClientRect().width
	}
	if (pos === "height") {
		return docId(doc).getBoundingClientRect().height
	}
}
const  $STYLE = function(id, prop, s) {
  let d = $ID(id);
  if (d.style[prop] !== s) {
   d.style[prop] = s;
  };
 },
 $STYLEELEM = function(id, prop, s) {
  if (id.style[prop] !== s) {
   id.style[prop] = s;
  };
 },  $ELEM = function(tag, func) {
  var a = document.createElement(tag);
  func.bind(a)(a);
 },
 $RECTELEM = function(elem, pos) {
  return elem.getBoundingClientRect()[pos];
 };

 const $BN = (query) => {
 return `${query}`
};


class ParkMillerPRNG {
	constructor() {
		this.seed = 1;
	}
	next() {
		return this.gen() / 2147483647
	}
	gen() {
		return (this.seed = (this.seed * 16807) % 2147483647);
	}
}

const nativeLDBManager = new class {
 constructor() {
  this.database;
  this.backup = [];
  this.dbname = window.location + "nldb";
  this.version = 3;
  this.listeners = {};
 }
 backupAndUpdate() {
  this.backup = [];
  let requestBackup = this.database.transaction("Main", "readonly").objectStore("Main");

  let test = requestBackup.getAll();
  test.onsuccess = () => {
   let arr = test.result;
   for (let w of arr) {
    this.backup.push(w);
   }
   this.database.close();
   this.initialize(this.categories, this.listeners, this.version, true);
   ////console.log("index missing, upgrading database");
  }
 }

 initialize(indices, listener, version, isBackup) {
  let on = listener || {
   update: null,
   open: null
  };
  this.listeners.open = on.open || function() {};
  this.listeners.update = on.update || function() {};
  let a = indexedDB.open(this.dbname, version || void 0);
  this.categories = indices || [];
  a.onerror = (e) => {
   console.error(e.target.error)
  }
  a.onsuccess = (qe) => {
   this.database = qe.target.result;
   this.version = this.database.version;
   let test = this.database.transaction("Main", "readwrite").objectStore("Main");
   let pq = [];
   for (let ii = 0; ii < Object.keys(test.indexNames).length; ii++) {
    pq.push(test.indexNames[ii]);
    pq.push(`${test.indexNames[ii]}_unique`);
   }
   let isExist = true;
   for (let w of this.categories) {
    if (pq.indexOf(w) == -1) {
     isExist = false;
    }
   }

   if (!isExist) {
    this.version++;
    //this.database.close();
    this.backupAndUpdate();
    this.listeners.update();
    return;
   }
   if (isBackup) {
    for (let ww of this.backup) {
     test.put(ww);
    }
   }
   ////console.log("database is ready");
   let proptest = test.getAll();
   proptest.onsuccess = () => {
    ////console.log(proptest.result)
   }
   this.listeners.open();
  }

  a.onupgradeneeded = async (e) => {
   let aa = e.target.result;
   let ab, ac;
   ////console.log("upgrading...");

   try {
    let te = a.result.objectStoreNames,
     isExist = false;

    for (let tew = 0; tew < Object.keys(te).length; tew++) {
     if (te[tew] == "Main") isExist = true;
    }

    if (isBackup && isExist) await aa.deleteObjectStore("Main");

    ab = await aa.createObjectStore("Main", { keyPath: "index" });
    ////console.log(te)
   } catch (e) {
    ////console.log(e);
    // ab = await aa.transaction("Main").objectStore("Main");
   }


   try {
    let o = ab.indexNames;
    ////console.log(o, "INDEX")/**/

    let wIsExist = false;

    for (let tew = 0; tew < Object.keys(o).length; tew++) {
     if (te[tew] == "main") wIsExist = true;
     if (te[tew] == "main_unique") wIsExist = true;
    }
    ac = await ab.createIndex("main", "category", { unique: false });
    await ab.createIndex("main_unique", ["index", "category"], { unique: false });
   } catch (e) {
    ////console.log("error" + e)
   }

   for (let y of this.categories) {
    try {
     ab.createIndex(y, `category`, { unique: false });
     ab.createIndex(`${y}_unique`, ["index", "category"], { unique: false });
    } catch (e) {
     ////console.log(e, "TRANSACTION")
    }
   }


  }
 }
 read(category, ind, func) {
  let _category = "main";
  if (category) _category = category;
  ////console.log(this.database.transaction)
  let a = this.database.transaction("Main", "readonly");
  let b = a.objectStore("Main").index(`${_category}_unique`);
  let c;
  try {
   c = b.get([ind, _category]);
   c.onsuccess = () => {
    func(c.result);
   }
   c.onerror = (e) => {
    //console.log("error");
    func(undefined);
   }
  } catch (e) {
   //console.log("error");
   func(undefined);
  }
 }

 readAll(category, func) {
  let _category = "main";
  if (category) _category = category;
  let a = this.database.transaction("Main", "readonly");
  let b = a.objectStore("Main").index(_category);
  let c;
  try {
   c = b.getAll(_category);
   c.onsuccess = () => {
    func(c.result)
   }

  } catch (e) {
   ////console.log("error" + e)
   func(undefined);
  }
 }

 write(category, ind, val, func) {
  //if (this.categories.indexOf(d) === -1) throw new Error(`Category ${category} not found for index ${ind}`);
  let index = "main";
  if (category) index = category;
  let a = this.database.transaction("Main", "readwrite");
  let b = a.objectStore("Main");

  let c = {
   index: ind,
   value: val,
   timestamp: Date.now(),
   category: "",
   searchable: {}
  };


  c.category = index;
  c.searchable[index] = ind;

  b.put(c);

  a.oncomplete = () => {
   if (func) func();
  }
 }

 delete(category, ind, func) {
  let _func = func || function() {}
  let index = "main";
  if (category) index = category;
  let a = this.database.transaction("Main", "readwrite");
  let b = a.objectStore("Main");

  try {
   let find = b.get(ind);
   find.onsuccess = () => {
    let r = find.result;
    if (!r) return;
    //  ////console.log(r)
    if (index === r.category) {
     let wq = b.delete(ind);
     _func(true);
    }
   }
  } catch (e) {
   //throw e
   ////console.log(e)
   _func(false);
  };
 }

}();

const assetNLDB = new class {
 constructor() {}

 toNLDB(array, onstore, onfinish) {
  let count = 0,
   length = array.length,
   downloaded = [];
  /*for (let a of arrayIndexes) {
   nativeLDBManager.read(a.category, a.name, (qw) => {
    if (!qw) {
     /*var xhr = new XMLHttpRequest(),
      blob;

     xhr.open("GET", a.src, true);
     xhr.responseType = a.type;

     xhr.addEventListener("load", function() {
      if (xhr.status === 200) {

       blob = xhr.response;
       nativeLDBManager.write(
        a.category, a.name, blob, (t) => {
         nativeLDBManager.read("Images", "DYK1", (Y) => {

         })
        }
       )

      }
     }, false);
     // Send XHR
     xhr.send();
     
     
     
    }
   })
  }*/

  let g = () => {
   if (array.length === 0) {
    return "finished";
   }

   let q = array.shift();
   nativeLDBManager.read(q.c, q.n, (u) => {
    if (u) {
     if (q?.b && q.b === u.size) return "finished";
    };
    fetch(q.n).then((fi) => {
     return fi.blob();
    }).then(h => {
     nativeLDBManager.write(q.c, q.n, h);
     downloaded.push({
      n: q.n,
      b: h.size
     });
     if (g() === "finished" && onfinish !== void 0) { // recursor
      onfinish(downloaded);
     };
    });
   })
  }

 }

}()

const cacheManager = new class {
 constructor() {
  this.cacheData = {};
 }

 checkLoad(cach) {
  let cacheDir = $BN(cach);
  if (this.cacheData?.[cacheDir]) return this.cacheData[cacheDir].isLoaded;
  return false;
 }

 boolLoad(cach, bool) {
  let cacheDir = $BN(cach);
  if (this.cacheData?.[cacheDir]) this.cacheData[cacheDir].isLoaded = true;
 }
 
 directLoad(cache) {
  let a = this.cacheData[cache] || {
   value: null,
  };
  return a.value;
 }
 
 directSave(cache, value) {
  this.cacheData[cache] = {
    isLoaded: false,
    value: value(cache)
  };
 }

 loadCache(cach, value, category, on) {
  let cacheData = $BN(cach);
  nativeLDBManager.read(category, cacheData, (u) => {
   let nldbValue = false;
   if (!u) {
    nldbValue = false;
   } else {
    let _value = u.value;
    let url = _value;
    if (_value instanceof Blob) {
     url = window.URL.createObjectURL(_value);
    }
    nldbValue = url;
   }
   if (!(this.cacheData?.[cacheData])) this.cacheData[cacheData] = {
    isLoaded: false,
    value: value(nldbValue || cacheData)
   }

   on(this.cacheData[cacheData]);
  })


  /*let nldbValue = await this.promise(category, cacheData).then(u => {
   //console.log(u)
  });*/

  ////console.log(this.promise(category, cacheData))


 }

 promise(cat, p) {
  let categ = cat,
   path = p;
  return new Promise((resolve) => {
   nativeLDBManager.read(categ, path, (u) => {
    if (typeof u === "undefined") {
     resolve(path);
     return;
    }
    let value = u.val;
    let url = value;
    if (value instanceof Blob) {
     url = window.URL.createObjectURL(value);
    }
    resolve(url);
   })
  });
 }

}()


void function() {
	let array = ['jQuery', 'howler-lib', 'gachatris-data', 'piece', 'field', 'queue_prev', 'pieceHold', 'enhancementfrenzy', 'player2/piece', 'player2/field', 'player2/queue_prev', 'player2/pieceHold', 'player2/enhancementfrenzy', 'ai', 'ai_frenzy', 'soundplayer', 'musicplayer', 'language', 'main', 'gparticle', 'character_details', 'uiSound', 'menus', 'replayCenter', 'modeProto', 'modeparameters','loader']
	var i = 0
	var sfx
	
	nativeLDBManager.initialize(["images"], () => {}, 2);

	function loadScript() {
		$create('script', function(a) {
			a.src = `scripts/${array[i]}.js`
			a.id = `script-${array[i]}`
			a.type = 'text/javascript'
			$iH('gtrisSplashText', `
			 <div style="width:100%;height:1%;background:#444"><div style="width:${(i / array.length)*100}%;height:100%;background:#fff;"></div></div>
			`)
			document.body.appendChild(a)
			a.onload = () => {
				if (i < array.length - 1) {
					i++
					loadScript();
				} else {
					sound();

		  mobileButtons.showHide(false)

				}
			}
		})
	}

	function startup() {
		sfx.play()
		
			initializeGTris()
			removeEventListener("click", startup, false)
			removeEventListener("keydown", startup, false)
			}

	function sound() {
		$iH('gtrisSplashText', gtris_transText("initializeGtris"))
		addEventListener("click", startup, false)
		addEventListener("keydown", startup, false)
		sfx = new Howl({ src: "assets/se/menu/gtrisstartup.ogg", preload: false, format: "ogg" })
		sfx.volume(selectedSettings.Volume.SFX / 100)
		/*sfx.once('load', function() {
			setTimeout(() => {
				//sfx.play()
			}, 100)
		})/**/
		  mobileButtons.initiateButtons();
		/*sfx.once('play', function() {

		})*/
		setTimeout(() => {
			sfx.load()
		}, 100)
		musicPlayer.loadMfx('menu')
	}
	loadScript()

	function skipWithKey() {
		var arr = [$('#gtrisSplashText'), $('#splashLogo')]
		arr.forEach((e) => {
			e.stop(true, true)
			e.css({ 'opacity': 0 })
		})
		skip()
		sfx.fade(selectedSettings.Volume.SFX / 100, 0, 500)
		sfx.on('volume', function() { this.unload() })
	}

	function skip() {
		$('#splash').css('z-index', "-36")
		activeMenu(true, "100%", true)
		switchMenu(0, true, 'Gachatris Tetraplus Alpha', true)
		removeEventListener('keydown', skipWithKey)
		removeEventListener('click', skipWithKey)
		musicPlayer.playMfx('menu')
		addEventListener('keydown', keyUpDown, false)
		addEventListener('keyup', keyUpDown, false)
	}

	function initializeGTris() {
		setTimeout(function() {
			sfx.once('end', function() { sfx.unload() })
			addEventListener('keydown', skipWithKey, false)
			addEventListener('click', skipWithKey, false)
		}, 300)
		$('#gtrisSplashText').animate({ opacity: 0 }, 0, "linear", function() { this.innerHTML = gtris_transText('splash1') })
		$('#gtrisSplashText').animate({ opacity: 1 }, 400, "linear")
		$('#gtrisSplashText').animate({ opacity: 1 }, 2500, "linear")
		$('#gtrisSplashText').animate({ opacity: 0 }, 400, "linear", function() { this.innerHTML = gtris_transText('splash2') })
		$('#gtrisSplashText').animate({ opacity: 1 }, 400, "linear")
		$('#gtrisSplashText').animate({ opacity: 1 }, 2500, "linear")
		$('#gtrisSplashText').animate({ opacity: 0 }, 400, "linear", function() {
			this.innerHTML = gtris_transText('splash3', gtris_version)
			$('#splashLogo').animate({ opacity: 0 }, 0, "linear")
			$('#splashLogo').animate({ opacity: 1 }, 400, "linear")
			$('#splashLogo').animate({ opacity: 1 }, 1000, "linear")
			$('#splashLogo').animate({ opacity: 0 }, 250, "linear")
		})
		$('#gtrisSplashText').animate({ opacity: 1 }, 400, "linear")
		$('#gtrisSplashText').animate({ opacity: 1 }, 1000, "linear")
		$('#gtrisSplashText').animate({ opacity: 0 }, 250, "linear", function() {
			skip()
		})
	}
}();


