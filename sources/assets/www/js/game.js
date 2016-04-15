/**
 * game.js : script du jeu drkSlide
 * 
 * @author : Philippe Bousquet <darken33@free.fr>
 * @date   : 05/2013
 * @version: 1.0
 * 
 * This software is under GNU General Public License
 */
var game_version  = "1.4";
var nb_level = 10;
var ready = false;
var popclosed = false;
var started = false;
var time_factor = 2;
var action_available = true;
/* Le jeu en mode facile */
var easy_tab = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[10,11,12]
];
var easy_cols = 3;
var easy_rows = 4;
var easy_depl = 60;
var easy_dsc = 10000;
var easy_tsc = 1000;

/* Le jeu en mode normal */
var normal_tab = [
	[1,2,3,4],
	[5,6,7,8],
	[9,10,11,12],
	[13,14,15,16],
	[17,18,19,20],
	[21,22,23,24]
];
var normal_cols = 4;
var normal_rows = 6;
var normal_depl = 180;
var normal_dsc = 100000;
var normal_tsc = 10000;

/* Le jeu en mode difficile */
var difficult_tab = [
	[1,2,3,4,5],
	[6,7,8,9,10],
	[11,12,13,14,15],
	[16,17,18,19,20],
	[21,22,23,24,25],
	[26,27,28,29,30],
	[31,32,33,34,35],
	[36,37,38,39,40]
];
var difficult_cols = 5;
var difficult_rows = 8;
var difficult_depl = 300;
var difficult_dsc = 1000000;
var difficult_tsc = 100000;

/* Variables utiles pendant la partie */
var nb_deplacement = 0;
var heure_debut = 0;
var nb_cols = normal_cols;
var nb_rows = normal_rows;
var max_value = nb_cols * nb_rows;
var tab = normal_tab;
var lvl = Math.floor((Math.random()*nb_level)+1); 
var ingame = false;
var xfactor = 0;
var yfactor = 0;
	
(function($) {

    $.ucfirst = function(str) {

        var text = str;


        var parts = text.split(' '),
            len = parts.length,
            i, words = [];
        for (i = 0; i < len; i++) {
            var part = parts[i];
            var first = part[0].toUpperCase();
            var rest = part.substring(1, part.length);
            var word = first + rest;
            words.push(word);

        }

        return words.join(' ');
    };

})(jQuery);
		 
/**
 * isCompleted() - vérifie que le tableau est fini
 */  			
function isCompleted(tab) {
	n = max_value;
	res = true;
	for (i = nb_rows; i > 0 ; i--) {
		for (j = nb_cols; j > 0; j--) {
			res = (res && tab[i-1][j-1] == n);
			if (tab[i-1][j-1] != n--) return res;  
		}	
	}
	return res;
}

/**
 * initTable() - réinitialise le tableau
 */ 
function initTable(tab) {
	n = 1;
	for (i = 0; i < nb_rows; i++) {
		for (j = 0; j < nb_cols; j++) {
			tab[i][j] = n++;
		}	
	}
	return tab;
}
 
/**
 * melangeTable() - permet de m"langer le tableau
 */ 
function melangeTable(tab_) {
	for (i=0; i < nb_rows; i++) {
		for (j=0; j < nb_cols; j++) {
			if (tab[i][j] == max_value) {
				r = Math.floor(Math.random()*4);
				if ((r == 0 && i < nb_rows - 1) || (r == 1 && i == 0)) {
					tab[i][j] = tab[i+1][j];
					tab[i+1][j] = max_value;
				}
				if ((r == 1 && i > 0)  || (r == 0 && i == nb_rows - 1)) {
					tab[i][j] = tab[i-1][j];
					tab[i-1][j] = max_value;
				}
				if ((r == 2 && j < nb_cols - 1)  || (r == 3 && j == 0)) {
					tab[i][j] = tab[i][j+1];
					tab[i][j+1] = max_value;
				}
				if ((r == 3 && j > 0)  || (r == 2 && j == nb_cols - 1)) {
					tab[i][j] = tab[i][j-1];
					tab[i][j-1] = max_value;
				}
				break;
			}
		}
	}
	return tab;
}

/**
 * redraw() - dessine le tableau
 */  
function redraw() {
	var xo, yo;
	for (i = 0; i < nb_rows; i++) {
		for (j = 0; j < nb_cols; j++) {
			if (tab[i][j] != max_value) {
			    id = i+'.'+j;
			    y = (Math.floor((tab[i][j]-1) / nb_cols) * Math.floor(yfactor*difficult_rows/nb_rows));
			    x = ((tab[i][j] -1) % nb_cols) * Math.floor(xfactor*difficult_cols/nb_cols);
			    if (x > 0) x = 0;
//				$('#'+id).html('<div id="drag'+tab[i][j]+'" class="sprite'+lvl+' sprite-size d'+difficulty+'" draggable="false" ondragstart="drag(event)" width="100%" height="100%" style="line-height:'+Math.abs(yfactor*difficult_rows/nb_rows)+'px; margin: 0; background-position: '+x+'px '+y+'px;">'+tab[i][j]+'</div>');							
				document.getElementById(id).innerHTML = '<div id="drag'+tab[i][j]+'" class="sprite sprite'+lvl+' sprite-size d'+game_options.difficulty+'" draggable="false" ondragstart="drag(event)" width="100%" height="100%" style="line-height:'+Math.abs(yfactor*difficult_rows/nb_rows)+'px; margin: 0; background-position: '+x+'px '+y+'px;">'+tab[i][j]+'</div>';							
			}
			else {
				xo = i;
				yo = j;
			}
		}
	}
	// On autorise les dalles à bouger
	$('.sprite').unbind("tap");
    id = xo+'.'+yo;
//	$('#'+id).html('');							
	document.getElementById(id).innerHTML = '';							
	if (xo < nb_rows - 1) {
		$('#drag'+tab[xo+1][yo]).bind("tap", function(event) {
			event.preventDefault();
			change((xo+1),yo,xo,yo);
		});	
	}
	if (xo > 0) {
		$('#drag'+tab[xo-1][yo]).bind("tap", function(event) {
			event.preventDefault();
			change((xo-1),yo,xo,yo);
		});	
	}
	if (yo < nb_cols) { 
		$('#drag'+tab[xo][yo+1]).bind("tap", function(event) {
			event.preventDefault();
			change(xo,(yo+1),xo,yo);
		});	
	}
	if (yo > 0) {
		$('#drag'+tab[xo][yo-1]).bind("tap", function(event) {
			event.preventDefault();
			change(xo,(yo-1),xo,yo);
		});	
	}
}

/**
 * change() - déplacer une tile
 */ 			
function change(i,j, xo, yo){
	tab[xo][yo] = tab[i][j];
	tab[i][j]=max_value;
	nb_deplacement++;
	if (game_options.soundactive) m_clac.play();
	redraw();
	if (isCompleted(tab)) {
		stopChrono();
		var duree = getChronoString();
		scored = ((game_options.difficulty == 1 ? easy_depl : (game_options.difficulty == 2 ? normal_depl : difficult_depl)) / nb_deplacement);
		scored = Math.floor(scored * (game_options.difficulty == 1 ? easy_dsc : (game_options.difficulty == 2 ? normal_dsc : difficult_dsc)));
		scoret = (game_options.difficulty == 1 ? easy_depl : (game_options.difficulty == 2 ? normal_depl : difficult_depl)) * time_factor / getChrono();
		scoret = Math.floor(scoret * (game_options.difficulty == 1 ? easy_tsc : (game_options.difficulty == 2 ? normal_tsc : difficult_tsc)));
		var score = scored + scoret;  
		drawWin();
		$("td").removeClass("tdingame");
		$("#grille").css("margin-left", "auto");
		$("#grille").css("margin-top", "auto");
		updateHighscore(nb_deplacement, duree, score);
		if (game_options.sharescore) {
			service(nb_deplacement, duree, score);
		}
		if (game_options.soundactive) m_yeah.play();
		alert(texte_welldone[game_options.lang]+nb_deplacement+texte_welldone_moves[game_options.lang]+duree+texte_welldone_score[game_options.lang]+score);
		setTimeout(function () { 	
			fillHighscoreLocHtml(nb_deplacement, duree, score);
		}, 3000);				
	}
}			

/**
 * startGame() - demarer la partie
 */
function startGame() {
	ingame = true;
	nb_deplacement = 0;
	startChrono();
	tab = initTable(tab);
	for (n = 0; n < 1000; n++) {
		tab = melangeTable(tab);
	}	
	if (game_options.soundactive) m_melange.play();
	$("td").addClass("tdingame");
	if (($(window).width() != 768) && ($(window).width() != 600) && ($(window).width() != 480) && ($(window).width() != 320) && ($(window).width() != 240) && ($(window).width() != 160)) {
		$("#grille").css("margin-left", "-"+(nb_cols+1)+"px");
		$("#grille").css("margin-top", "-"+(nb_rows+1)+"px");
	}
	redraw();
}

/**
 * drawWin() - Afficher l'image lorsque la partie est finie
 */ 
function drawWin() {
	for (i = 0; i < nb_rows; i++) {
		for (j = 0; j < nb_cols; j++) {
			id = i+'.'+j;
		    y = (Math.floor((tab[i][j]-1) / nb_cols) * Math.floor(yfactor*difficult_rows/nb_rows));
		    x = ((tab[i][j] -1) % nb_cols) * Math.floor(xfactor*difficult_cols/nb_cols);
			if (x > 0) x = 0;
//			$('#'+id).html('<div id="drag'+tab[i][j]+'" class="sprite'+lvl+' sprite-size d'+difficulty+'" draggable="false" ondragstart="drag(event)" width="100%" height="100%" style="margin: 0; background-position: '+x+'px '+y+'px;">&nbsp;</div>');							
			document.getElementById(id).innerHTML = '<div id="drag'+tab[i][j]+'" class="sprite'+lvl+' sprite-size d'+game_options.difficulty+'" draggable="false" ondragstart="drag(event)" width="100%" height="100%" style="margin: 0; background-position: '+x+'px '+y+'px;">&nbsp;</div>';							
		}
	}
}

/**
 * levelUp() - tableau suivant
 */ 
function levelUp() {
	if ($("#menu").is(':visible')) {
		$("#menu").hide();
	}
	else if (!ingame) {
		if (lvl == nb_level) lvl = 1;
		else lvl++;
		drawFirst();
	}
}

/**
 * levelDown() - tableau précédent
 */
function levelDown() {
	if ($("#menu").is(':visible')) {
		$("#menu").hide();
	}
	else if (!ingame) {
		if (lvl == 1) lvl = nb_level;
		else lvl--;
		drawFirst();
	}
}

/**
 * levelRandom() - selectionne un tableau au hasard
 */
function levelRandom(d) {
	initGrille(d);
	ingame=false;
	lvl = Math.floor((Math.random()*nb_level)+1); 
	if ($('#game').css('display') != 'block') {
		$.mobile.changePage('#game', 'none', true, true);
	}
	drawFirst();
}
function levelRandom2(d) {
	initGrille(d);
	ingame=false;
	lvl = Math.floor((Math.random()*nb_level)+1); 
	drawFirst();
}

/**
 * drawFirst() - Afficher le tableau + le titre du jeu
 */ 
function drawFirst() {
	
	if (game_options.difficulty == 3) {
		tab = difficult_tab;
		nb_cols = difficult_cols;
		nb_rows = difficult_rows;
	}
	else if (game_options.difficulty == 2) {
		tab = normal_tab;	
		nb_cols = normal_cols;
		nb_rows = normal_rows;
	}
	else {
		tab = easy_tab;
		nb_cols = easy_cols;
		nb_rows = easy_rows;
	}	
	if (game_options.gameset != "default") {
		mongs = getGameSet(game_options.gameset, gamesets);
		if (mongs != null) {
			$("#style").html(mongs.embeddedcss);
		}
		else {
			$("#style").html("");
		}
	}
	else {
		$("#style").html("");
	}
	tab = initTable(tab);
	max_value = nb_cols * nb_rows;	
	ingame = false;
	for (i = 0; i < nb_rows; i++) {
		for (j = 0; j < nb_cols; j++) {
		    id = i+'.'+j;
		    y = (Math.floor((tab[i][j]-1) / nb_cols) * Math.floor(yfactor*difficult_rows/nb_rows));
		    x = ((tab[i][j] -1) % nb_cols) * Math.floor(xfactor*difficult_cols/nb_cols);
		    if (x > 0) x = 0;
	//		$('#'+id).html('<div id="drag'+tab[i][j]+'" class="sprite'+lvl+' sprite-size d'+game_options.difficulty+'" draggable="false" ondragstart="drag(event)" width="100%" height="100%" style="margin: 0; background-position: '+x+'px '+y+'px;">&nbsp;</div>');							
			document.getElementById(id).innerHTML = '<div id="drag'+tab[i][j]+'" class="sprite'+lvl+' sprite-size d'+game_options.difficulty+'" draggable="false" ondragstart="drag(event)" width="100%" height="100%" style="margin: 0; background-position: '+x+'px '+y+'px;">&nbsp;</div>';							
		}
	}
}

/**
 * onBackButton() - bouton back pressé
 */ 
function onBackButton() {
	if (action_available) {
		if ($("#menu").is(':visible')) {
			$("#menu").hide();
		}
		else { 
			if ($('#param-2').css('display') == 'block') {
				param();
			}
			else if ($('#param-1').css('display') == 'block') {
				updateParam();
				$(".title").show();
				$(".title2").show();
				ingame = false;
				levelRandom(game_options.difficulty);
				$.mobile.changePage('#game', 'none', true, true);
			}	
			else if ($('#hsc_local').css('display') == 'block') {
				quithscl();
			}
			else if ($('#hsc_internet').css('display') == 'block') {
				quithsci();
			}
			else if ($('#game').css('display') != 'block') {
				$.mobile.changePage('#game', 'none', true, true);
			}
			else {
				if (!ingame) {
					quit();
				}
				else {
					$(".title2").show();
					refreshTitle();
					$("td").removeClass("tdingame");
					$("#grille").css("margin-left", "auto");
					$("#grille").css("margin-top", "auto");
				}
			}
		}	
	}
}
/**
 * onMenuButton() - bouton menu pressé
 */ 
function onMenuButton() {
	if (action_available) {
		if ($('#game').css('display') == 'block' && !$("#splash").is(':visible')) {
			if ($("#menu").is(':visible')) {
				$("#menu").hide();
			} 
			else {
				$('#menu').show();
			}
		}
	}
}    

/**
 * closeMenu() - fermer le menu
 */     
function  closeMenu() {
	if ($("#menu").is(':visible')) {
		$("#menu").hide();
	}
	else if (!ingame) {
		$("#menu").show();
	}
}

/**
 * start() - demarrer
 */ 
function start() {
	if ($("#menu").is(':visible')) {
		$("#menu").hide();
	}
	if (!ingame && $("#game").is(':visible') && !$("#splash").is(':visible')) {
		$('#loadnew').hide();
		$('#msgnew').hide();
		$(".title").hide();
		$(".title2").hide();
		started = true;
		startGame();
	}
	if ($("#splash").is(':visible')) {
		$("#splash").hide();
	}
}

/**
 * quit() - quitter le jeu
 */ 
function quit() {
	if ($("#menu").is(':visible')) {
		$("#menu").hide();
	}
	if (confirm(texte_alert_quitter[game_options.lang])) {
		navigator.app.exitApp();
	}
}

/**
 * aide() - afficher la page d'aide
 */ 
function aide() {
	$("#help_subtitle").html(texte_sous_titre[game_options.lang]);
	$("#help_content").html(texte_aide_content[game_options.lang]);
	$.mobile.changePage('#aide-1', 'none', true, true);
}

function loading() {
	$.mobile.changePage('#loading', 'none', true, true);
}

/**
 * param() - afficher la page des paramètres
 */ 
function param() {
	$('#txt_param').html(texte_param_title[game_options.lang]);
	game_lang = '<option value="fr" '+(game_options.lang == "fr" ? 'selected="selected"' : '')+'>'+texte_option_langue_fr[game_options.lang]+'</option>';
	game_lang += '<option value="en" '+(game_options.lang == "en" ? 'selected="selected"' : '')+'>'+texte_option_langue_en[game_options.lang]+'</option>';
	$('#l_game_lang').html(texte_option_langage[game_options.lang]);
	$('#game_lang').html(game_lang).selectmenu().selectmenu("refresh");
	game_diff = '<option value="1" '+(game_options.difficulty == 1 ? 'selected="selected"' : '')+'>'+texte_difficulte_facile[game_options.lang]+'</option>';
	game_diff += '<option value="2" '+(game_options.difficulty == 2 ? 'selected="selected"' : '')+'>'+texte_difficulte_moyen[game_options.lang]+'</option>';
	game_diff += '<option value="3" '+(game_options.difficulty == 3 ? 'selected="selected"' : '')+'>'+texte_difficulte_difficile[game_options.lang]+'</option>';
	$('#l_game_level').html(texte_niveau[game_options.lang]);
	$('#game_level').html(game_diff).selectmenu().selectmenu("refresh");
	$('#l_game_player').html(texte_nom[game_options.lang]);
	$('#game_player').val(game_options.playername);
	var game_set = '<option id="default" value="default">'+texte_gameset_default[game_options.lang]+'</option>';
	for (i=0; i < gamesets.length; i++) {
		nm = gamesets[i].name;
		game_set += '<option id="'+nm+'" value="'+nm+'">'+$.ucfirst(nm)+'</option>';
	}
	$('#l_game_gameset').html(texte_gameset[game_options.lang]);
	$("#game_gameset").html(game_set);
	$('#'+game_options.gameset).attr('selected', "selected");
	$("#game_gameset").selectmenu().selectmenu("refresh");	
	$('#l_btn_gerer').html(texte_gameset_gerer[game_options.lang]);
	$('#l_options').html(texte_options[game_options.lang]);
	$('#l_game_help').html(texte_option_aide[game_options.lang]);
	$('#l_game_sound').html(texte_option_sons[game_options.lang]);
	$('#l_game_score').html(texte_option_share[game_options.lang]);
	if (game_options.helponstart) $('#game_help').attr('checked', true);
	if (game_options.soundactive) $('#game_sound').attr('checked', true);
	if (game_options.sharescore) $('#game_score').attr('checked', true);
	$('#game_sound').checkboxradio().checkboxradio("refresh");
	$('#game_help').checkboxradio().checkboxradio("refresh");
	$('#game_score').checkboxradio().checkboxradio("refresh");
	$.mobile.changePage('#param-1', 'none', true, true);
}

/**
 * param() - afficher la page des paramètres
 */ 
function updateParam() {
	game_options.lang = $('#game_lang').val();
	game_options.difficulty = $('#game_level').val();
	game_options.playername = $('#game_player').val(); 
	game_options.helponstart = ($('#game_help').attr('checked') == "checked");
	game_options.soundactive = ($('#game_sound').attr('checked') == "checked");
	game_options.sharescore = ($('#game_score').attr('checked') == "checked");
	game_options.gameset = $('#game_gameset').val();
	writeOptions();
	updateMenu();
}

function updateMenu() {
	$('#m_txt_jouer').html(texte_menu_jouer[game_options.lang]);
	$('#m_txt_param').html(texte_menu_param[game_options.lang]);
	$('#m_txt_aide').html(texte_menu_aide[game_options.lang]);
	$('#m_txt_quitter').html(texte_menu_quitter[game_options.lang]);
	$('#main_text_subtitle').html(texte_sous_titre[game_options.lang]);
}

/**
 * unbindGame() - supprimer la gestion des evenements
 */ 
function unbindGame() {
	$("#game").off("swiperight");
	$("#game").off("swipeleft");
	$("#game").off("taphold");
	$("#lvldown").off("tap");	
	$("#lvlup").off("tap");	
	$("#btngo").off("tap");
}

/**
 * bindGame() - gestion des evenements sur l'ecran
 */ 
function bindGame() {
	unbindGame();
	$("#game").on("swiperight", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if ($('#game').css('display') == 'block') levelDown();
	});	
	$("#game").on("swipeleft", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if ($('#game').css('display') == 'block') levelDown();
	});	
/*	
	$("#game").on("taphold", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if (!ingame && popclosed) closeMenu();
	});	
*/ 
	$("#menub").on("tap", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if (popclosed) closeMenu();
	});	
	$("#lvldown").on("taphold", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if ($('#game').css('display') == 'block') levelDown();
	});	
	$("#lvldown").on("tap", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if ($('#game').css('display') == 'block') levelDown();
	});	
	$("#lvlup").on("taphol", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if ($('#game').css('display') == 'block') levelDown();
	});	
	$("#lvlup").on("tap", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if ($('#game').css('display') == 'block') levelDown();
	});	
	$("#btngo").on("taphold", function(event) {
		event.preventDefault();
		event.stopPropagation();
		start();
	});
	$("#btngo").on("tap", function(event) {
		event.preventDefault();
		event.stopPropagation();
		start();
	});
}

/**
 * bindMenu() - gestion des evenements du menu
 */ 
function bindMenu() {
	$("#mstart").on("tap", function(event) {
		event.preventDefault();
		event.stopPropagation();
		start();
		closeMenu();
	});
	$("#mparam").on("tap", function(event) {
		event.preventDefault();
		event.stopPropagation();
		param();
		closeMenu();
	});
	$("#mhelp").on("tap", function(event) {
		event.preventDefault();
		event.stopPropagation();
		aide(); 
		closeMenu();
	});
	$("#mquit").on("tap", function(event) {
		event.preventDefault();
		event.stopPropagation();
		quit(); 
	});
}

/**
 * initiailsation du jeu
 */ 
function init() {
	//$.mobile.changePage('#loading', 'none', true, true);
	ready=false;
	popclosed=false;
	$(".title2").hide();
	document.addEventListener("deviceready", onDeviceReady, true);		
	// forcer le device ready au bout de 5 secondes
	setTimeout(onDeviceReady, 5000);
}

/**
 * phoneGap ready
 */ 
var onDeviceReady = function() {
	if (!ready) {
		document.addEventListener("backbutton", onBackButton, true);
		document.addEventListener("menubutton", onMenuButton, true);
		$('#msgnew').hide();
		$('#loadnew').hide();
		initFileSystem();
		loadSounds();
		n=0;
		do {
			updateWidth();
			n++;
		} while (!(isFsReady() && isGsReady())  && n < 5000)
		if (n == 5000) {
			new_install = true;
			initOptions();
			initHighscores();	
		}
		gamesetLastUpdate();
		updateMenu();
		refreshTitle(); 
		$.mobile.changePage('#game', 'none', true, true);
		bindGame();	
		bindMenu();	
		ready = true;
	}
};

/**
 * initGrille() - initialise la grille
 */
function initGrille(d) {
	if (d == 3) {
		document.getElementById("canvas").innerHTML = ''
//		$("#canvas").html(''
			+ '<table id="grille" cellspacing="0" cellpadding="0">'
			+	'<tbody>'
			+		'<tr><td class="d3" id="0.0"></td><td class="d3" id="0.1"></td><td class="d3" id="0.2"></td><td class="d3" id="0.3"></td><td class="d3" id="0.4"></td></tr>'
			+		'<tr><td class="d3" id="1.0"></td><td class="d3" id="1.1"></td><td class="d3" id="1.2"></td><td class="d3" id="1.3"></td><td class="d3" id="1.4"></td></tr>'
			+		'<tr><td class="d3" id="2.0"></td><td class="d3" id="2.1"></td><td class="d3" id="2.2"></td><td class="d3" id="2.3"></td><td class="d3" id="2.4"></td></tr>'
			+		'<tr><td class="d3" id="3.0"></td><td class="d3" id="3.1"></td><td class="d3" id="3.2"></td><td class="d3" id="3.3"></td><td class="d3" id="3.4"></td></tr>'
			+		'<tr><td class="d3" id="4.0"></td><td class="d3" id="4.1"></td><td class="d3" id="4.2"></td><td class="d3" id="4.3"></td><td class="d3" id="4.4"></td></tr>'
			+		'<tr><td class="d3" id="5.0"></td><td class="d3" id="5.1"></td><td class="d3" id="5.2"></td><td class="d3" id="5.3"></td><td class="d3" id="5.4"></td></tr>'
			+		'<tr><td class="d3" id="6.0"></td><td class="d3" id="6.1"></td><td class="d3" id="6.2"></td><td class="d3" id="6.3"></td><td class="d3" id="6.4"></td></tr>'
			+		'<tr><td class="d3" id="7.0"></td><td class="d3" id="7.1"></td><td class="d3" id="7.2"></td><td class="d3" id="7.3"></td><td class="d3" id="7.4"></td></tr>'
			+	'</tbody>'	
			+ '</table>'; //);
	}
	else if (d == 2) {
		document.getElementById("canvas").innerHTML = ''
//		$("#canvas").html(''
			+ '<table id="grille" cellspacing="0" cellpadding="0">'
			+	'<tbody>'
			+		'<tr><td class="d2" id="0.0"></td><td class="d2" id="0.1"></td><td class="d2" id="0.2"></td><td class="d2" id="0.3"></td></tr>'
			+		'<tr><td class="d2" id="1.0"></td><td class="d2" id="1.1"></td><td class="d2" id="1.2"></td><td class="d2" id="1.3"></td></tr>'
			+		'<tr><td class="d2" id="2.0"></td><td class="d2" id="2.1"></td><td class="d2" id="2.2"></td><td class="d2" id="2.3"></td></tr>'
			+		'<tr><td class="d2" id="3.0"></td><td class="d2" id="3.1"></td><td class="d2" id="3.2"></td><td class="d2" id="3.3"></td></tr>'
			+		'<tr><td class="d2" id="4.0"></td><td class="d2" id="4.1"></td><td class="d2" id="4.2"></td><td class="d2" id="4.3"></td></tr>'
			+		'<tr><td class="d2" id="5.0"></td><td class="d2" id="5.1"></td><td class="d2" id="5.2"></td><td class="d2" id="5.3"></td></tr>'
			+	'</tbody>'	
			+ '</table>'; //);
	}
	else {
		document.getElementById("canvas").innerHTML = ''
//		$("#canvas").html(''
			+ '<table id="grille" cellspacing="0" cellpadding="0">'
			+	'<tbody>'
			+		'<tr><td class="d1" id="0.0"></td><td class="d1" id="0.1"></td><td class="d1" id="0.2"></td></tr>'
			+		'<tr><td class="d1" id="1.0"></td><td class="d1" id="1.1"></td><td class="d1" id="1.2"></td></tr>'
			+		'<tr><td class="d1" id="2.0"></td><td class="d1" id="2.1"></td><td class="d1" id="2.2"></td></tr>'
			+		'<tr><td class="d1" id="3.0"></td><td class="d1" id="3.1"></td><td class="d1" id="3.2"></td></tr>'
			+	'</tbody>'	
			+ '</table>'; //);
	}
} 

function popup() {
	header = '<div data-role="header"><h2>'+texte_aide_title[game_options.lang]+'</h2></div>',
	closebtn = "",
	popup = '';	
	if (xfactor >= -48) {
		popup = '<div data-role="popup" id="splash" class="popup" data-short="Comment Jouer ?" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15" style="background: #a0a0a0;">' + closebtn + header +
				texte_popup_mini[game_options.lang] + 
				'</div>';
	}
	else if (xfactor == -64) {
		popup = '<div data-role="popup" id="splash" class="popup" data-short="Comment Jouer ?" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15" style="background: #a0a0a0;">' + closebtn + header +
				texte_popup_normal[game_options.lang] + 
				'</div>';
	}
	else {
		popup = '<div data-role="popup" id="splash" class="popup" data-short="Comment Jouer ?" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15" style="background: #a0a0a0; top: 30%; bottom: 30%; left: 15%; right: 15%;">' + closebtn + header +
				texte_popup_grand[game_options.lang] + 
				'</div>';	
	}

	// Create the popup. Trigger "pagecreate" instead of "create" because currently the framework doesn't bind the enhancement of toolbars to the "create" event (js/widgets/page.sections.js).
	$.mobile.activePage.append( popup ).trigger( "pagecreate" );
	// Wait with opening the popup until the popup image has been loaded in the DOM.
	// This ensures the popup gets the correct size and position
	// Fallback in case the browser doesn't fire a load event
	var fallback = setTimeout(function() {
		$("#game").bind("tap", function(event) {
			event.preventDefault();
			closepop();
		});
		$( "#splash").show();
	}, 1000);
}

function updateWidth() {
	if ($(window).width() == 0) {
		setTimeout(function() {
			updateWidth();
		}, 250);
	}
	else if ($(window).width() < 240) {
		if (xfactor != -32) {
			xfactor = -32;
			yfactor = -30;
		}
	}
	else if ($(window).width() < 320) {
		if (xfactor != -48) {
			xfactor = -48;
			yfactor = -45;
		}
	}
	else if ($(window).width() < 480) {
		if (xfactor != -64) {
			xfactor = -64;
			yfactor = -60;
		}
	}
	else if ($(window).width() < 600) {
		if (xfactor != -96) {
			xfactor = -96;
			yfactor = -80;
		}
	} 
	else if ($(window).width() < 768) {
		if (xfactor != -120) {
			xfactor = -120;
			yfactor = -100;
		}
	}
	else {
		if (xfactor != -153) {
			xfactor = -153;
			yfactor = -128;
		}
	}
}

function closepop() {
	$("#splash").hide();
	$(".title2").show();
	$('#game').unbind('tap');
	startWatch();
	popclosed = true;
	if (new_install) {
		param();
	}
}

function refreshTitle() {
	$(".title").show();
	levelRandom(game_options.difficulty);
	if (!popclosed) {
		if (game_options.helponstart) {
			popup();
		} 
		else {
			$(".title2").show();
			$('#game').unbind('tap');
			startWatch();
			popclosed = true;
		}	
	}	
} 
