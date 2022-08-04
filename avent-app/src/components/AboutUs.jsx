import React from "react";
import { Typography, Box, Grid, CssBaseline, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import about from "../assets/about.jpg";

const AboutUs = () => {
  return (
    <Grid container component="main" sx={{ height: "70vh", display: "flex" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // marginTop: "250px",
            marginLeft: "150px",
            width: "550px",
            height: "500px",
          }}
        >
          <Typography sx={{ fontSize: 45, fontWeight: "bold", lineHeight: 1.3, width: "10px", marginRight: "34rem", marginBottom: "1.5rem" }}>
            About Us
          </Typography>
          <Typography align="justify" sx={{ fontWeight: "regular", fontSize: 16, fontStyle: "normal", width: "30vw" }}>
            Avent helps interns find events and network in their new city. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, repellendus velit
            temporibus, praesentium nesciunt veniam laboriosam quidem aut enim asperiores minus recusandae voluptatibus odit quos doloremque facere porro harum
            nobis.
          </Typography>
          <Box sx={{ display: "flex", justifyItems: "flex-start", marginTop: "3rem" }}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              to="/login"
              component={RouterLink}
              sx={{ fontSize: 20, borderRadius: "6px", justifyItems: "flex-start" }}
              disableElevation
            >
              Find an event now
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${about})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "68%",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default AboutUs;
