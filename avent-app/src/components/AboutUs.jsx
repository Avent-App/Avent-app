import React from "react";
import { Typography, Stack, Box, Grid } from "@mui/material";
import logo from "../assets/logo.png";

const AboutUs = () => {
  return (
    <Stack spacing={3} alignItems="center" sx={{ mt: 10, background: "linear-gradient(180deg, #fcebeb 43.23%, rgba(252, 235, 235, 0) 100%)" }}>
      <Box sx={{ marginRight: "38rem" }}>
        <Typography align="left" sx={{ fontSize: 20, fontWeight: "bold", lineHeight: 1 }}>
          About Us
        </Typography>
      </Box>

      <Grid sx={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography align="center" sx={{ fontWeight: "regular", fontSize: 16, fontStyle: "normal", width: "50vw" }}>
            Avent helps interns find events and network in their new city. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, repellendus velit
            temporibus, praesentium nesciunt veniam laboriosam quidem aut enim asperiores minus recusandae voluptatibus odit quos doloremque facere porro harum
            nobis.
          </Typography>
        </Box>
        <Box className="namesInput" sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <img className="logo" style={{ maxWidth: "100%" }} src={logo} alt="people standing around" />
        </Box>
      </Grid>
    </Stack>
  );
};

export default AboutUs;
