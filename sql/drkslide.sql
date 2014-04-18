-- phpMyAdmin SQL Dump
-- version 3.1.5
-- http://www.phpmyadmin.net
--
-- Serveur: darken33.sql.free.fr
-- Généré le : Mer 09 Avril 2014 à 06:24
-- Version du serveur: 5.0.83
-- Version de PHP: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `darken33`
--

-- --------------------------------------------------------

--
-- Structure de la table `drkslide_score`
--

DROP TABLE IF EXISTS `drkslide_score`;
CREATE TABLE `drkslide_score` (
  `id` bigint(20) unsigned NOT NULL auto_increment,
  `name` varchar(255) collate latin1_general_ci NOT NULL,
  `depl` int(11) NOT NULL,
  `duree` varchar(255) collate latin1_general_ci NOT NULL,
  `score` int(11) NOT NULL,
  `difficulty` int(11) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `score` (`score`),
  KEY `difficulty` (`difficulty`),
  KEY `index_1` (`difficulty`,`score`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=120 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
