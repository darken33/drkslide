<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("json_utils.php");
 include("http_response_code.php");
 $list = Array(
		'name' => "gameset_service", 
		'description' => "Liste des games sets disponibles",
		'gameset' => "toulouse,Gameset des monuments de Toulouse,10,0,Creative Commons By Sa,2014-02-25#gameset.gs,gameset.css,bg001_mairie_salle_des_illustres_480.jpg,bg002_cite_de_l_espace_ariane_5_480.jpg,bg003_canal_de_brienne_480.jpg,bg004_fontaine_de_la_place_wilson_480.jpg,bg005_musee_les_augustins_480.jpg,bg006_basilique_saint_sernin_480.jpg,bg007_basilique_daurade_pont_saint_pierre_480.jpg,bg008_place_du_capitole_480.jpg,bg009_quai_de_tounis_480.jpg,bg010_museum_parc_histoire_naturelle_480.jpg@chiens,Gameset de photos de chiens,10,0,Creative Commons By Sa,2014-02-25#gameset.gs,gameset.css,bg001_border_collie_dog_480.jpg,bg002_pembroke_welsh_corgi_dog_480.jpg,bg003_buck_the_gsd_480.jpg,bg004_bolonka_zwetna_480.jpg,bg005_beagle_480.jpg,bg006_7weeks_old_dog_480.jpg,bg007_ruby_begging_480.jpg,bg008_elo_dog_480.jpg,bg009_golden_retriever_standing_tucker_480.jpg,bg010_irish_terrier_sitting_480.jpg@chats,Gameset de photos de chats,10,0,Creative Commons By Sa,2014-02-25#gameset.gs,gameset.css,bg001_2_posing_cat_480.jpg,bg002_de_seal_point_white_480.jpg,bg003_halley_the_cat_480.jpg,bg004_savannah_cat_portrait_480.jpg,bg005_doll_face_silver_persian_480.jpg,bg006_siamese_cat_480.jpg,bg007_abessinierkater_480.jpg,bg008_life_on_the_farm_in_alabama_480.jpg,bg009_noorse_boskat_wikipedia_480.jpg,bg010_chat_adulte_male_race_korat_480.jpg@logicielLibre,Gameset sur les Logiciels Libres,10,0,Creative Commons By Sa,2014-03-04#gameset.gs,gameset.css,bg001_tux.jpg,bg002_gnu.jpg,bg003_inkscape.jpg,bg004_blender.jpg,bg005_the_gimp.jpg,bg006_audacity.jpg,bg007_libre_office.jpg,bg008_firefox.jpg,bg009_pidgin.jpg,bg010_vlc.jpg@hubble,Hubble Photos of Ggalaxies,10,0,Creative Commons By Sa,2014-04-07#gameset.gs,gameset.css,BG001_Cartwheel_Galaxy_480.jpg,BG002_Composite_view_of_the_galaxy_NGC_1433_480.jpg,BG003_Interacting_Galaxy_NGC_7469_480.jpg,BG004_Messier_60_Hubble_Chandra_480.jpg,BG005_A_Rose_Made_of_Galaxies_Highlights_480.jpg,BG006_Ring_galaxy_AM_0644-741_480.jpg,BG007_I_Zwicky_18a_480.jpg,BG008_Galaxy_N11_Hubble_480.jpg,BG009_Hannys_voorwerp_480.jpg,BG010_NGC_201_HST_10787_480.jpg"
		);

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
