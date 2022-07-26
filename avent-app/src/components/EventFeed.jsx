import * as React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import GlobalNavbar from "./GlobalNavbar";
import { useEffect } from "react";

export default function EventFeed({}) {
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item lg={12}>
          <GlobalNavbar
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
          // setIsClicked={setIsClicked}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
