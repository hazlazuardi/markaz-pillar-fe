import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";
import Layout from "../../component/layout";

export default function MarkazLayoutDetail() {
  const Markaz = {
    alamat: "Jl Jalan",
    // background: "Markaz ini dibangun pada tahun 2010",
    contactPerson: "Abimanyu",
    kategori: "Umum",
    kebutuhanFasilitas: "Meja",
  };

  const Placeholder = {
    alamat: "ALAMAT",
    contactPerson: "CONTACT PERSON",
    kategori: "KATEGORI",
    kebutuhanFasilitas: "KEBUTUHAN FASILITAS",
  };

  return (
    <DetailTemplate
      arrowBackName="Markaz Depok"
      markazObject={Markaz}
      background="BACKGROUND"
      placeholderMarkaz={Placeholder}
    />
  );
}
