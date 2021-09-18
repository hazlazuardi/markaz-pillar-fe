DROP TABLE `volunteer_dummy`;

CREATE TABLE `volunteer_dummy` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `activity` varchar(255) default NULL,
  `volunteer_needed` mediumint default NULL,
  `volunteer_current` mediumint default NULL,
  `location` varchar(255),
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `volunteer_dummy` (`activity`,`volunteer_needed`,`volunteer_current`,`location`) 
VALUES 
("Bercocok tanam",8,3,"Maizeret"),
("Membersihkan pantai",8,4,"Dignano"),
("Membagikan baju",7,9,"Merbes-le-Chateau"),
("Membersihkan sampah",10,1,"Quesada"),
("Vaksin",2,8,"Saint-Brieuc"),
("Edukasi komputer",7,1,"Nanton"),
("Microsoft Office",3,7,"Mobile"),
("Edukasi mental",8,9,"Heppignies"),
("Membersihkan taman",6,1,"Lusevera"),
("Membagikan bansos",4,6,"Bruck an der Mur");

INSERT INTO `volunteer_dummy` (`activity`,`volunteer_needed`,`volunteer_current`,`location`) 
VALUES 
("Membagikan bansos",1,6,"Westrem"),
("Membersihkan masjid",5,4,"Bhopal"),
("Membersihkan musholla",3,6,"Livorno"),
("Rescue kucing liar",10,3,"Thurso"),
("Bercocok tanam",1,7,"Istanbul"),
("Membagikan baju",3,5,"Campitello di Fassa"),
("Membagikan bansos",4,2,"San Pietro al Tanagro"),
("Rescue kucing liar",2,9,"Maser"),
("Membagikan baksos",3,10,"Lodelinsart"),
("Microsoft Office",2,5,"Aisén");

INSERT INTO `volunteer_dummy` (`activity`,`volunteer_needed`,`volunteer_current`,`location`) 
VALUES 
("Edukasi komputer",9,5,"Sant'Agata Bolognese"),
("Volunteer tunawisma",7,7,"Calbuco"),
("Membantu yatim piatu",9,8,"Lafayette"),
("Rescue kucing liar",3,10,"Moliterno"),
("Membagikan baksos",7,3,"South Burlington"),
("Rescue kucing liar",3,2,"Kelowna"),
("Microsoft Office",9,6,"Peterborough"),
("Bercocok tanam",4,3,"Caledon"),
("Vaksin",7,6,"Nyandoma"),
("Membagikan bansos",6,1,"Ternat");

INSERT INTO `volunteer_dummy` 
(`activity`,`volunteer_needed`,`volunteer_current`,`location`) 
VALUES 
("Rescue kucing liar",3,6,"Imphal"),
("Edukasi",4,2,"Lang"),
("Membagikan baksos",10,9,"Bostaniçi"),
("Bercocok tanam",7,3,"Armstrong"),
("Rescue kucing liar",2,4,"Emblem"),
("Edukasi komputer",4,6,"Buin"),
("Vaksin",7,6,"Castelmarte"),
("Volunteer tunawisma",1,3,"Mayerthorpe"),
("Membantu penyandang disabilitas",2,1,"Longaví"),
("Membagikan bansos",6,2,"Liverpool");

