<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("http_response_code.php");
 $dat = date("Y-m-d\TH:i:s") . ":000Z";
 $list = Array(
		'name' => "lastUpdate",
		'dateUpdate' => "2014-12-27T23:05:00.000Z", 
		'dateVisit' => "$dat"
		);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); 
?>
