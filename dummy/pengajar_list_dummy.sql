DROP TABLE `pengajar_list_dummy`;

CREATE TABLE `pengajar_list_dummy` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `pengajar_name` varchar(255) default NULL,
  `ktp` varchar(13) default NULL,
  `pengajar_email` varchar(255) default NULL,
  `status` varchar(255),
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `pengajar_list_dummy` (`pengajar_name`,`ktp`,`pengajar_email`,`status`) 
VALUES 
("Dono","16621004 9645","dono@lacus.edu","Menunggu konfirmasi"),
("Aji","16040728 4032","aji@nislarcu.org","Menunggu konfirmasi"),
("Adimas","16160712 4406","adimas@urna.co.uk","Menunggu konfirmasi"),
("Roni","16770925 5225","ronimi@Duis.edu","Menunggu konfirmasi"),
("Mahmud","16820903 5745","mahmud@Quisquepurussapien.net","Menunggu konfirmasi"),
("Ahmad","16980914 5779","ahmadvarius@musDonec.org","Menunggu konfirmasi"),
("Raihan","16621211 1032","raihan@dignissimlacus.edu","Menunggu konfirmasi"),
("Ricky","16150425 0565","ricky.erat@dignissimmagna.org","Menunggu konfirmasi"),
("James","16311011 2651","james@egetmetusIn.com","Menunggu konfirmasi"),
("Ahmed","16050927 6898","ahmed@interdumSed.net","Menunggu konfirmasi");

INSERT INTO `pengajar_list_dummy` (`pengajar_name`,`ktp`,`pengajar_email`,`status`) 
VALUES 
("Annisa","16940307 0718","annisa@tellusjustosit.ca","Menunggu konfirmasi"),
("Siti","16700524 4343","siti@fringilla.net","Menunggu konfirmasi"),
("Azizah","16651112 6846","azizah@nibh.com","Mérida"),
("Jamilah","16560520 7264","jamilah@Proin.edu","Menunggu konfirmasi"),
("Yusuf","16210305 7333","yusuf@Suspendisseacmetus.co.uk","Menunggu konfirmasi"),
("Rohman","16090701 5192","rohman@egetmetus.org","Menunggu konfirmasi"),
("Maemunah","16260611 1645","maemunah@vitaevelitegestas.ca","Menunggu konfirmasi"),
("Tara","16520525 2801","tara@massaMaurisvestibulum.co.uk","Menunggu konfirmasi"),
("Hendrik","16190828 0512","hendrik@pharetrafelis.net","Menunggu konfirmasi"),
("Heru","16651106 3676","heru@sem.co.uk","Menunggu konfirmasi");

INSERT INTO `pengajar_list_dummy` (`pengajar_name`,`ktp`,`pengajar_email`,`status`) 
VALUES 
("Abdul","16460407 0930","abdul@ullamcorper.org","Menunggu konfirmasi"),
("Adam Maulana","16260105 7876","adam@pharetra.com","Menunggu konfirmasi"),
("Arman Muhammad","16240326 3516","arman@Quisquenonummy.com","Alken"),
("Abdurrahman","16430306 3848","abdurrahman@a.net","Menunggu konfirmasi"),
("Abdussalam","16071027 9381","abdussalam@Nullamutnisi.org","Menunggu konfirmasi"),
("Azzahra","16821012 4775","azzahra@Sedpharetrafelis.net","Menunggu konfirmasi"),
("Rahman","16800911 2981","rahman@ultricesiaculisodio.ca","Menunggu konfirmasi"),
("Anwar","16480927 6613","anwar@nisi.org","Menunggu konfirmasi"),
("Yakub","16550616 8953","yakub@purus.com","Menunggu konfirmasi"),
("Ilyas","16290804 4833","ilyas@Proinnisl.ca","Menunggu konfirmasi");

