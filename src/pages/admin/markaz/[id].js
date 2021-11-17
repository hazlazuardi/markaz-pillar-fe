import React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import DetailTemplate from "../../../component/templates/detail/Detail";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps(context) {
  const id = context.params.id;
  const response = await fetch(`${BASE_URL}/markaz?id=` + id);
  const data = await response.json();
  const markazs = data.result;

  return {
    props: {
      markazs: markazs,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await fetch(`${BASE_URL}/markaz/search?n=1000`);
  const data = await response.json();
  const markazs = data.result;

  const paths = markazs.map((markaz) => ({
    params: { id: markaz.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default function santriLayoutDetail(props) {
  const markaz = props.markazs;

  const image = markaz.thumbnailURL;

  const consistent = {
    name: markaz.name,
    background: markaz.background,
    id: markaz.id,
  };

  const edit = "edit/" + markaz.id;
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

  // Process category
  const temp = markaz.category.split("_");
  const markazCategory = `${temp[0]
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase())} ${temp[1]
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase())}`;

  const inconsistent = {
    Alamat: markaz.address,
    "Contact Person": markaz.contactPerson,
    Kategori: markazCategory,
    "Kebutuhan Fasilitas": markaz.description,
  };

  return (
    <DetailTemplate
      consistent={consistent}
      inconsistent={inconsistent}
      image={image}
      donatetext="Kelola Donasi"
      adminbutton={button}
      markazOrSantri="admin/markaz"
    />
  );
}
