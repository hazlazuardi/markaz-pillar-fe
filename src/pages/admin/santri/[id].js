import React from "react";
import DetailTemplate from "../../../component/templates/detail/Detail";

const BASE_URL = process.env.BACKEND_HOST;

export async function getStaticProps(context) {
  const id = context.params.id;
  console.log(id);
  const response = await fetch(`${BASE_URL}/santri?id=` + id);
  const data = await response.json();
  const santri = data.result;
  console.log(santri);

  return {
    props: {
      santri: santri,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(`${BASE_URL}/santri/search`);
  const data = await response.json();
  const santri = data.result;

  const paths = santri.map((santri) => ({
    params: { id: santri.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default function santriLayoutDetail(props) {
  const santri = props.santri;

  const image = santri.thumbnailURL;

  const consistent = {
    name: santri.name,
    background: santri.background,
  };

  const ttl = santri.birthPlace + ", " + santri.birthDate;

  const inconsistent = {
    "Tempat Markaz": santri.address,
    "Jenis Kelamin": santri.gender,
    "Domisili Asal": santri.birthPlace,
    "Tempat & Tanggal Lahir": ttl,
    "Kebutuhan Beasiswa": santri.description,
  };

  return (
    <DetailTemplate
      consistent={consistent}
      inconsistent={inconsistent}
      image={image}
      donatetext="Kelola Donasi"
    />
  );
}
