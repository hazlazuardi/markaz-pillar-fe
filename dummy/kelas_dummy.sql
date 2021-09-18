DROP TABLE `kelas_dummy`;

CREATE TABLE `kelas_dummy` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `pengajar_name` varchar(255) default NULL,
  `ktp` varchar(13) default NULL,
  `pengajar_email` varchar(255) default NULL,
  `status` varchar(255),
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `kelas_dummy` (`subjek`, `pengajar_name`,`jadwal`,`lokasi`) 
VALUES 
("Hadis", "Dono", "Rabu, 13.00-14.00", "UI"),
("Bahasa Arab", "Aji", "Kamis, 13.00-14.00", "UI"),
("Agama Islam", "Adimas", "Selasa, 13.00-14.00", "UI"),
("Tafsir", "Roni", "Rabu, 13.00-14.00", "UI"),
("Filsafat Islam", "Mahmud", "Sabtu, 13.00-14.00", "UI"),
("Praktik Islam", "Ahmad", "Senin, 13.00-14.00", "UI"),
("Sejarah Islam", "Raihan", "Senin, 13.00-14.00", "UI"),
("Tahsin", "Ricky", "Rabu, 13.00-14.00", "UI"),
("Qiraah", "James", "Jumat, 13.00-14.00", "UI"),
("Fiqih", "Ahmed", "Kamis, 13.00-14.00", "UI"),

INSERT INTO `kelas_dummy` (`subjek`, `pengajar_name`,`jadwal`,`lokasi`) 
VALUES 
("Hadis", "Annisa", "Rabu, 11.00-12.00", "UI"),
("Bahasa Arab", "Siti", "Kamis, 11.00-12.00", "UI"),
("Agama Islam", "Azizah", "Selasa, 11.00-12.00", "UI"),
("Tafsir", "Jamilah", "Rabu, 13.00-14.00", "UI"),
("Filsafat Islam", "Yusuf", "Sabtu, 11.00-12.00", "UI"),
("Praktik Islam", "Rohman", "Senin, 11.00-12.00", "UI"),
("Sejarah Islam", "Maemunah", "Senin, 11.00-12.00", "UI"),
("Tahsin", "Tara", "Rabu, 11.00-12.00", "UI"),
("Qiraah", "Hendrik", "Jumat, 11.00-12.00", "UI"),
("Fiqih", "Heru", "Kamis, 13.00-14.00", "UI"),

INSERT INTO `kelas_dummy` (`subjek`, `pengajar_name`,`jadwal`,`lokasi`) 
VALUES 
("Hadis", "Abdul", "Rabu, 10.00-11.00", "UI"),
("Bahasa Arab", "Adam Maulana", "Kamis, 10.00-11.00", "UI"),
("Agama Islam", "Arman Muhammad", "Selasa, 10.00-11.00", "UI"),
("Tafsir", "Abdurrahman", "Rabu, 10.00-11.00", "UI"),
("Filsafat Islam", "Abdussalam", "Sabtu, 10.00-11.00", "UI"),
("Praktik Islam", "Azzahra", "Senin, 10.00-11.00", "UI"),
("Sejarah Islam", "Rahman", "Senin, 11.00-12.00", "UI"),
("Tahsin", "Anwar", "Rabu, 11.00-12.00", "UI"),
("Qiraah", "Yakub", "Jumat, 11.00-12.00", "UI"),
("Fiqih", "Ilyas", "Kamis, 10.00-11.00", "UI"),
