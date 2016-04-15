/**
 * gameset.js : script de gestion des gameset de drkSlide
 * 
 * @author : Philippe Bousquet <darken33@free.fr>
 * @date   : 05/2013
 * @version: 1.0
 * 
 * This software is under GNU General Public License
 */
//var drkSlideUrl = "http://localhost:8080/drkslide";
var drkSlideUrl = "http://darken33.free.fr/drkslide";
var gamesetHosted = "";
var nbfiledw = 0;
var dwprogress = 0;
var thread_download = null;
var thread_readgs = null;
var lastVisit = null;
var ungsname = "";

/**
 * Service de liste des gameset
 */  
function gamesetListService() {
	result = { 
		"name": "service", 
		"description": "Liste des games sets disponibles", 
		"gameset": [ 
			{ 
				"name": "toulouse",
				"description": "Gameset des monuments de Toulouse",
				"levels": 10,
				"price" : 0,
				"licence": "Creative Commons By Sa",
				"date" : "2014-02-05"
			}, 
			{ 
				"name": "to-upgrade",
				"description": "Gameset de test",
				"levels": 10,
				"price" : 0,
				"licence": "Creative Commons By Sa",
				"date" : "2014-02-07"
			},
			{ 
				"name": "to-download",
				"description": "Gameset de test",
				"levels": 10,
				"price" : 0,
				"licence": "Creative Commons By Sa",
				"date" : "2014-02-07"
			}
		]
	};
	return result;
}

/**
 * Verification de nouveau Gamesets
 */ 
function gamesetLastUpdate() {
	$('#loadnew').show();
	$('#txtnew').html(texte_gameset_message_new[game_options.lang]);
	vdate = (new Date()).toJSON();
	url = drkSlideUrl + "/services/gamesets_update.php?v="+vdate;
	$.getJSON(url, function(data) {
		lastVisit = data;
		$('#txtnew').html(texte_gameset_message_new[game_options.lang]);
		if (lastVisit.dateUpdate > game_options.visit && device.platform != "firefoxos") {
			$('#msgnew').show();
		}
		$('#loadnew').hide();
		game_options.visit = lastVisit.dateVisit;
		writeOptions();
	}).fail(function() {
		$('#msgnew').hide();
		$('#loadnew').hide();
	});
}

function eventDwGs(evt) {
	var gsn = evt.currentTarget.id.split("_");
	downloadGameset(gsn[2],'DW');
}

function eventOkGs(evt) {
	var gsn = evt.currentTarget.id.split("_");
	downloadGameset(gsn[2],'OK');
}

function eventUpGs(evt) {
	var gsn = evt.currentTarget.id.split("_");
	downloadGameset(gsn[2],'UPG');
}

function eventDlGs(evt) {
	var gsn = evt.currentTarget.id.split("_");
	deleteGameset(gsn[2]);
}

/**
 * Gestion des gamesets
 */ 
function gamesetManagement() {
//	if ($('#game_gameset').val() == "gerer") {
		$.mobile.changePage('#loading', { transition: "none", changeHash: false, reloadPage: false, allowSamePageTransition: true });
		$("#error_gs").html("");
		$('.btn_gg').off("tap");
		url = drkSlideUrl + "/services/gamesets_service.php?v="+(lastVisit != null ? lastVisit.dateUpdate : "");
		$.getJSON(url, function(data) {
			gamesetHosted = data;
			listGS_txt = data.gameset;
			gamesetHosted.gameset = parseGamesets(listGS_txt);
			gameset_list_html = '<table class="ui-responsive table-stroke" style="width: 100%; border-collapse:collapse;">';
			// On constitue la liste des gamesets disponibles sur le serveur
			for (i = 0; i < gamesetHosted.gameset.length; i++) {
				gs = gamesetHosted.gameset[i];
				gsp = getGameSet(gs.name, gamesets);
				gameset_list_html += '<tr>';
				gameset_list_html += '<td width="80%" style="text-align: left; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;">'+$.ucfirst(gs.name)+'</td>';
				// OK, MAJ, DOWNLOAD
				if (gsp == null) {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-left: 1px #282828 solid; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a id="bt_dw_'+gs.name+'" class="btn_gg" href="#" data-role="button" data-icon="arrow-d" data-iconpos="notext" data-theme="a" data-inline="true" style="background: #00FFFF; color: #FFFFFF;">Download</a></td>';
				}
				else if (gs.date == gsp.date) {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-left: 1px #282828 solid; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a id="bt_dw_'+gs.name+'" class="btn_gg" href="#" data-role="button" data-theme="a" data-icon="check" data-iconpos="notext" data-inline="true" style="background: #00FF00; color: #FFFFFF;">Up to date</a></td>';
				}
				else {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-left: 1px #282828 solid; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a id="bt_dw_'+gs.name+'" class="btn_gg" href="#" data-role="button" data-icon="refresh" data-iconpos="notext" data-theme="a" data-inline="true" style="background: Orange; color: #FFFFFF;">Refresh</a></td>';
				}
				/*
				if (gsp == null) {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-left: 1px #282828 solid; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a id="bt_dw_'+gs.name+'" class="btn_gg" onclick="downloadGameset('+"'"+gs.name+"','DW'"+')" href="#" data-role="button" data-icon="arrow-d" data-iconpos="notext" data-theme="a" data-inline="true" style="background: #00FFFF; color: #FFFFFF;">Download</a></td>';
				}
				else if (gs.date == gsp.date) {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-left: 1px #282828 solid; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a id="bt_dw_'+gs.name+'" class="btn_gg" onclick="downloadGameset('+"'"+gs.name+"','OK'"+')" href="#" data-role="button" data-theme="a" data-icon="check" data-iconpos="notext" data-inline="true" style="background: #00FF00; color: #FFFFFF;">Up to date</a></td>';
				}
				else {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-left: 1px #282828 solid; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a id="bt_dw_'+gs.name+'" class="btn_gg" onclick="downloadGameset('+"'"+gs.name+"','UPG'"+')" href="#" data-role="button" data-icon="refresh" data-iconpos="notext" data-theme="a" data-inline="true" style="background: Orange; color: #FFFFFF;">Refresh</a></td>';
				}
				*/
				// DELETE ?
				/*
				if (gsp != null) {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a class="btn_gg" id="bt_dl_'+gs.name+'" onclick="deleteGameset('+"'"+gs.name+"'"+')"  href="#" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-inline="true" style="background: #FF0000; color: #FFFFFF;">Delete</a></td>';
				}
				*/ 
				if (gsp != null) {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a class="btn_gg" id="bt_dl_'+gs.name+'" href="#" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-inline="true" style="background: #FF0000; color: #FFFFFF;">Delete</a></td>';
				}
				else {
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a class="btn_gg btn_dis" href="#" data-role="button" data-icon="minus" data-iconpos="notext" data-theme="a" data-inline="true">None</a></td>';
				}
				gameset_list_html += '</tr>';
			}
			// On constitue la liste des gamesets propre au périphérique
			for (i = 0; i < gamesets.length; i++) {
				gsp = gamesets[i];
				gs = getGameSet(gsp.name, gamesetHosted.gameset);
				if (gs == null) {
					gameset_list_html += '<tr>';
					gameset_list_html +=    '<td width="80%" style="text-align: left; border-bottom: 1px #282828 solid;  border-top: 1px #282828 solid;">'+$.ucfirst(gsp.name)+'</td>';
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-left: 1px #282828 solid; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a class="btn_gg btn_dis" href="#" data-role="button" data-icon="minus" data-iconpos="notext" data-theme="a" data-inline="true" >None</a></td>';
//					gameset_list_html +=	'<td width="10%" style="text-align: center; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a class="btn_gg" id="bt_dl_'+gsp.name+'" onclick="deleteGameset('+"'"+gsp.name+"'"+')" href="#" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-inline="true" style="background: #FF0000; color: #FFFFFF;">Delete</a></td>';
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a class="btn_gg" id="bt_dl_'+gsp.name+'" href="#" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-inline="true" style="background: #FF0000; color: #FFFFFF;">Delete</a></td>';
					gameset_list_html += '</tr>';
				}
			}	
			gameset_list_html += '</table>';
			$('#gamesets_list').html(gameset_list_html);
			$('.btn_gg').button();
			$('.btn_dis').addClass("ui-disabled");			
			$('#param_gameset_title').html(texte_gameset_titre[game_options.lang]);
			// ajouter les events
			for (i = 0; i < gamesetHosted.gameset.length; i++) {
				gs = gamesetHosted.gameset[i];
				gsp = getGameSet(gs.name, gamesets);
				// OK, MAJ, DOWNLOAD
				if (gsp == null) {
					$("#bt_dw_"+gs.name).on("tap", eventDwGs);
				}
				else if (gs.date == gsp.date) {
					$("#bt_dw_"+gs.name).on("tap", eventOkGs);
				}
				else {
					$("#bt_dw_"+gs.name).on("tap", eventUpGs);
				}
				// DELETE ?
				if (gsp != null) {
					$("#bt_dl_"+gs.name).on("tap", eventDlGs);
				}
			}
			for (i = 0; i < gamesets.length; i++) {
				gsp = gamesets[i];
				gs = getGameSet(gsp.name, gamesetHosted.gameset);
				if (gs == null) {
					$("#bt_dl_"+gsp.name).on("tap", eventDlGs);
				}
			}	
			$.mobile.changePage('#param-2', { transition: "none", changeHash: false, reloadPage: false, allowSamePageTransition: true });

		}).fail(function() {
			if ($('#param-2').css('display') == 'block' || $('#loading').css('display') == 'block') {
				$("#error_gs").html(texte_gameset_error[game_options.lang]);
				gameset_list_html = '<table class="ui-responsive table-stroke" style="width: 100%; border-collapse:collapse;">';
				// On constitue la liste des gamesets propre au périphérique
				for (i = 0; i < gamesets.length; i++) {
					gsp = gamesets[i];
					gameset_list_html += '<tr>';
					gameset_list_html +=    '<td width="80%" style="text-align: left; border-bottom: 1px #282828 solid;  border-top: 1px #282828 solid;">'+$.ucfirst(gsp.name)+'</td>';
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-left: 1px #282828 solid; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a class="btn_gg btn_dis" href="#" data-role="button" data-icon="minus" data-iconpos="notext" data-theme="a" data-inline="true" >None</a></td>';
					gameset_list_html +=	'<td width="10%" style="text-align: center; border-bottom: 1px #282828 solid; border-top: 1px #282828 solid;"><a class="btn_gg"  onclick="deleteGameset('+"'"+gsp.name+"'"+')" href="#" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-inline="true" style="background: #FF0000; color: #FFFFFF;">Delete</a></td>';
					gameset_list_html += '</tr>';
				}
				gameset_list_html += '</table>';
				$('#gamesets_list').html(gameset_list_html);
				$('#param_gameset_title').html(texte_gameset_titre[game_options.lang]);
				$('.btn_gg').button();
				$('.btn_dis').addClass("ui-disabled");
				$.mobile.changePage('#param-2', { transition: "none", changeHash: false, reloadPage: false, allowSamePageTransition: true });
			}
		});
//	}
//	else {
//		game_options.gameset = $('#game_gameset').val();
//	}
}

/**
 * recupère un gameset via son nom
 */  
function getGameSet(name, gslist) {
	var gs = null;
	for (j = 0; j < gslist.length; j++) {
		if (name == gslist[j].name) {
			gs = gslist[j];
			break;
		}
	}
	return gs;
}

/**
 * init gameset
 */
function initGamesets() {
	// Initialisation des parametres
	var _gameset = {
		"name": "toulouse",
		"description": "Gameset des monuments de Toulouse",
		"levels": 10,
		"price" : 0,
		"licence": "Creative Commons By Sa",
		"date" : "2014-02-05",
		"files": [
			"gameset",
			"gameset.css",
			"bg001_mairie_salle_des_illustres_480.jpg",
			"bg002_cite_de_l_espace_ariane_5_480.jpg",
			"bg003_canal_du_midi_480.jpg",
			"bg004_fontaine_de_la_place_wilson_480.jpg",
			"bg005_musee_les_augustins_480.jpg",
			"bg006_basilique_saint_sernin_480.jpg",
			"bg007_basilique_daurade_pont_saint_pierre_480.jpg",
			"bg008_place_du_capitole_480.jpg",
			"bg009_quai_de_tounis_480.jpg",
			"bg0010_museum_parc_histoire_naturelle_480.jpg"
		],
	    "embeddedcss" : ".sprite1 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg001_mairie_salle_des_illustres_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg002_cite_de_l_espace_ariane_5_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg003_canal_de_brienne_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg004_fontaine_de_la_place_wilson_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg005_musee_les_augustins_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg006_basilique_saint_sernin_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg007_basilique_daurade_pont_saint_pierre_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg008_place_du_capitole_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg009_quai_de_tounis_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg0010_museum_parc_histoire_naturelle_480.jpg'); background-repeat:no-repeat; }"
	};
	var _gameset2 = {
		"name": "to-upgrade",
		"description": "Gameset de test",
		"levels": 10,
		"price" : 0,
		"licence": "Creative Commons By Sa",
		"date" : "2014-01-10",
		"files": [
			"gameset",
			"gameset.css",
			"bg001_mairie_salle_des_illustres_480.jpg",
			"bg002_cite_de_l_espace_ariane_5_480.jpg",
			"bg003_canal_du_midi_480.jpg",
			"bg004_fontaine_de_la_place_wilson_480.jpg",
			"bg005_musee_les_augustins_480.jpg",
			"bg006_basilique_saint_sernin_480.jpg",
			"bg007_basilique_daurade_pont_saint_pierre_480.jpg",
			"bg008_place_du_capitole_480.jpg",
			"bg009_quai_de_tounis_480.jpg",
			"bg0010_museum_parc_histoire_naturelle_480.jpg"
		],
	    "embeddedcss" : ".sprite1 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg001_mairie_salle_des_illustres_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg002_cite_de_l_espace_ariane_5_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg003_canal_de_brienne_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg004_fontaine_de_la_place_wilson_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg005_musee_les_augustins_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg006_basilique_saint_sernin_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg007_basilique_daurade_pont_saint_pierre_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg008_place_du_capitole_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg009_quai_de_tounis_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg0010_museum_parc_histoire_naturelle_480.jpg'); background-repeat:no-repeat; }"
	};
	var _gameset3 = {
		"name": "my-own",
		"description": "Gameset des monuments de test",
		"levels": 10,
		"price" : 0,
		"licence": "Creative Commons By Sa",
		"date" : "2014-02-05",
		"files": [
			"gameset",
			"gameset.css",
			"bg001_mairie_salle_des_illustres_480.jpg",
			"bg002_cite_de_l_espace_ariane_5_480.jpg",
			"bg003_canal_du_midi_480.jpg",
			"bg004_fontaine_de_la_place_wilson_480.jpg",
			"bg005_musee_les_augustins_480.jpg",
			"bg006_basilique_saint_sernin_480.jpg",
			"bg007_basilique_daurade_pont_saint_pierre_480.jpg",
			"bg008_place_du_capitole_480.jpg",
			"bg009_quai_de_tounis_480.jpg",
			"bg0010_museum_parc_histoire_naturelle_480.jpg"
		],
	    "embeddedcss" : ".sprite1 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg001_mairie_salle_des_illustres_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg002_cite_de_l_espace_ariane_5_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg003_canal_de_brienne_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg004_fontaine_de_la_place_wilson_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg005_musee_les_augustins_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg006_basilique_saint_sernin_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg007_basilique_daurade_pont_saint_pierre_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg008_place_du_capitole_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg009_quai_de_tounis_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('file:///F:/Transfert/sdcard/drkslide/gameset/toulouse/bg0010_museum_parc_histoire_naturelle_480.jpg'); background-repeat:no-repeat; }"
	};
	gamesets.push(_gameset);
	gamesets.push(_gameset2);
	gamesets.push(_gameset3);
}

function downloadGS() {
	action_available = false;
	$('.btn_gg').addClass("ui-disabled");
	fileSystem.root.getDirectory(directoryName+'/'+gamesetDir+'/'+ungsname, {create: true, exclusive: false}, function() {
		gs = getGameSet(ungsname, gamesetHosted.gameset);
		if (gs != null) {
			dwprogress = 0;
			nbfiledw = gs.files.length;
			updateProgress();
			for (n = 0; n < nbfiledw; n++) {
				fileName = gs.files[n];
				downloadFile(fileName, ungsname);
			}
			thread_download = setInterval(function() {
				if (dwprogress >= nbfiledw) {
					clearInterval(thread_download);
					thread_download = null;
					gamesetDirectoryInit();
					thread_readgs = setInterval(function() {
						if (isGsReady()) {
							clearInterval(thread_readgs);
							thread_readgs = null;
							setTimeout(function() {
								$("#progress").html("");
								gamesetManagement();
								action_available = true;
							}, 1000);
						}
					}, 1000);
				}
			}, 1000);
		}
	}, 
	function() {
		if (navplay) {
			alert(texte_gameset_create_error[game_options.lang]+$.ucfirst(ungsname)+" !");
			action_available = true;
		}
		else {
			navigator.notification.alert(
				texte_gameset_create_error[game_options.lang]+$.ucfirst(ungsname)+" !",  // message
				errorGsAlert,     // callback
				'Error',       // title
				'Ok'              // buttonName
			);
		}
	});
}

/**
 * downloadGameset
 */
function downloadGameset(gsName, status) {
	if (action_available) {
		ungsname = gsName;
		message = texte_gameset_download[game_options.lang] + $.ucfirst(gsName) + " ?";
		if (status == "OK") {
			message = $.ucfirst(gsName) + texte_gameset_ajour[game_options.lang];
		}
		if (status == "UPG") {
			message = $.ucfirst(gsName) + texte_gameset_update[game_options.lang];
		}
		if (navplay) {
			if (confirm(message)) {
				downloadGS();
			}
		}
		else {
			navigator.notification.confirm(
				message,
				downloadConfirm,
				'Download',
				['Ok','Cancel']
			);
		}
	}
} 

function downloadConfirm(idx) {
	if (idx) downloadGS();
}

function errorGsAlert() {
	action_available = true;
}

function deleteGS() {
	action_available = false;
	game_options.gameset = "default";
	$('#default').attr('selected', "selected");
	$('.btn_gg').addClass("ui-disabled");
	fileSystem.root.getDirectory(directoryName+'/'+gamesetDir+'/'+ungsname, {create: true, exclusive: false}, function(direntry) {
		direntry.removeRecursively(function() {
			$('#game_gameset').selectmenu('refresh');
			gamesetDirectoryInit();
			thread_readgs = setInterval(function() {
				if (isGsReady()) {
					clearInterval(thread_readgs);
					thread_readgs = null;
					setTimeout(function() {
						gamesetManagement();
						action_available = true;
						ungsname = "";
					}, 1000);
				}
			}, 1000);
		}, function() {
			if (navplay) {
				alert(texte_gameset_delete_error[game_options.lang]+$.ucfirst(ungsname)+" !");
			}
			else {
				navigator.notification.alert(
					texte_gameset_delete_error[game_options.lang]+$.ucfirst(ungsname)+" !",  // message
					errorGsAlert,     // callback
					'Error',       // title
					'Ok'              // buttonName
				);
			}
		});
	}, 
	function() {
		if (navplay) {
			alert(texte_gameset_delete_error[game_options.lang]+$.ucfirst(ungsname)+" !");
		}
		else {
			navigator.notification.alert(
				texte_gameset_delete_error[game_options.lang]+$.ucfirst(ungsname)+" !",  // message
				errorGsAlert,     // callback
				'Error',       // title
				'Ok'              // buttonName
			);
		}
	});
}
/**
 * deleteGameset
 */
function deleteGameset(gsName) {
	if (action_available) {
		message = texte_gameset_delete[game_options.lang] + $.ucfirst(gsName) + " ?";
		ungsname = gsName;
		if (navplay) {
			if (confirm(message)) {
				deleteGS();
			}
		}
		else {
			navigator.notification.confirm(
				message,
				deleteConfirm,
				'Delete',
				['Ok','Cancel']
			);
		}
	}
}

function deleteConfirm(idx) {
	if (idx == 1) deleteGS();
}

/**
 * Fonction de téléchargement d'un fichier
 */ 
function downloadFile(fileName, gamesetName) {
/*
  	setTimeout(function(){
			dwprogress++;
			updateProgress();
	}, Math.floor((Math.random()*10)+1)*1000);
*/
	var fileTransfer = new FileTransfer();
	var uri = encodeURI(drkSlideUrl+"/gameset/"+gamesetName+"/"+fileName);
	var filePath = "/mnt/sdcard/drkslide/gameset/"+gamesetName+"/"+fileName;
	fileTransfer.download(
		uri,
		filePath,
		function(entry) {
			dwprogress++;
			updateProgress();
		},
		function(error) {
		//	alert("error: "+error.code); 
			console.log("DW Error: "+error.code);
			dwprogress=nbfiledw;
		},
		true,
		{
			headers: {
				"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		}
	);
}

/**
 * UpdateProgress()
 */
function updateProgress() {
	var val = Math.round(dwprogress/nbfiledw*100);
	if (val > 100) val = 100;
	$("#progress").html("<br/>"+val+"%<br/>");
}

/**
 * parseGamesets
 */ 
function parseGamesets(txt) {
	gl = txt.split('@');
	_gamesets = Array();
	for (n = 0; n < gl.length; n++) {
		gs = parseGameset(gl[n]);
		_gamesets.push(gs);
	}
	return _gamesets;
}
/**
 * parseGamesets
 */ 
function parseGameset(txt) {
	tab = txt.split('#');
	champs = tab[0].split(',');
	files = tab[1].split(',');
	_gs = { "name" : champs[0], "description" : champs[1], "levels" : champs[2], "price" : champs[3], "licence" : champs[4], "date" : champs[5], "files" : files}; 
	return _gs;
}
