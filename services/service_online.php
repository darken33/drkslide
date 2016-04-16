<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("http_response_code.php");
 $dat = date("Y-m-d\TH:i:s") . ":000Z";
 $list = Array(
		'status' => "OK", 
		'date' => "$dat"
		);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); 
?>
