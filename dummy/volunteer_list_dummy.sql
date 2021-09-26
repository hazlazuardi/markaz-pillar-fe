DROP TABLE `volunteer_list_dummy`;

CREATE TABLE `volunteer_list_dummy` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `volunteer_name` varchar(255) default NULL,
  `ktp` varchar(13) default NULL,
  `volunteer_email` varchar(255) default NULL,
  `status` varchar(255),
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `volunteer_list_dummy` (`volunteer_name`,`ktp`,`volunteer_email`,`status`) 
VALUES 
("Donovan Adams","16621004 9646","eget.nisi.dictum@lacus.edu","Menunggu konfirmasi"),
("Paula Alvarez","16040728 4033","ac@nislarcu.org","Menunggu konfirmasi"),
("Tatiana Abbott","16160712 5406","elementum.purus@urna.co.uk","Menunggu konfirmasi"),
("Lev Albert","16770925 5215","Fusce.mi@Duis.edu","Menunggu konfirmasi"),
("Murphy Britt","16820903 9745","lacus@Quisquepurussapien.net","Menunggu konfirmasi"),
("Sigourney Griffin","16980914 5379","libero.lacus.varius@musDonec.org","Menunggu konfirmasi"),
("Reese Bender","16621211 0032","non.vestibulum.nec@dignissimlacus.edu","Menunggu konfirmasi"),
("Riley Langley","16150425 0265","ligula.Aliquam.erat@dignissimmagna.org","Menunggu konfirmasi"),
("Jameson Parrish","16311011 2251","sem.Nulla@egetmetusIn.com","Menunggu konfirmasi"),
("Ahmed Riley","16050927 6838","Nam.ac@interdumSed.net","Menunggu konfirmasi");

INSERT INTO `volunteer_list_dummy` (`volunteer_name`,`ktp`,`volunteer_email`,`status`) 
VALUES ("MacKenzie Puckett","16940307 0718","sed.orci.lobortis@tellusjustosit.ca","Menunggu konfirmasi"),
("Hamish Tucker","16700524 4343","malesuada.augue.ut@fringilla.net","Menunggu konfirmasi"),
("Mary Conley","16651112 6846","quam.dignissim.pharetra@nibh.com","Mérida"),
("Leilani Stafford","16560520 7264","non.sapien@Proin.edu","Menunggu konfirmasi"),
("Sara Marks","16210305 7333","egestas.Duis@Suspendisseacmetus.co.uk","Menunggu konfirmasi"),
("Kermit Peck","16090701 5192","augue.ac@egetmetus.org","Menunggu konfirmasi"),
("Timothy Caldwell","16260611 1645","eu.odio.Phasellus@vitaevelitegestas.ca","Menunggu konfirmasi"),
("Tara Day","16520525 2801","metus@massaMaurisvestibulum.co.uk","Menunggu konfirmasi"),
("Kato Stokes","16190828 0512","Nam.consequat.dolor@pharetrafelis.net","Menunggu konfirmasi"),
("Hayley Mccullough","16651106 3676","tempus.mauris@sem.co.uk","Menunggu konfirmasi");

INSERT INTO `volunteer_list_dummy` (`volunteer_name`,`ktp`,`volunteer_email`,`status`) 
VALUES 
("Anika Olsen","16460407 0930","dolor.quam.elementum@ullamcorper.org","Menunggu konfirmasi"),
("Mona Mcfadden","16260105 7876","arcu.Nunc.mauris@pharetra.com","Menunggu konfirmasi"),
("Anastasia Knowles","16240326 3516","risus.Nunc@Quisquenonummy.com","Alken"),
("Owen Becker","16430306 3848","fringilla.mi@a.net","Menunggu konfirmasi"),
("Amber Rogers","16071027 9381","pellentesque.a.facilisis@Nullamutnisi.org","Menunggu konfirmasi"),
("Tanya Silva","16821012 4775","libero.Donec@Sedpharetrafelis.net","Menunggu konfirmasi"),
("Ila Best","16800911 2981","nec.euismod.in@ultricesiaculisodio.ca","Menunggu konfirmasi"),
("Gannon Small","16480927 6613","malesuada@nisi.org","Menunggu konfirmasi"),
("Jacob Mercado","16550616 8953","Donec.felis.orci@purus.com","Menunggu konfirmasi"),
("Ina Mcgee","16290804 4833","eget.laoreet.posuere@Proinnisl.ca","Menunggu konfirmasi");

