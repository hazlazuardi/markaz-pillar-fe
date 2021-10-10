import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";

const BASE_URL = process.env.BACKEND_HOST;

export async function getStaticProps(context) {
  const id = context.params.id;
  console.log(id)
  const response = await fetch(`${BASE_URL}/santri?id=` + id);
  const data = await response.json();
  const santri = data.result;

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

export default function SantriLayoutDetail(props) {
  const santri = props.santri;

  const consistent = {
    name: santri.name,
    background: santri.background,
  };

  const inconsistent = {
    "Tempat Markaz": santri.markaz.name,
    "Jenis Kelamin": santri.gender,
    "Domisili Asal": santri.birthPlace,
    "Kebutuhan Beasiswa": santri.desc,
    "Tempat & Tanggal Lahir": `${santri.birthPlace} & ${santri.birthdate}` ,
  };

  return <DetailTemplate consistent={consistent} inconsistent={inconsistent} nominal={santri.nominal} donated = {santri.donated} image = {santri.thumnailURL} />;
}
