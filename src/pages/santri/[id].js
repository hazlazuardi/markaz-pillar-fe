import React, { useState, useEffect } from "react";
import DetailTemplate from "../../component/templates/detail/Detail";
import { axiosMain } from '../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function SantriLayoutDetail(props) {
  let staticSantri = props.santri;
  const [santri, setSantri] = useState(staticSantri)
  const router = useRouter();
  const { id } = router.query
  const { data: responseSantri, error } = useSWR(router.isReady ? `/santri?id=${id}` : null, fetcher)

  const consistent = {
    name: santri.name,
    background: santri.background,
    id: santri.id
  };

  const inconsistent = {
    "Tempat Markaz": santri.markaz.name,
    "Jenis Kelamin": santri.gender,
    "Domisili Asal": santri.birthPlace,
    "Kebutuhan Beasiswa": santri.desc,
    "Tempat & Tanggal Lahir": `${santri.birthPlace}, ${santri.birthDate}`,
  };


  useEffect(() => {
    if (!!responseSantri) {
      setSantri(responseSantri.result);
      console.log('santri set', responseSantri)
    }
  }, [responseSantri])
  if (error) return "An error has occurred.";
  if (!responseSantri) return "Loading...";
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

export async function getStaticProps(context) {
  const id = context.params.id;

  var santri = []
  await axiosMain
    .get(`/santri?id=${id}`)
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
    revalidate: 10
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

