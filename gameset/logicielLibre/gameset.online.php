<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("../../services/json_utils.php");
 include("../../services/http_response_code.php");
 $list = Array(
    'name'=>"logicielLibre",
    'description'=>"Gameset sur les Logiciels Libres",
    'levels'=>10,
    'price'=>0,
    'licence'=>"Creative Commons By Sa",
	'date'=>"2014-03-04",
    'files'=>"gameset.gs,gameset.css,BG001_Isle_of_Icacos_II_480.jpg,BG002_Owoce_wisni_480.jpg,BG003_Sata_Sarvinen_4_480.jpg,BG004_Man_sitting_under_beach_umbrella_480.jpg,BG005_Taipus_de_Fora_1_480.jpg,BG006_Praia_da_Rocha_Portimao_2_480.jpg,BG007_Winkelmatten_Matterhorn_480.jpg,BG008_Playa_Manzanillo_2_480.jpg,BG009_Summer_Flowers_480.jpg,BG010_Xcalak_sunrise_1_480.jpg",
    'embeddedcss'=>str_replace("'", "##", ".sprite1 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg001_tux.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg002_gnu.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg003_inkscape.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg004_blender.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg005_the_gimp.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg006_audacity.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg007_libre_office.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg008_firefox.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg009_pidgin.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('http://darken33.free.fr/drkslide/gameset/logicielLibre/bg010_vlc.jpg'); background-repeat:no-repeat; }"),
    'source'=>"http://commons.wikimedia.org/wiki/Category:Free_software_logos?uselang=fr"
);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
