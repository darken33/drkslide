/**
 * FS.js - script pour accéder au FileSystem du téléphone
 */
var sdcard=null;
var directoryName = "drkslide";
var gamesetDir = "gameset";
var gamesetReader;
var fileNameOptions = "options.txt";
var fileNameHighsc = "highscores.txt";
var fileSystem = 0;
var dir = 0;
var ficoptions = 0;
var fichighsc = 0;
var option_exists = false;
var ready_option = false;
var ready_highsc = false;
var ready_error = false;
var thread = null;
var game_options = new Array();
var game_highscores = new Array();
var gs2load = 1;
var gamesets = new Array();
var new_install = false;

/** 
 * onFSInitSuccess - appelée lorsque l'initialisation du FS a abouti 
 */
function onFSInitSuccess(_fileSystem) {
 	fileSystem=_fileSystem;
 	fileSystem.root.getDirectory(directoryName, {create: true, exclusive: false}, onDirectoryInitSuccess, onFSError);
}

/** 
 * onDirectoryInitSuccess - appelée lorsque l'initialisation du DIR a abouti 
 */
function onDirectoryInitSuccess(_dir) {
	dir = _dir;
	dir.getFile(fileNameOptions, {create: true, exclusive: false}, onFileOptionsInitSuccess, onFSError);
	dir.getFile(fileNameHighsc, {create: true, exclusive: false}, onFileHighscInitSuccess, onFSError);
	gamesetDirectoryInit();
}

/** 
 * onFileOptionsInitSuccess - appelée lorsque l'initialisation du fichier OPTIONS a abouti 
 */
function onFileOptionsInitSuccess(_fileentry) {
	ficoptions = _fileentry;
	ficoptions.file(readOptions, onFSError);
}

/** 
 * onFileHighscInitSuccess - appelée lorsque l'initialisation du fichier HIGHSCORES a abouti 
 */
function onFileHighscInitSuccess(_fileentry) {
	fichighsc = _fileentry;
	fichighsc.file(readHighscores, onFSError);
}

/** 
 * onFSError - appelée lorsqu'une erreur est levée
 */
function onFSError(_error) {
	var message = "File System Error: " + _error.code;
	alert(message);
	initOptions();
	initHighscores();
	// on est en erreur
    ready_error=true;
	activateApp();
    console.log(message);
}

/**
 * readTodoList - lecture du fichier TODO
 */ 
function readOptions(_file) {
	var reader = new FileReader();
	reader.onload = function(_evt) {
		var res = _evt.target.result;
		var list;
		if (res == "" || res == null) {
			initOptions();
		}
		else {
			list = res.split('\n');
			game_options = { "difficulty" : list[0], "playername" : list[1], 
						"helponstart" : (list[2] == "true" ? true : false), 
						"soundactive" : (list[3] == "true" ? true : false), 
						"sharescore" : (list[4] == "true" ? true : false), 
						"gameset" : (list.length<6 || list[5] == null || list[5] == "" ? "default" : list[5]),  
						"lang" : (list.length<7 || list[6] == null || list[6] == "" ? "fr" : list[6]),  
						"visit" : (list.length<8 || list[7] == null || list[7] == "" ? "0000-00-00T00:00:00.000Z" : list[7]),  
						};
		}
        ready_option = true;
		activateApp();
   };
   reader.readAsText(_file);
}

/**
 * readTaskList - lecture du fichier TASK
 */ 
function readHighscores(_file) {
	var reader = new FileReader();
	reader.onloadend = function(_evt) {
		var res = _evt.target.result;
		var list;
		if (res == "" || res == null) {
			initHighscores();
		}
		else {
			list = res.split('\n');
			var item;
			var score1 =  new Array();
			for (i=0; i<10; i++) {
				item = list[i].split('#');
				score1.push({ "name" : item[0], "depl" : item[1], "time" : item[2], "score" : item[3]}); 
			}
			var score2 =  new Array();
			for (i=10; i<20; i++) {
				item = list[i].split('#');
				score2.push({ "name" : item[0], "depl" : item[1], "time" : item[2], "score" : item[3]}); 
			}
			var score3 =  new Array();
			for (i=20; i<30; i++) {
				item = list[i].split('#');
				score3.push({ "name" : item[0], "depl" : item[1], "time" : item[2], "score" : item[3]}); 
			}
			game_highscores = { "facile" : score1, "moyen" : score2, "difficile" : score3 };
		}
        ready_highsc = true;
		activateApp();
   };
   reader.readAsText(_file);
}

/**
 * writeTodoList - ecriture du fichier TODO
 */ 
function writeOptions() {
    if (device.platform == "firefoxos") {
		ffosFileOptionDelete();
	}
	else { 
		ficoptions.createWriter(
			function(writer) {
				var text = game_options.difficulty + '\n' + game_options.playername + '\n' + 
					game_options.helponstart + '\n' + game_options.soundactive + '\n' +	
					game_options.sharescore + '\n' + game_options.gameset + '\n' + 
					game_options.lang + '\n' + game_options.visit;
				writer.onerror = onFSError;
				writer.write(text);
			}, onFSError
		);
	}
}

function writeHighscores() {
    if (device.platform == "firefoxos") {
		ffosFileHighscoreDelete();
	}
	else { 
		fichighsc.createWriter(
			function(writer) {
				var text = '';
				var hs = "";
				for (i = 0; i < 10; i++) {
					hs = game_highscores.facile[i];
					text += hs.name + "#" + hs.depl + "#" + hs.time + "#" + hs.score + '\n';
				}
				for (i = 0; i < 10; i++) {
					hs = game_highscores.moyen[i];
					text += hs.name + "#" + hs.depl + "#" + hs.time + "#" + hs.score + '\n';
				}
				for (i = 0; i < 10; i++) {
					hs = game_highscores.difficile[i];
					text += hs.name + "#" + hs.depl + "#" + hs.time + "#" + hs.score + '\n';
				}
				writer.onerror = onFSError;
				writer.write(text);
			}, onFSError
		);
	}
}

/**
 * initFileSystem - intialisation du File System
 */
function initFileSystem() {
    if (device.platform == "firefoxos") {
		sdcard=navigator.getDeviceStorage("sdcard");
		ffosFileOptionRead();
		ffosFileHighscoreRead();
	}
	else { 
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSInitSuccess, 
		function(_evt){	
			onFSError(_evt.target);
		});
	} 
}

/**
 * isFsReady - renvoie true losque le périférique est pret
 */
function isFsReady() {
	return (ready_error || (ready_option && ready_highsc));
}  

/**
 * init HS
 */
function initHighscores() {
	// Initialisation des Highscores
	var score1 =  new Array();
	for (i=0; i<10; i++) {
		score1.push({ "name" : "-", "depl" : "9999", "time" : "999:59", "score" : 0}); 
	}
	var score2 =  new Array();
	for (i=0; i<10; i++) {
		score2.push({ "name" : "-", "depl" : "9999", "time" : "999:59", "score" : 0}); 
	}
	var score3 =  new Array();
	for (i=0; i<10; i++) {
		score3.push({ "name" : "-", "depl" : "9999", "time" : "999:59", "score" : 0}); 
	}
	game_highscores = { "facile" : score1, "moyen" : score2, "difficile" : score3 };	
} 

/**
 * init options
 */
function initOptions() {
	// Initialisation des parametres
	game_options = { "difficulty" : 1, "playername" : "Player 1", 
		"helponstart" : true, "soundactive" : false, 
		"sharescore" : true, "gameset" : "default", "lang" : "en", "visit" : "0000-00-00T00:00:00.000Z" };
	new_install = true;
}

/**
 * gamesetDirectoryInit - initialisation des gameset
 */
function gamesetDirectoryInit() {
	gamesets = new Array();
 	fileSystem.root.getDirectory(directoryName+'/'+gamesetDir, {create: true, exclusive: false}, onGamesetDirInitSuccess, onGSError);
}
  
/** 
 * onDirectoryInitSuccess - appelée lorsque l'initialisation du DIR a abouti 
 */
function onGamesetDirInitSuccess(_dir) {
	gamesetReader = _dir.createReader();
	gamesetReader.readEntries(onGamesetDirRead, onGSError);
}

/** 
 * onGamesetDirRead - appelée lorsque on a lu la liste des gamesets installés 
 */
function onGamesetDirRead(_entries) {
	_entries;
	gs2load = _entries.length;
	for (i = 0; i < _entries.length; i++) {
		entry = _entries[i];
		entry.getFile("gameset.gs", {create: false, exclusive: false}, onGamesetOpenSucess, onGamesetFail);
	}
}


/** 
 * onGamesetOpenSucess - ouverture d'un gameset 
 */
function onGamesetOpenSucess(_fileentry) {
	_fileentry.file(readGameset, onGamesetFail);
}

/** 
 * onGamesetFail - erreur d'un gameset 
 */
function onGamesetFail(_error) {
	var message = "File System Error: " + _error.code;
    console.log(message);
    gs2load--;
	activateApp();
}

/**
 * readGameset - lecture du fichier Gameset
 */ 
function readGameset(_file) {
	var reader = new FileReader();
	reader.onloadend = function(_evt) {
		var res = _evt.target.result;
		if (res == "" || res == null) {
			console.log("Impossible de charger "+_file.name);
			gs2load--;
		}
		else {
			res.replace(/\n/g, '');
			var gameset_loc = JSON.parse(res);
			gamesets.push(gameset_loc);
			gs2load--;
		}
		activateApp();
   };
   reader.readAsText(_file);
}

/**
 * isFsReady - renvoie true losque le périférique est pret
 */
function isGsReady() {
	return (gs2load == 0);
}  

/**
 * onGSError
 */
function onGSError(_error) {
	var message = "File System Error: " + _error.code;
	// on est en erreur
    gs2load=0;
	activateApp();
    console.log(message);
}

function ffosFileOptionRead() {
	var request = sdcard.get(directoryName+"/"+fileNameOptions);
	request.onsuccess = function () {
		ficoptions = this.result;
		readOptions(ficoptions);
	}
	request.onerror = function() {
		initOptions();
        ready_option = true;
		activateApp();
	}
}

function ffosFileHighscoreRead() {
	var request = sdcard.get(directoryName+"/"+fileNameHighsc);
	request.onsuccess = function () {
		fichighsc = this.result;
		readHighscores(fichighsc);
	}
	request.onerror = function() {
		initHighscores();
        ready_highsc = true;
		activateApp();
	}
}

function ffosFileOptionWrite() {
	var text = game_options.difficulty + '\n' + game_options.playername + '\n' + 
		game_options.helponstart + '\n' + game_options.soundactive + '\n' +	
		game_options.sharescore + '\n' + game_options.gameset + '\n' + 
		game_options.lang + '\n' + game_options.visit;
	var file = new Blob( [text], {type: "text/plain"});	
	request = sdcard.addNamed(file, directoryName+"/"+fileNameOptions);			
}

function ffosFileHighscoreWrite() {
	var text = '';
	var hs = "";
	for (i = 0; i < 10; i++) {
		hs = game_highscores.facile[i];
		text += hs.name + "#" + hs.depl + "#" + hs.time + "#" + hs.score + '\n';
	}
	for (i = 0; i < 10; i++) {
		hs = game_highscores.moyen[i];
		text += hs.name + "#" + hs.depl + "#" + hs.time + "#" + hs.score + '\n';
	}
	for (i = 0; i < 10; i++) {
		hs = game_highscores.difficile[i];
		text += hs.name + "#" + hs.depl + "#" + hs.time + "#" + hs.score + '\n';
	}
	var file = new Blob( [text], {type: "text/plain"});	
	request = sdcard.addNamed(file, directoryName+"/"+fileNameHighsc);			
}

function ffosFileOptionDelete() {
	var request = sdcard.delete(directoryName+"/"+fileNameOptions);
	request.onsuccess = function() {
		ffosFileOptionWrite();
	}
	request.onerror = function() {
		ffosFileOptionWrite();
	}
}

function ffosFileHighscoreDelete() {
	var request = sdcard.delete(directoryName+"/"+fileNameHighsc);
	request.onsuccess = function() {
		ffosFileHighscoreWrite();
	}
	request.onerror = function() {
		ffosFileHighscoreWrite();
	}
}
