import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";

export default function SantriLayoutDetail() {
  const santri = {
    santri_name: "Siti",
    santri_background: "Lorem Ipsum Kolor Ahmet",
    santri_markaz: "Markaz Depok",
    santri_domisili: "Depok",
    santri_sex: "F",
    santri_birth: "Depok, 2001",
    santri_needs: "Ayam",
  };

  const consistent = {
    name: santri.santri_name,
    background: santri.santri_background,
  };

  const inconsistent = {
    "Tempat Markaz": santri.santri_markaz,
    "Jenis Kelamin": santri.santri_sex,
    "Domisili Asal": santri.santri_domisili,
    "Kebutuhan Beasiswa": santri.santri_needs,
    "Tempat & Tanggal Lahir": santri.santri_birth,
  };

  return <DetailTemplate consistent={consistent} inconsistent={inconsistent} />;
}
