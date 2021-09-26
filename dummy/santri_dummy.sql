DROP TABLE `santri_dummy`;

CREATE TABLE `santri_dummy` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `nama_santri` varchar(255) default NULL,
  `markaz` varchar(255),
  `domisili` varchar(255),
  `gender` varchar(255) default NULL,
  `tanggal_lahir` varchar(255),
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `santri_dummy` (`nama_santri`,`markaz`,`domisili`,`gender`,`tanggal_lahir`) 
VALUES 
("Hedley","Markaz Sakinah","Abbateggio","M","25/01/02"),
("Cheryl","Markaz Rhoncus","Trento","F","25/01/06"),
("Cheyenne","Markaz Lectus","Paranaguá","F","25/01/95"),
("Cassady","Markaz Rhoncus","Stokkem","F","05/05/01"),
("Hakeem","Markaz Takwa","Eisenhüttenstadt","M","05/05/01"),
("Alexa","Markaz Kursus","Noicattaro","F","19/08/07"),
("Rashad","Markaz Lectus","Vitrival","M","20/05/98"),
("Leilani","Markaz Lectus","Trento","F","05/06/98"),
("Shelly","Markaz Kursus","Pudukkottai","F","27/10/01"),
("Pamela","Markaz Takwa","Pointe-Claire","F","04/09/01");

INSERT INTO `santri_dummy` (`nama_santri`,`markaz`,`domisili`,`gender`,`tanggal_lahir`) 
VALUES 
("Callie","Markaz Lectus","Lambersart","F","10/07/06"),
("Colorado","Markaz Shiddiq","Dubuisson","M","08/04/09"),
("Joseph","Markaz Rhoncus","Dubuisson","M","25/01/97"),
("Jaden","Markaz Takwa","El Monte","M","02/11/08"),
("Jakeem","Markaz Sakinah","Lago Verde","M","02/02/04"),
("Erasmus","Markaz Lectus","Kircudbright","M","07/08/99"),
("Cassandra","Markaz Shiddiq","Cantley","F","23/11/01"),
("Xerxes","Markaz Kursus","Malbaie","M","08/12/97"),
("Brenna","Markaz Lectus","Toulouse","F","04/09/06"),
("Shay","Markaz Lectus","Turriaco","F","16/08/05");

INSERT INTO `santri_dummy` (`nama_santri`,`markaz`,`domisili`,`gender`,`tanggal_lahir`) 
VALUES 
("Abdul","Markaz Convallis","Portland","M","12/05/98"),
("Raven","Markaz Takwa","Minna","F","28/08/97"),
("Calista","Markaz Shiddiq","Nemoli","F","17/04/97"),
("Daphne","Markaz Rahmat","Chuncheon","F","29/01/02"),
("Francesca","Markaz Shiddiq","Braies/Prags","F","27/08/00"),
("Cynthia","Markaz Convallis","Bludenz","F","25/05/07"),
("Talon","Markaz Mawadah","La Paz","M","08/10/98"),
("Bertha","Markaz Kursus","Neu-Ulm","F","14/02/04"),
("Knox","Markaz Kursus","Schwedt","M","19/10/08"),
("Veronica","Markaz Rhoncus","North Cowichan","F","18/01/95");

INSERT INTO `santri_dummy` (`nama_santri`,`markaz`,`domisili`,`gender`,`tanggal_lahir`) 
VALUES 
("Linda","Markaz Rhoncus","San José","F","16/07/08"),
("Hollee","Markaz Shiddiq","Bruderheim","F","27/02/95"),
("Francis","Markaz Rahmat","Oudergem","M","15/08/02"),
("Keelie","Markaz Mawadah","Bismil","F","05/05/10"),
("Alana","Markaz Mawadah","Achalpur","F","03/08/96"),
("Myra","Markaz Rahmat","Rivire","F","07/09/08"),
("Imelda","Markaz Takwa","Rocourt","F","30/01/95"),
("Blake","Markaz Kursus","Massarosa","M","12/04/04"),
("MacKensie","Markaz Kursus","Dokkum","F","31/12/99"),
("Hayden","Markaz Shiddiq","Ancona","F","19/01/06");

INSERT INTO `santri_dummy` (`nama_santri`,`markaz`,`domisili`,`gender`,`tanggal_lahir`) 
VALUES 
("Lane","Markaz Shiddiq","Southaven","F","01/07/99"),
("Violet","Markaz Neque Nullam","Cottbus","F","09/09/10"),
("Craig","Markaz Rhoncus","Santa Vittoria in Matenano","M","02/11/05"),
("Dawn","Markaz Mawadah","Sivry-Rance","F","08/02/03"),
("Blaze","Markaz Takwa","Kirkcaldy","F","28/04/95"),
("Ciara","Markaz Mawadah","Istres","F","03/01/96"),
("Jorden","Markaz Neque Nullam","Jafarabad","M","24/05/08"),
("Hilda","Markaz Sakinah","Ichtegem","F","09/05/04"),
("Lenore","Markaz Kursus","Pitt Meadows","F","15/12/94"),
("Uma","Markaz Rahmat","Kakisa","F","01/04/06");

INSERT INTO `santri_dummy` (`nama_santri`,`markaz`,`domisili`,`gender`,`tanggal_lahir`) 
VALUES 
("Maxwell","Markaz Neque Nullam","Valverde","M","06/11/08"),
("Jelani","Markaz Takwa","Itapipoca","F","17/06/06"),
("Nayda","Markaz Shiddiq","New Orleans","F","08/02/03"),
("Brian","Markaz Neque Nullam","Chilliwack","M","25/09/00"),
("Chanda","Markaz Rhoncus","Ternate","F","24/08/96"),
("Aline","Markaz Sakinah","Ragnies","F","27/09/95"),
("Keith","Markaz Rahmat","New Orleans","M","27/10/00"),
("Leigh","Markaz Shiddiq","Villata","F","08/06/96"),
("Sherly","Markaz Shiddiq","Tapachula","F","22/05/00"),
("Scarlet","Markaz Kursus","Weyburn","F","12/02/96");

INSERT INTO `santri_dummy` (`nama_santri`,`markaz`,`domisili`,`gender`,`tanggal_lahir`) 
VALUES 
("Lucius","Markaz Shiddiq","Delianuova","M","23/05/00"),
("Urielle","5770","Eghezee","F","13/09/07"),
("Berk","Markaz Rhoncus","Great Yarmouth","M","22/05/96"),
("Baxter","Markaz Neque Nullam","Pieve di Cadore","M","07/09/02"),
("Virginia","Markaz Shiddiq","Lloydminster","F","21/07/97"),
("Kuame","Markaz Takwa","Viesville","M","18/04/95"),
("Imani","Markaz Convallis","Brentwood","F","27/04/08"),
("Ryder","Markaz Sakinah","Yeoju","M","27/11/09"),
("Maia","Markaz Kursus","Wigtown","F","11/02/06"),
("Haviva","Markaz Rahmat","Annapolis","F","13/08/03");

INSERT INTO `santri_dummy` (`nama_santri`,`markaz`,`domisili`,`gender`,`tanggal_lahir`) 
VALUES 
("Upton","Markaz Neque Nullam","Minto","M","10/05/01"),
("Aspen","Markaz Rhoncus","Aurillac","M","01/10/07"),
("Hashim","Markaz Neque Nullam","Gujranwala","M","02/01/01"),
("Alexis","Markaz Kursus","Höchst","F","16/11/96"),
("Kuame","Markaz Kursus","Korbach","M","11/08/05"),
("Hamilton","Markaz Sakinah","Katsina","N","12/08/08"),
("Boris","Markaz Convallis","Manoppello","M","11/04/07"),
("Donna","Markaz Shiddiq","Doñihue","F","03/09/99"),
("Aquila","Markaz Rahmat","Great Yarmouth","F","11/07/10"),
("Lyle","Markaz Takwa","Linton","M","10/01/06");

