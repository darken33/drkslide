<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("../../services/json_utils.php");
 include("../../services/http_response_code.php");
 $list = Array(
    'name'=>"chiens",
    'description'=>"Gameset de photos de chiens",
    'levels'=>10,
    'price'=>0,
    'licence'=>"Creative Commons By Sa",
	'date'=>"2014-02-25",
    'files'=>"gameset.gs,gameset.css,bg001_border_collie_dog_480.jpg,bg002_pembroke_welsh_corgi_dog_480.jpg,bg003_buck_the_gsd_480.jpg,bg004_bolonka_zwetna_480.jpg,bg005_beagle_480.jpg,bg006_7weeks_old_dog_480.jpg,bg007_ruby_begging_480.jpg,bg008_elo_dog_480.jpg,bg009_golden_retriever_standing_tucker_480.jpg,bg010_irish_terrier_sitting_480.jpg",
    'embeddedcss'=>str_replace("'", "##", ".sprite1 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg001_border_collie_dog_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg002_pembroke_welsh_corgi_dog_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg003_buck_the_gsd_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg004_bolonka_zwetna_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg005_beagle_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg006_7weeks_old_dog_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg007_ruby_begging_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg008_elo_dog_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg009_golden_retriever_standing_tucker_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('http://darken33.free.fr/drkslide/gameset/chiens/bg010_irish_terrier_sitting_480.jpg'); background-repeat:no-repeat; }"),
    'source'=>"http://commons.wikimedia.org/wiki/Category:Dogs?uselang=fr"
);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
