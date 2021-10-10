import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";

const BASE_URL = process.env.BACKEND_HOST;

export async function getStaticProps(context) {
  const id = context.params.id;
  console.log(id);
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
  const response = await fetch(`${BASE_URL}/markaz/search`);
  const data = await response.json();
  const markaz = data.result;

  const paths = markaz.map((markaz) => ({
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
  };

  const inconsistent = {
    Alamat: markaz.address,
    "Contact Person": markaz.contactPerson,
    Kategori: markaz.category,
    "Kebutuhan Fasilitas": markaz.description,
  };

  return <DetailTemplate consistent={consistent} inconsistent={inconsistent} image={image}/>;
}
