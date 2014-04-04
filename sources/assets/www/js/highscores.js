
function updateHighscore(nbdep, duree, score) {
	var tabscores = (game_options.difficulty == 1 ?
		game_highscores.facile : (game_options.difficulty == 2 ?
		game_highscores.moyen : game_highscores.difficile));
	var i=0;
	for (i=0; (i < 10 && tabscores[i].score > score); i++);
	if (i<9) {
		for (j=9; j>i; j--) {
			tabscores[j].name = tabscores[j-1].name;
			tabscores[j].depl = tabscores[j-1].depl;
			tabscores[j].time = tabscores[j-1].time;
			tabscores[j].score = tabscores[j-1].score;
		}
	}	
	if (i<10) {
		tabscores[i].name = game_options.playername;
		tabscores[i].depl = nbdep;
		tabscores[i].time = duree;
		tabscores[i].score = score;
	}
	if (game_options.difficulty == 1) {
		game_highscores.facile = tabscores;
	}
	else if (game_options.difficulty == 2) {
		game_highscores.moyen = tabscores;
	}
	else {
		game_highscores.difficile = tabscores;
	}
	writeHighscores();
}

function fillHighscoreLocHtml(nbdep, duree, score) {
	document.getElementById("hst_loc").innerHTML = texte_meilleur_score_local[game_options.lang] + (game_options.difficulty == 1 ? texte_difficulte_facile[game_options.lang] : (game_options.difficulty == 2 ? texte_difficulte_moyen[game_options.lang] : texte_difficulte_difficile[game_options.lang]));
	var tableScore = "<tr><th>#</th><th>"+texte_hsc_nom[game_options.lang]+"</th><th>"+texte_hsc_depl[game_options.lang]+"</th><th>"+texte_hsc_time[game_options.lang]+"</th><th>"+texte_hsc_score[game_options.lang]+"</th></tr>";
	var tabscores = (game_options.difficulty == 1 ? game_highscores.facile : (game_options.difficulty == 2 ? game_highscores.moyen : game_highscores.difficile));
	for (i=0; i<10; i++) {
		cl = ((tabscores[i].name == game_options.playername &&
			   tabscores[i].depl == nbdep &&
			   tabscores[i].time == duree &&
			   tabscores[i].score == score) ? "hlg" : "");
		if (tabscores[i].name == "-" &&
			   tabscores[i].depl == 9999 &&
			   tabscores[i].time == "999:59" &&
			   tabscores[i].score == 0) {
			tableScore += '<tr><td style="text-align: right;" class="'+cl+'">'+(i+1)+'.</td>' +
					'<td style="text-align: left;" class="'+cl+'">-</td>' +
					'<td style="text-align: right;" class="'+cl+'">-</td>' +
					'<td style="text-align: right;" class="'+cl+'">-</td>'+
					'<td style="text-align: right;" class="'+cl+'">-</td></tr>';
		}	
		else {   
			tableScore += '<tr><td style="text-align: right;" class="'+cl+'">'+(i+1)+'.</td>' +
					'<td style="text-align: left;" class="'+cl+'">'+tabscores[i].name+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[i].depl+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[i].time+'</td>'+
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[i].score+'</td></tr>';
		}
	}
	document.getElementById("hsc_loc").innerHTML = tableScore;
	$.mobile.changePage('#hsc_local', 'none', true, true); 	
}

function quithscl() {
	$(".title").show();
	$(".title2").show();
	ingame = false;
	drawFirst();
	if (game_options.sharescore) {
		$.mobile.changePage('#hsc_internet', 'none', true, true); 	
	}
	else {
		$.mobile.changePage('#game', 'none', true, true); 	
	}	
}

function quithsci() {
	$(".title").show();
	$(".title2").show();
	ingame = false;
	drawFirst();
	$.mobile.changePage('#game', 'none', true, true); 	
}

function service(nbdep, duree, score) {
	var tableScore = "<tr><td>"+texte_loading[game_options.lang]+"</td></tr>";
	document.getElementById("hst_int").innerHTML = texte_meilleur_score_mondial[game_options.lang] + (game_options.difficulty == 1 ? texte_difficulte_facile[game_options.lang] : (game_options.difficulty == 2 ? texte_difficulte_moyen[game_options.lang] : texte_difficulte_difficile[game_options.lang]));
	document.getElementById("hsc_int").innerHTML = tableScore;
	var key = "f86c9d12e8c7eb2e6adc1c03738a1cc9";
	var difficulty = game_options.difficulty;
	var name = game_options.playername;
	var depl = nbdep;
	var time = duree;
	var score = score;
	var url = "http://darken33.free.fr/drkslide/services/rest_service.php?key="+key+"&difficulty="+difficulty+"&name="+name+"&depl="+depl+"&time="+time+"&score="+score;
	$.getJSON(url, function(data) {
		fillHighscoreIntHtml(data);
	}).fail(function() { 
		var tableScore = '<tr><td style="color: #FF0000">'+texte_erreur_chargement_score[game_options.lang]+'</td></tr>';
		document.getElementById("hsc_int").innerHTML = tableScore;
	});
}		

function fillHighscoreIntHtml(data) {
	document.getElementById("hst_int").innerHTML = texte_meilleur_score_mondial[game_options.lang] + (game_options.difficulty == 1 ? texte_difficulte_facile[game_options.lang] : (game_options.difficulty == 2 ? texte_difficulte_moyen[game_options.lang] : texte_difficulte_difficile[game_options.lang]));
	var tableScore = "<tr><th>#</th><th>"+texte_hsc_nom[game_options.lang]+"</th><th>"+texte_hsc_depl[game_options.lang]+"</th><th>"+texte_hsc_time[game_options.lang]+"</th><th>"+texte_hsc_score[game_options.lang]+"</th></tr>";
	var tabscores = data;
	for (i=0; i<10; i++) {
		if (i < tabscores.length) {
			cl = (tabscores[i].isplayer == 1 ? "hlg" : "");
			tableScore += '<tr><td style="text-align: right;" class="'+cl+'">'+tabscores[i].pos+'.</td>' +
					'<td style="text-align: left;" class="'+cl+'">'+tabscores[i].name+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[i].depl+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[i].time+'</td>'+
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[i].score+'</td></tr>';
		}
		else {
			tableScore += '<tr><td style="text-align: right;" >'+(i+1)+'.</td>' +
					'<td style="text-align: left;" >-</td>' +
					'<td style="text-align: right;" >-</td>' +
					'<td style="text-align: right;" >-</td>'+
					'<td style="text-align: right;" >-</td></tr>';
		}
	}
	if (tabscores.length == 11) {
		tableScore += '<tr><td style="text-align: center;" colspan="5">...</td></tr>';
		cl = "hlg";
		tableScore += '<tr><td style="text-align: right;" class="'+cl+'">'+tabscores[10].pos+'.</td>' +
					'<td style="text-align: left;" class="'+cl+'">'+tabscores[10].name+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[10].depl+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[10].time+'</td>'+
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[10].score+'</td></tr>';
	}
	document.getElementById("hsc_int").innerHTML = tableScore;
}
