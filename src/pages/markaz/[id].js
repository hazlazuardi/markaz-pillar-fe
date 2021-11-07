import React, { useState, useEffect } from "react";
import DetailTemplate from "../../component/templates/detail/Detail";
import { axiosMain } from '../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function MarkazLayoutDetail(props) {
  const staticMarkaz = props.detailMarkaz;
  const [markaz, setMarkaz] = useState(staticMarkaz)
  const router = useRouter();
  const { id } = router.query
  const { data: responseMarkaz, error } = useSWR(router.isReady ? `/markaz?id=${id}` : null, fetcher)

  const image = markaz.thumbnailURL;

  const consistent = {
    name: markaz.name,
    background: markaz.background,
    id: markaz.id
  };

  const inconsistent = {
    Alamat: markaz.address,
    "Contact Person": markaz.contactPerson,
    Kategori: markaz.category,
    "Kebutuhan Fasilitas": markaz.description,
  };

  useEffect(() => {
    if (!!responseMarkaz) {
      setMarkaz(responseMarkaz.result);
      console.log('santri set', responseMarkaz)
    }
  }, [responseMarkaz])
  if (error) return "An error has occurred.";
  if (!responseMarkaz) return "Loading...";
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

export async function getStaticProps(context) {
  const id = context.params.id;

  var staticDetailMarkaz = []
  await axiosMain
    .get(`/markaz?id=${id}`)
    .then(response => {

      staticDetailMarkaz = response.data.result

    })
  return {
    props: {
      detailMarkaz: staticDetailMarkaz,
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  var paths = []
  var allMarkaz = []
  await axiosMain
    .get(`/markaz/search?n=1000`)
    .then(response => {
      allMarkaz = response.data.result
      paths = allMarkaz.map((markaz) => ({
        params: { id: markaz.id.toString() },
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

