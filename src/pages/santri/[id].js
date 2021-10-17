import React from "react";
import DetailTemplate from "../../component/templates/detail/Detail";
import { axiosMain } from '../../axiosInstances';


export async function getStaticProps(context) {
  const id = context.params.id;
  
  var santri = []
  await axiosMain
      .get(`santri/?id=${id}`)
      .then(response => {
        console.log(response);
        santri = response.data.result
        
      })
      .catch(e => {
        console.log(e.response)
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
  var santri = []
  await axiosMain
      .get(`santri/search`)
      .then(response => {
        console.log(response);
        santri = response.data.result
        paths = santri.map((santri) => ({
          params: { id: santri.id.toString() },
        }));
      })
      .catch(e => {
        console.log(e.response)
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
  };

  const inconsistent = {
    "Tempat Markaz": santri.markaz.name,
    "Jenis Kelamin": santri.gender,
    "Domisili Asal": santri.birthPlace,
    "Kebutuhan Beasiswa": santri.desc,
    "Tempat & Tanggal Lahir": `${santri.birthPlace} & ${santri.birthdate}`,
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
