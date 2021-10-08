import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";
import Layout from "../../component/layout";

export default function data_santri_single() {
  const Santri = {
    markaz: "Cinere",
    domisili: "Jakarta",
    gender: "Laki-laki",
    ttl: "Jakarta, 5 November 2021",
    kebutuhan: "Tidak butuh beasiswa",
  };

  const Placeholder = {
    markaz: "TEMPAT MARKAZ",
    domisili: "DOMISILI ASAL",
    gender: "JENIS KELAMIN",
    ttl: "TEMPAT & TANGGAL LAHIR",
    kebutuhan: "KEBUTUHAN BEASISWA",
  };
  return (
    <DetailTemplate
      arrowBackName="Abi Ganteng"
      santriObject={Santri}
      placeholderSantri={Placeholder}
    />
  );
}
