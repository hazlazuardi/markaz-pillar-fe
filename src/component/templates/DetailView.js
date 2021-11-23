import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Backdrop,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Add from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { createStyles, makeStyles } from "@mui/styles";
import DonationProgressBar from "../modules/DonationProgressBar";

const useStyles = makeStyles((theme) => ({
  staticTooltipLabel: {
    whiteSpace: "nowrap",
    maxWidth: "none",
  },
  /// speed dial stuff
}));

export default function DetailView(props) {
  const { isAdmin, data, variant, speedDialActions, hrefDonasi, disableDonasi } = props

  const result = !!data ? data.result : null;
  const router = useRouter();
  const path = router.pathname;

  const actions = speedDialActions
    ? speedDialActions
    : [
      {
        name: "Create Donasi",
        icon: <Add />,
        onClick: `${path}/donasi/create`,
      },
    ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const isSM = useMediaQuery("(max-width:600px)");

  if (!data) {
    return (
      <>
        <Box>
          <Typography>Loading...</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", mb: "2em" }}
        direction="row-reverse"
      >
        <Grid item xs={12} md={6} >
          <Container disableGutters >
            <Image src={result.image} layout='responsive'
              width={16} height={16} quality={65} sizes={20} alt='Backdrop' />
            {!!disableDonasi ? null : (
              <DonationProgressBar {...props} donated={result.donated} nominal={result.nominal} hrefDonasi={hrefDonasi} />
            )}
          </Container>
        </Grid>
        <Grid item xs={12} md={6} width="100%" height='auto'>
          <Typography
            variant="h4"
            color="primary"
            component="h1"
            gutterBottom
            sx={{ textTransform: "capitalize", fontWeight: "600", overflowX: 'scroll', overflowY: 'hidden' }}
          >
            {!!data ? result.title : variant + "..."}
          </Typography>
          {!!data ? (
            <Box display="flex" flexDirection="column" height="100%">
              <Typography
                variant={isSM ? "h4" : "h2"}
                component="body"
                gutterBottom
                mb={4}
                sx={{ fontWeight: "200", overflowX: 'scroll', overflowY: 'hidden' }}
              >
                {result.description}
              </Typography>
              <Grid data-testid="detail-at-detailview" container spacing={2}>
                {result.details.map((detail, index) => (
                  <>
                    {!!detail.detail && (
                      <Grid key={index} item xs={6} sm={4} md>
                        <Typography
                          variant="body1"
                          component="body"
                        >
                          {detail.subtitle}
                        </Typography>
                        <Typography color="primary" variant="h6" component="h3">
                          {detail.detail}
                        </Typography>
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </Box>
          ) : (
            "Loading.."
          )}
        </Grid>
      </Grid>
      {isAdmin && (
        <>
          <Backdrop open={open} />
          <SpeedDial
            ariaLabel="SpeedDial Detail View"
            sx={{ position: "fixed", bottom: "3em", right: "2em" }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                classes={classes}
                TooltipClasses={classes}
                onClick={() => router.push(`${action.onClick}`)}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </>
  );
}
