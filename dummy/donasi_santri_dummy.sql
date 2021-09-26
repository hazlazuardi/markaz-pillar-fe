DROP TABLE `donasi_santri_dummy`;

CREATE TABLE `donasi_santri_dummy` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `username` varchar(11) default NULL,
  `donation` INT default NULL,
  `status`varchar(255)
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `donasi_santri_dummy` (`username`,`donation`,`status`) 
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

INSERT INTO `donasi_santri_dummy` (`username`,`donation`,`status`) 
VALUES 
("reed99",100000,"Menunggu pembayaran"),
("kamalparrish",50000,"`donasi_santri_dummy`"),
("mars",500000,"`donasi_santri_dummy`"),
("sdixon",200000,"`donasi_santri_dummy`"),
("irene32",1000000,"`donasi_santri_dummy`"),
("coltstevens",750000,"`donasi_santri_dummy`"),
("dbanks",600000,"`donasi_santri_dummy`"),
("lucywyatt",5000000,"`donasi_santri_dummy`"),
("ferdinand",7500000,"`donasi_santri_dummy`"),
("chavaholder",7500000,"Menunggu pembayaran"),