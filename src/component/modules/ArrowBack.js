import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

export default function ArrowBack(props) {
  const { href } = props;

  const router = useRouter();
  const fullPath = router.pathname.split('/').slice(0, -1).join(' / ')




  return (
    <Box mb='2em'>
      <Link href={href} passHref>
        <Button variant="text" startIcon={<ArrowBackIcon />}>
          {fullPath}
        </Button>
      </Link>
    </Box>
  );
}
