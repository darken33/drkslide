<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("../../services/json_utils.php");
 include("../../services/http_response_code.php");
 $list = Array(
    'name'=>"winter",
    'description'=>"Winter Photos",
    'levels'=>10,
    'price'=>0,
    'licence'=>"Creative Commons By Sa",
	'date'=>"2014-12-03",
    'files'=>"gameset.gs,gameset.css,BG001_eglise_allemande_480.jpg,BG002_herrsching_little_castle_480.jpg,BG003_achensee_winter_480.jpg,BG004_cyanocitta_cristata_480.jpg,BG005_snowman_on_frozen_lake_480.jpg,BG006_winter_lappeenranta_finland_480.jpg,BG007_rose_und_eis_480.jpg,BG008_gothafoss_winter_480.jpg,BG009_rime_ice_480.jpg,BG010_frosty_morning_in_swinoujscie_480.jpg",
    'embeddedcss'=>str_replace("'", "##", ".sprite1 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG001_eglise_allemande_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG002_herrsching_little_castle_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG003_achensee_winter_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG004_cyanocitta_cristata_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG005_snowman_on_frozen_lake_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG006_winter_lappeenranta_finland_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG007_rose_und_eis_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG008_gothafoss_winter_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG009_rime_ice_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('http://darken33.free.fr/drkslide/gameset/winter/BG010_frosty_morning_in_swinoujscie_480.jpg'); background-repeat:no-repeat; }")
);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
