import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";

export default function MarkazLayoutDetail() {
  const markaz = {
    markaz_name: "Markaz Depok",
    markaz_background: "Lorem Ipsum Dolor Kolor",
    markaz_address: "Depok",
    markaz_cp: "Dodi 0811",
    markaz_category: "Makanan",
    markaz_needs: "Makanan",
  };

  const consistent = {
    name: markaz.markaz_name,
    background: markaz.markaz_background,
  };

  const inconsistent = {
    Alamat: markaz.markaz_address,
    "Contact Person": markaz.markaz_cp,
    Kategori: markaz.markaz_category,
    "Kebutuhan Fasilitas": markaz.markaz_needs,
  };

  return <DetailTemplate consistent={consistent} inconsistent={inconsistent} />;
}
