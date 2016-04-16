<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("http_response_code.php");
 
 $id_key = "";
 $dbuser = "" ;
 $dbhost = "localhost";
 $dbname = "drkslide"; 
 $dbpasswd = "";

// Si la clé n'est pas fournie => 403
if (!isset($_GET['key']) || $id_key != $_GET['key']) {
	http_response_code(403);
	exit;
}
if (!isset($_GET['difficulty']) || ($_GET['difficulty'] != 1 && $_GET['difficulty'] != 2 && $_GET['difficulty'] != 3)) {
	http_response_code(400);
	exit;
}
if (!isset($_GET['name'])) {
	http_response_code(400);
	exit;
}
if (!isset($_GET['depl']) || !is_numeric($_GET['depl'])) {
	http_response_code(400);
	exit;
}
if (!isset($_GET['time'])) {
	http_response_code(400);
	exit;
}
if (!isset($_GET['score']) || !is_numeric($_GET['score'])) {
	http_response;_code(400);
	exit;
}
$difficulty = $_GET['difficulty'];
$name = $_GET['name'];
$depl = $_GET['depl'];
$time = $_GET['time'];
$score = $_GET['score'];

// on se connecte à la DB
mysql_connect($dbhost,$dbuser,$dbpasswd);
mysql_select_db($dbname);

// On insere le score
$requete="INSERT INTO drkslide_score (`id` ,`name` ,`depl` ,`duree` ,`score` ,`difficulty`) VALUES (NULL , '".$name."', '".$depl."', '".$time."', '".$score."', '".$difficulty."');";
$result=mysql_query($requete);
$idrow=mysql_insert_id(); 

// On recupère les 10 meilleurs scores
$requete="SELECT `id`, `name`, `depl`, `duree`, `score`, `difficulty` FROM drkslide_score WHERE `difficulty` = '".$difficulty."' ORDER BY score DESC;";
$result=mysql_query($requete);

$list = Array();
$pos = 1;
while ($row=mysql_fetch_array($result)) {
	if ($pos < 11 || $row['id'] == $idrow) {
		array_push($list, Array(
			'pos' => $pos,
			'isplayer' => ($row['id'] == $idrow ? 1 : 0),
			'difficulty'=>$row['difficulty'], 
			'name'=>$row['name'],
			'depl'=>$row['depl'], 
			'time'=>$row['duree'], 
			'score'=>$row['score']
		));
		if ($pos > 10) break;
	}	
	$pos++;
}

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
