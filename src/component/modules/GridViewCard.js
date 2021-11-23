import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppContext } from "../../context/AppContext";

export default function GridViewCard(props) {
  const { fullResponseResult, image, title, description, handleDelete, CTAs } = props;
  const { state } = useAppContext();
  const { currentUser } = state;
  const router = useRouter();
  const path = router.pathname;
  const isAdmin = path.includes("admin");
  const isXXS = useMediaQuery("(max-width:400px)");
  const IMAGE_SIZE = 252;


  const CTAGroup = (withAdmin) => {
    if (CTAs) {
      return (
        <CTAs />
      )
    }
    if (withAdmin) {
      return (
        <Stack direction="row" width="100%" spacing={2} sx={{ p: 1 }}>
          <Link href={`${path}/${fullResponseResult.id}/edit`} passHref>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="small"
            >
              Edit
            </Button>
          </Link>
          <Button onClick={() => handleDelete(fullResponseResult.id)} variant="outlined" color="primary" fullWidth size="small">
            Delete
          </Button>
        </Stack>
      )
    } else {
      if (!!currentUser) {
        return (
          <Stack direction="row" width="100%" spacing={2} sx={{ p: 1 }}>
            <Link href={`${path}/${fullResponseResult.id}/donasi`} passHref>
              <Button
                data-testid="donasi-button-at-gridview-card"
                variant="contained"
                color="primary"
                fullWidth
                size="small"
              >
                Donasi
              </Button>
            </Link>
          </Stack>
        )
      } else {
        return (
          <>
            <Link href={`login`} passHref>
              <Button
                data-testid="donasi-button-at-gridview-card"
                variant="contained"
                color="primary"
                fullWidth
                size="small"
              >
                Donasi
              </Button>
            </Link>
            <Link href={`${path}/${fullResponseResult.id}`} passHref>
              <Button
                data-testid="lihat-detail-button-at-gridview-card"
                variant="outlined"
                color="primary"
                fullWidth
                size="small"
              >
                Lihat Detail
              </Button>
            </Link>
          </>
        )
      }
    }
  }

  return (
    <>
      <Card sx={{ width: IMAGE_SIZE }}>
        <CardActionArea
          onClick={() => router.push(`${path}/${fullResponseResult.id}`)}
        >
          <CardMedia
            sx={
              isXXS
                ? { width: "100%", height: "100%" }
                : { width: IMAGE_SIZE, height: IMAGE_SIZE }
            }
            alt="Live from space album cover"
          >
            <Box
              position="relative"
              sx={
                isXXS
                  ? { width: "100%", height: "100%" }
                  : { width: IMAGE_SIZE, height: IMAGE_SIZE }
              }
            >
              <Image
                src={!!image ? image : "https://source.unsplash.com/random"}
                layout={isXXS ? "responsive" : "fill"}
                objectFit="cover"
                alt="Backdrop"
                width={isXXS ? 16 : undefined}
                height={isXXS ? 16 : undefined}
              />
            </Box>
          </CardMedia>
          <CardContent>
            <Typography
              data-testid="name-at-gridview-card"
              gutterBottom
              variant="h5"
              component="div"
            >
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Stack direction="row" width="100%" spacing={2} sx={{ p: 1 }}>
            {CTAGroup(isAdmin)}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
