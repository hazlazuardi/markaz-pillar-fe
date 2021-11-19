import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Box } from "@mui/system";

export default function ArrowBack(props) {
  const { href } = props;

  const fullPath = href.split('/').slice().join(' / ')




  return (
    <Box mb='2em'>
      <Link href={href} passHref>
        <Button data-testid='arrowback-at-modules' variant="text" startIcon={<ArrowBackIcon />}>
          {fullPath}
        </Button>
      </Link>
    </Box>
  );
}
