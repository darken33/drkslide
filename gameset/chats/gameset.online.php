<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("../../services/json_utils.php");
 include("../../services/http_response_code.php");
 $list = Array(
    'name'=>"chats",
    'description'=>"Gameset de photos de chats",
    'levels'=>10,
    'price'=>0,
    'licence'=>"Creative Commons By Sa",
	'date'=>"2014-02-25",
    'files'=>"gameset.gs,gameset.css,bg001_2_posing_cat_480.jpg,bg002_de_seal_point_white_480.jpg,bg003_halley_the_cat_480.jpg,bg004_savannah_cat_portrait_480.jpg,bg005_doll_face_silver_persian_480.jpg,bg006_siamese_cat_480.jpg,bg007_abessinierkater_480.jpg,bg008_life_on_the_farm_in_alabama_480.jpg,bg009_noorse_boskat_wikipedia_480.jpg,bg010_chat_adulte_male_race_korat_480.jpg",
    'embeddedcss'=>str_replace("'", "##", ".sprite1 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg001_2_posing_cat_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg002_de_seal_point_white_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg003_halley_the_cat_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg004_savannah_cat_portrait_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg005_doll_face_silver_persian_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg006_siamese_cat_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg007_abessinierkater_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg008_life_on_the_farm_in_alabama_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg009_noorse_boskat_wikipedia_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('http://darken33.free.fr/drkslide/gameset/chats/bg010_chat_adulte_male_race_korat_480.jpg'); background-repeat:no-repeat; }"),
    'source'=>"http://commons.wikimedia.org/wiki/Felis_silvestris_catus?uselang=fr"
);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
