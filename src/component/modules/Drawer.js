import { SwipeableDrawer } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";

export default function Drawer(props) {
  const { children, open, toggleDrawer } = props;

  const list = () => (
    <Box
      sx={{
        width: {
          xs: "100%", // theme.breakpoints.up('xs')
          sm: "100%", // theme.breakpoints.up('sm')
        },
        height: "100%",
        display: { xs: "flex", sm: "flex" },
        mb: "2em",
        minWidth: {
          xs: 200,
          sm: 300,
        },
      }}
      p={2}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
      flexDirection="column"
      justifyContent="space-between"
    >
      {children}
    </Box>
  );
  return (
    <>
      {/* Drawer */}
      <Box>
        <SwipeableDrawer
          anchor="bottom"
          open={open.bottom}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          sx={{ display: { xs: "block", sm: "block" } }}
          disableSwipeToOpen={false}
        >
          {list()}
        </SwipeableDrawer>
      </Box>
    </>
  );
}
