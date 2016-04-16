<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("../../services/json_utils.php");
 include("../../services/http_response_code.php");
 $list = Array(
    'name'=>"halloween",
    'description'=>"Gameset sur le theme Halloween",
    'levels'=>10,
    'price'=>0,
    'licence'=>"Creative Commons By Sa",
	'date'=>"2014-10-29",
    'files'=>"gameset,gameset.css,bg001_batnight_480.jpg,bg002_crystal_ball_480.jpg,bg003_halloween_ns2_480.jpg,bg004_halloween_bright_full_moon_480.jpg,bg005_raven_illustration_480.jpg,bg006_halloween_4_480.jpg,bg007_october_ribbon_witch_480.jpg,bg008_halloween_owl_480.jpg,bg009_black_witch_hat_480.jpg,bg010_halloween_scene_480.jpg",
    'embeddedcss'=>str_replace("'", "##", ".sprite1 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg001_batnight_480.jpg'); background-repeat:no-repeat; } .sprite2 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg002_crystal_ball_480.jpg'); background-repeat:no-repeat; } .sprite3 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg003_halloween_ns2_480.jpg'); background-repeat:no-repeat; } .sprite4 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg004_halloween_bright_full_moon_480.jpg'); background-repeat:no-repeat; } .sprite5 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg005_raven_illustration_480.jpg'); background-repeat:no-repeat; } .sprite6 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg006_halloween_4_480.jpg'); background-repeat:no-repeat; } .sprite7 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg007_october_ribbon_witch_480.jpg'); background-repeat:no-repeat; } .sprite8 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg008_halloween_owl_480.jpg'); background-repeat:no-repeat; } .sprite9 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg009_black_witch_hat_480.jpg'); background-repeat:no-repeat; } .sprite10 { background-image:url('http://darken33.free.fr/drkslide/gameset/halloween/bg010_halloween_scene_480.jpg'); background-repeat:no-repeat; }")
);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
