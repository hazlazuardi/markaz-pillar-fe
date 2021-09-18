DROP TABLE `donasi_markaz_dummy`;

CREATE TABLE `donasi_markaz_dummy` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `username` varchar(11) default NULL,
  `donation` INT default NULL,
  `status`varchar(255)
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `donasi_markaz_dummy` (`username`,`donation`,`status`) 
VALUES 
("psullivan",100000,"Menunggu pembayaran"),
("helenalv",50000,"Menunggu pembayaran"),
("althea",500000,"Menunggu pembayaran"),
("nomlanga_reyes",200000,"Menunggu pembayaran"),
("asherst",1000000,"Menunggu pembayaran"),
("kendallramsey",750000,"Menunggu pembayaran"),
("tadcarrillo",600000,"Menunggu pembayaran"),
("gdennis",5000000,"Menunggu pembayaran"),
("hcastadena",7500000,"Menunggu pembayaran"),

INSERT INTO `donasi_markaz_dummy` (`username`,`donation`,`status`) 
VALUES 
("reed99",100000,"Menunggu pembayaran"),
("kamalparrish",50000,"Donasi diterima"),
("mars",500000,"Donasi diterima"),
("sdixon",200000,"Donasi diterima"),
("irene32",1000000,"Donasi diterima"),
("coltstevens",750000,"Donasi diterima"),
("dbanks",600000,"Donasi diterima"),
("lucywyatt",5000000,"Donasi diterima"),
("ferdinand",7500000,"Donasi diterima"),
("chavaholder",7500000,"Menunggu pembayaran"),