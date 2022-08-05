import React from "react";
import { Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import about from "../assets/about.jpg";

const AboutUs = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={15} sx={{ mx: 32, mt: 5, mb: 25 }}>
      <Stack alignItems="center" spacing={3}>
        <Typography sx={{ fontSize: 45, fontWeight: "bold", lineHeight: 1.3 }}>About Us</Typography>
        <Typography align="justify" sx={{ fontWeight: "regular", fontSize: 16, fontStyle: "normal", height: "150px" }}>
          Avent helps interns find events and network in their new city. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, repellendus velit
          temporibus, praesentium nesciunt veniam laboriosam quidem aut enim asperiores minus recusandae voluptatibus odit quos doloremque facere porro harum
          nobis.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          size="large"
          to="/login"
          component={RouterLink}
          sx={{ fontSize: 20, borderRadius: "6px", width: 250 }}
          disableElevation
        >
          Find an event now
        </Button>
      </Stack>
      <img src={about} style={{ width: "50%", height: "auto" }} />
    </Stack>
  );
};

export default AboutUs;
