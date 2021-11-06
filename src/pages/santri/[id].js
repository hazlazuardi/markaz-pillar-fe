import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";
import { axiosMain } from '../../axiosInstances';

export async function getStaticProps(context) {
  const id = context.params.id;
  
  var santri = []
  await axiosMain
      .get(`santri/?id=${id}`)
      .then(response => {
        
        santri = response.data.result
        
      })
      .catch(e => {
        
        santri = "error"
      })
  return {
    props: {
      santri: santri,
    },
  };
}

export async function getStaticPaths() {
  var paths = []
  var allSantri = []
  await axiosMain
      .get(`/santri/search?n=1000`)
      .then(response => {
        allSantri = response.data.result
        paths = allSantri.map((santri) => ({
          params: { id: santri.id.toString() },
        }));
      })
      .catch(e => {
        throw e.response
      })
  return {
    paths: paths,
    fallback: false,
  };
}

export default function SantriLayoutDetail(props) {
  const santri = props.santri;

  if(santri === "error") {
    return (
      <p>There seems to be a problem with data fetching</p>
    )
  }

  const consistent = {
    name: santri.name,
    background: santri.background,
    id : santri.id
  };

  const inconsistent = {
    "Tempat Markaz": santri.markaz.name,
    "Jenis Kelamin": santri.gender,
    "Domisili Asal": santri.birthPlace,
    "Kebutuhan Beasiswa": santri.desc,
    "Tempat & Tanggal Lahir": `${santri.birthPlace}, ${santri.birthDate}`,
  };

  return (
    <DetailTemplate
      consistent={consistent}
      inconsistent={inconsistent}
      nominal={santri.nominal}
      donated={santri.donated}
      image={santri.thumbnailURL}
      markazOrSantri="santri"
      donatetext="Donasi Sekarang"
    />
  );
}
