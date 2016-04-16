<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("../../services/json_utils.php");
 include("../../services/http_response_code.php");
 $list = Array(
    'name'=>"summer",
    'description'=>"Summer Photos",
    'levels'=>10,
    'price'=>0,
    'licence'=>"Creative Commons By Sa",
	'date'=>"2014-07-29",
    'files'=>"gameset.gs,gameset.css,BG001_Isle_of_Icacos_II_480.jpg,BG002_Owoce_wisni_480.jpg,BG003_Sata_Sarvinen_4_480.jpg,BG004_Man_sitting_under_beach_umbrella_480.jpg,BG005_Taipus_de_Fora_1_480.jpg,BG006_Praia_da_Rocha_Portimao_2_480.jpg,BG007_Winkelmatten_Matterhorn_480.jpg,BG008_Playa_Manzanillo_2_480.jpg,BG009_Summer_Flowers_480.jpg,BG010_Xcalak_sunrise_1_480.jpg",
    'embeddedcss'=>str_replace("'", "##", ".sprite1 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG001_Isle_of_Icacos_II_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG002_Owoce_wisni_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG003_Sata_Sarvinen_4_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG004_Man_sitting_under_beach_umbrella_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG005_Taipus_de_Fora_1_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG006_Praia_da_Rocha_Portimao_2_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG007_Winkelmatten_Matterhorn_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG008_Playa_Manzanillo_2_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG009_Summer_Flowers_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('http://darken33.free.fr/drkslide/gameset/summer/BG010_Xcalak_sunrise_1_480.jpg'); background-repeat:no-repeat; }")
);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
