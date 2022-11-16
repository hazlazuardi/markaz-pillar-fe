import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppContext } from "../../context/AppContext";
import { dispatchTypes, roleType } from "../../context/AppReducer";

export default function GridViewCard(props) {
  const { variant, fullResponseResult, image, title, description, handleDelete, CTAs, disableCTA, type } = props;
  const { state, dispatch } = useAppContext();
  const { currentUser, currentUserRole } = state;

  const router = useRouter();

  const isAdmin = currentUserRole === roleType.ROLE_SUPERUSER


  const isXXS = useMediaQuery("(max-width:400px)");
  const IMAGE_SIZE = 252;
  const CARD_WIDTH = IMAGE_SIZE;
  const CARD_HEIGHT = 1.92 * CARD_WIDTH

  const handleDonasiCTA = () => {
    if (!!currentUser) {
      router.push(`${variant}/${fullResponseResult.id}/donasi/bayar`)
    } else {
      dispatch({ type: dispatchTypes.UNAUTHORIZED_DONASI })
      router.push('/login')
    }
  }

  const handleDaftarCTA = () => {
    if (!!currentUser) {
      router.push(`/relawan/kegiatan/${fullResponseResult.id}/registrasi`)
    } else {
      dispatch({ type: dispatchTypes.UNAUTHORIZED_PROGRAM })
      router.push('/login')
    }
  }

  const handleCardActionArea = () => {
    if (variant === 'relawan') {
      return;
    }
    if (isAdmin) {
      router.push(`/admin/${variant}/${fullResponseResult.id}`)
    }
    router.push(`${variant}/${fullResponseResult.id}`)
  }


  const CTAGroup = () => {
    if (CTAs) {
      return CTAs
    }
    if (isAdmin) {
      return (
        <Stack direction="row" width="100%" spacing={2} sx={{ p: 1 }}>
          <Link href={`/admin/${variant}/${fullResponseResult.id}/edit`} passHref>
            <Button
              data-testid='edit-button-at-gridview-card'
              variant="contained"
              color="primary"
              fullWidth
              size="small"
            >
              Edit
            </Button>
          </Link>
          <Button
            data-testid='delete-button-at-gridview-card'
            onClick={() => handleDelete(fullResponseResult.id)} variant="outlined" color="primary" fullWidth size="small">
            Delete
          </Button>
        </Stack>
      )
    } else {
      if (variant === 'kegiatan' && type === 'open') {
        return (
          <Stack direction="row" width="100%" spacing={2} sx={{ p: 1 }}>
            <Button
              data-testid='edit-button-at-gridview-card'
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              onClick={handleDaftarCTA}
            >
              Daftar
            </Button>
            <Link href={`/relawan/kegiatan/${fullResponseResult.id}`} passHref>
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
          </Stack>
        )
      }
      if (variant === 'kegiatan' && type === 'close') {
        return (
          <Stack direction="row" width="100%" spacing={2} sx={{ p: 1 }}>
            <Link href={`/relawan/kegiatan/${fullResponseResult.id}`} passHref>
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
          </Stack>
        )
      }
      return (
        <Stack direction="row" width="100%" spacing={2} >
          {!!fullResponseResult.hasDonation && (
            <Button
              data-testid="donasi-button-at-gridview-card"
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              onClick={handleDonasiCTA}
            >
              Donasi
            </Button>)}
          <Link href={`${variant}/${fullResponseResult.id}`} passHref>
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
        </Stack>
      )
    }
  }

  return (
    <>
      <Card sx={{ width: IMAGE_SIZE }} elevation={4} >
        <CardActionArea
          data-testid='card-action-area-at-gridview-card'
          onClick={handleCardActionArea}
          disableRipple={variant === 'relawan'}
          disableTouchRipple={variant === 'relawan'}
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
                src={image || 'https://source.unsplash.com/random'}
                layout={isXXS ? "responsive" : "fill"}
                objectFit="cover"
                alt="Backdrop"
                width={isXXS ? 16 : undefined}
                height={isXXS ? 16 : undefined}
                position='relative'
              />
            </Box>
          </CardMedia>
          <CardContent sx={{ overflow: 'hidden', height: 0.35 * CARD_HEIGHT }}>
            <Box pr={2} sx={{ overflow: 'hidden' }}>
              <Typography
                data-testid="name-at-gridview-card"
                gutterBottom
                variant="h5"
                component="div"
              >
                {!!title && title.length > 25 ? title.slice(0, 25) + "..." : title}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              {!!description && description.length > 50 ? description.slice(0, 50) + "..." : description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {!disableCTA && (
          <CardActions sx={{ mt: 'auto' }} >
            <Stack direction="row" width="100%" spacing={2} sx={{ p: 1 }}>
              <CTAGroup />
            </Stack>
          </CardActions>
        )}
      </Card>
    </>
  );
}
