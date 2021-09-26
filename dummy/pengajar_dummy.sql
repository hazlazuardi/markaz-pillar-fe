DROP TABLE `pengajar_dummy`;

CREATE TABLE `pengajar_dummy` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `name` varchar(50) default NULL,
  `pengajar_needed` mediumint default NULL,
  `pengajar_current` mediumint default NULL,
  `location` varchar(255),
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("BEL",8,9,"Grayvoron"),("Stirlingshire",4,7,"Falkirk"),("Magallanes y Antártica Chilena",4,6,"San Gregorio"),("Jönköpings län",4,2,"Jönköping"),("Louisiana",6,8,"Shreveport"),("Chu",4,8,"Boryeong"),("Koc",7,5,"Gölcük"),("Iowa",1,8,"Cedar Rapids"),("Quebec",7,5,"Saint-Georges"),("Andhra Pradesh",8,9,"Guntakal");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("Ankara",10,4,"Ankara"),("WB",1,2,"Genval"),("KL",9,3,"Thalassery"),("Oost-Vlaanderen",2,8,"Destelbergen"),("AB",7,1,"Edmonton"),("Victoria",9,8,"Morwell"),("Ontario",10,3,"Guelph"),("HB",1,6,"Bremen"),("Burgenland",2,3,"Neusiedl am See"),("West-Vlaanderen",9,7,"Kuurne");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("CE",1,3,"Maranguape"),("Radnorshire",9,2,"Presteigne"),("Dolnośląskie",1,6,"Wałbrzych"),("ANT",7,9,"Rionegro"),("Sląskie",7,1,"Częstochowa"),("NB",10,5,"Alnwick"),("Gye",8,8,"Icheon"),("MA",2,9,"Parla"),("SU",1,7,"Padang Sidempuan"),("Atlántico",1,6,"Soledad");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("Cheshire",2,3,"Crewe"),("Andalucía",10,10,"Huelva"),("Dr",6,4,"Assen"),("L",6,3,"Dublin"),("UP",7,1,"Bulandshahr"),("Bihar",10,9,"Muzaffarpur"),("SN",6,6,"Makassar"),("U.",3,1,"Zeist"),("WI",5,4,"Green Bay"),("Guanajuato",9,7,"León");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("Indiana",3,7,"South Bend"),("ANT",3,5,"Rionegro"),("Ontario",9,10,"Ajax"),("SI",10,8,"Khanewal"),("Zuid Holland",2,5,"Gorinchem"),("AN",5,9,"Cádiz"),("WM",7,4,"Ełk"),("ANT",4,4,"Envigado"),("PU",6,8,"Jacobabad"),("Noord Brabant",7,2,"Oosterhout");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("VOR",1,1,"Voronezh"),("Hamburg",1,8,"Hamburg"),("O",6,6,"Skövde"),("Hamburg",7,7,"Hamburg"),("HB",3,1,"Bremerhaven"),("Antioquia",1,3,"Itagüí"),("Luik",6,8,"Neuville-en-Condroz"),("Cardiganshire",3,8,"Cardigan"),("L.",5,6,"Diepenbeek"),("Sachsen-Anhalt",5,3,"Eisleben");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("NVS",8,10,"Novosibirsk"),("H",6,1,"Heredia"),("Missouri",1,8,"Saint Louis"),("Anambra",8,2,"Onitsha"),("LU",7,2,"Bressoux"),("Bahia",6,5,"Ilhéus"),("KL",7,10,"Cochin"),("MUR",3,1,"Murmansk"),("BL",6,7,"Barkhan"),("CV",7,1,"Alacant");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("Bremen",8,6,"Bremerhaven"),("Guanacaste",10,3,"Cañas"),("Vienna",3,7,"Vienna"),("Vienna",5,2,"Vienna"),("NA",3,10,"Vezin"),("Quebec",9,9,"Shawinigan"),("Waals-Brabant",7,7,"Perwez"),("Uttar Pradesh",7,8,"Lucknow"),("FL",10,6,"Tampa"),("Quebec",10,1,"La Matap�dia");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("San Luis Potosí",1,5,"Soledad de Graciano Sánchez"),("E",1,10,"Mjölby"),("ATL",1,3,"Barranquilla"),("L",8,10,"Dublin"),("Ulster",1,2,"Belfast"),("Antioquia",1,1,"Rionegro"),("Henegouwen",9,8,"Grand-Reng"),("North Island",8,5,"Feilding"),("Maharastra",3,10,"Gondiya"),("V",4,7,"Putaendo");
INSERT INTO `pengajar_dummy` (`name`,`pengajar_needed`,`pengajar_current`,`location`) VALUES ("Delta",1,3,"Sapele"),("BO",6,10,"Maiduguri"),("San José",8,1,"San Antonio"),("H",10,2,"Mercedes"),("Tab",5,9,"Villahermosa"),("Jeo",7,6,"Gunsan"),("Alajuela",6,10,"San José de Alajuela"),("Wyoming",1,4,"Wyoming"),("BOL",4,1,"Cartagena"),("NI",5,4,"Levin");
