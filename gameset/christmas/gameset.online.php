<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("../../services/json_utils.php");
 include("../../services/http_response_code.php");
 $list = Array(
    'name'=>"christmas",
    'description'=>"Gameset sur le theme de Noel et du Nouvel An",
    'levels'=>10,
    'price'=>0,
    'licence'=>"Creative Commons By Sa",
	'date'=>"2014-12-24",
    'files'=>"gameset,gameset.css,bg001_christmass_bulbs_480.jpg,bg002_flying_reindeer_480.jpg,bg003_happy_new_year_2015_480.jpg,bg004_snowman_480.jpg,bg005_xmas_tree_01_480.jpg,bg006_new_year_02_480.jpg,bg007_new_year_03_480.jpg,bg008_santas_sleigh_480.jpg,bg009_xmas_gift_02_480.jpg,bg010_classic_santa_480.jpg",
    'embeddedcss'=>str_replace("'", "##", ".sprite1 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg001_christmass_bulbs_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg002_flying_reindeer_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg003_happy_new_year_2015_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg004_snowman_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg005_xmas_tree_01_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg006_new_year_02_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg007_new_year_03_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg008_santas_sleigh_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg009_xmas_gift_02_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('http://darken33.free.fr/drkslide/gameset/christmas/bg010_classic_santa_480.jpg'); background-repeat:no-repeat; }")
);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
