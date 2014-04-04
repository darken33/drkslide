var clac_snd = "/android_asset/www/sound/clac.wav";
var m_clac;
var melange_snd = "/android_asset/www/sound/melange.wav";
var m_melange;
var yeah_snd = "/android_asset/www/sound/oh_yeah.wav";
var m_yeah;

function soundLoaded() {
	console.log('play sound.');
}

function isSoundReady() {
	return (sound_loaded == 3);
}

function soundErr(err) {
	alert(err);
}

function loadSounds() {
	m_clac = new Media(clac_snd, soundLoaded, soundErr);
	m_melange = new Media(melange_snd, soundLoaded, soundErr);
	m_yeah = new Media(yeah_snd, soundLoaded, soundErr);
}
