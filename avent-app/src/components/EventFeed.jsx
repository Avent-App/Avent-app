import * as React from "react";
import { Container, Typography, Stack, Box, TextField, Button, Grid } from "@mui/material";
import GlobalNavbar from "./GlobalNavbar";
import { Link as RouterLink } from "react-router-dom";

export default function EventFeed({}) {
  return (
    <div>
      <GlobalNavbar />
      <Hero />
      <Container maxWidth="xl">
        <Feed />
      </Container>
    </div>
  );
}

function Hero() {
  return (
    <Box
      alignContent="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#F4F6FB",
        height: "372px",
      }}
    >
      <Stack spacing={4} sx={{ mb: 4 }}>
        <Typography
          align="center"
          mt={10}
          sx={{
            fontSize: 44,
            fontWeight: 700,
            lineHeight: "56px",
          }}
        >
          Upcoming Events in San Francisco
        </Typography>
        {/* Eventually, San Francisco will be replaced with the city that a user has chosen */}
        <Typography align="center" sx={{ fontWeight: 400, fontSize: 16, lineHeight: "22px" }}>
          Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum. <br /> At nam minimum ponderum. Est audiam animal
          molestiae te.
        </Typography>
      </Stack>
      <Stack justifyContent="center" alignItems="center" direction="row" spacing={3}>
        <TextField
          variant="outlined"
          label="Search for an event"
          InputProps={{ sx: { height: 45 } }}
          InputLabelProps={{ sx: { height: 50, top: -5 } }}
          sx={{
            width: "282px",
            "&.MuiTextField-root": {
              backgroundColor: "white",
              height: 45,
            },
          }}
        />
        <Button
          color="secondary"
          variant="contained"
          sx={{
            height: 45,
            width: 87.4,
            borderRadius: "6px",
            padding: "12.1333px 18.2px",
            fontWeight: "bold",
            fontSize: "14.1556px",
          }}
          disableElevation
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
}

function Feed() {
  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 11 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 45 }}>Explore</Typography>
        <Button
          color="secondary"
          variant="contained"
          to="/createEvent"
          component={RouterLink}
          sx={{
            height: 43,
            width: 148.8,
            borderRadius: "6px",
            padding: "12.1333px 18.2px",
            fontWeight: "bold",
            fontSize: "14.1556px",
          }}
          disableElevation
        >
          Create an event
        </Button>
      </Stack>
      <Grid container>{/* Event feed cards go here */}</Grid>
    </div>
  );
}
