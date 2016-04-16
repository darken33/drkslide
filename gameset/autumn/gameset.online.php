<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("../../services/json_utils.php");
 include("../../services/http_response_code.php");
 $list = Array(
    'name'=>"autumn",
    'description'=>"Autumn Photos",
    'levels'=>10,
    'price'=>0,
    'licence'=>"Creative Commons By Sa",
	'date'=>"2014-09-19",
    'files'=>"gameset.gs,gameset.css,bg001_mairie_salle_des_illustres_480.jpg,bg002_cite_de_l_espace_ariane_5_480.jpg,bg003_canal_de_brienne_480.jpg,bg004_fontaine_de_la_place_wilson_480.jpg,bg005_musee_les_augustins_480.jpg,bg006_basilique_saint_sernin_480.jpg,bg007_basilique_daurade_pont_saint_pierre_480.jpg,bg008_place_du_capitole_480.jpg,bg009_quai_de_tounis_480.jpg,bg010_museum_parc_histoire_naturelle_480.jpg",
    'embeddedcss'=>str_replace("'", "##", ".sprite1 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG001_Merlot_Equinox_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG002_Oak_Acorn_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG003_Pumpkin_stem_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG004_Acer_japonicum_Vitifolium_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG005_Hinokibora_mokudou_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG006_Japanese_Squirrel_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG007_Red_Barn_Ontario_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG008_Copalme_Amerique_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG009_Giuseppe_Arcimboldo_Autumn_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('http://darken33.free.fr/drkslide/gameset/autumn/BG010_Paddestoel_480.jpg'); background-repeat:no-repeat; }")
);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
