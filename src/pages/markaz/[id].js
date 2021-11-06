import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps(context) {
  const id = context.params.id;
  const response = await fetch(`${BASE_URL}/markaz?id=` + id);
  const data = await response.json();
  const markaz = data.result;

  return {
    props: {
      markaz: markaz,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(`${BASE_URL}/markaz/search?n=1000`);
  const data = await response.json();
  const allMarkaz = data.result;

  const paths = allMarkaz.map((markaz) => ({
    params: { id: markaz.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default function MarkazLayoutDetail(props) {
  const markaz = props.markaz;

  const image = markaz.thumbnailURL;

  const consistent = {
    name: markaz.name,
    background: markaz.background,
    id : markaz.id
  };

  const inconsistent = {
    Alamat: markaz.address,
    "Contact Person": markaz.contactPerson,
    Kategori: markaz.category,
    "Kebutuhan Fasilitas": markaz.description,
  };

  return (
    <DetailTemplate
      consistent={consistent}
      inconsistent={inconsistent}
      nominal={markaz.nominal}
      donated={markaz.donated}
      image={image}
      donatetext="Donasi Sekarang"
      markazOrSantri="markaz"
    />
  );
}
