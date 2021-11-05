import React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import DetailTemplate from "../../../component/templates/detail/Detail";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps(context) {
  const id = context.params.id;
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
  const response = await fetch(`${BASE_URL}/santri/search?n=1000`);
  const data = await response.json();
  const allSantri = data.result;

  const paths = allSantri.map((santri) => ({
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

  const edit = "edit/" + santri.id;
  const button = (
    <div>
      <Button>
        <Link href={edit} underline="none">
          Edit
        </Link>
      </Button>
      <Button>Delete</Button>
    </div>
  );

  const ttl = santri.birthPlace + ", " + santri.birthDate;

  const tempatmarkaz = santri.markaz.name + ", " + santri.markaz.address;

  const inconsistent = {
    "Tempat Markaz": tempatmarkaz,
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
      adminbutton={button}
      markazOrSantri="admin/santri"
    />
  );
}
