import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import heroBanner from "../assets/Different_people_01.jpg";
import EventCard from "./EventCard";
import phoneImage from "../assets/2992779.jpg";
import { theme } from "../theme";

export default function Landing() {
  return (
    <Container maxWidth="xl" disableGutters={true}>
      <Navbar />
      <Hero />
      <SubHero />
      <Body />
    </Container>
  );
}

function Navbar() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
        >
          Avent
        </Typography>
        <Stack direction="row" spacing={12}>
          <Stack direction="row" spacing={2}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Help</Button>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Button
              color="secondary"
              variant="contained"
              sx={{ height: 42, width: 83 }}
              disableElevation
            >
              Login
            </Button>
            <Button
              color="secondary"
              variant="contained"
              sx={{ height: 42, width: 83 }}
              disableElevation
            >
              Signup
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

function Hero() {
  return (
    <Stack spacing={3} alignItems="center" sx={{ mt: 10 }}>
      <Typography
        align="center"
        sx={{ fontSize: 70, fontWeight: "bold", lineHeight: 1 }}
      >
        We just upgraded <br /> your internship
      </Typography>
      <Typography
        align="center"
        sx={{ fontWeight: "regular", fontSize: 17, fontStyle: "normal" }}
      >
        Avent helps interns find events and network in <br /> their new city.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        sx={{ fontSize: 20, height: 77, width: 241, borderRadius: "6px" }}
        disableElevation
      >
        Find an event now
      </Button>
      <img
        className="heroBanner"
        style={{ maxWidth: "100%" }}
        src={heroBanner}
        alt="people standing around"
      />
    </Stack>
  );
}

function SubHero() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #fcebeb 43.23%, rgba(252, 235, 235, 0) 100%)",
        height: 519,
        position: "relative",
        bottom: 100,
      }}
    >
      <Stack spacing={4}>
        <Typography
          align="center"
          mt={6}
          sx={{
            fontSize: 45,
            fontWeight: "bold",
            lineHeight: "100%",
          }}
        >
          Find events in a city near you
        </Typography>
        <Stack justifyContent="center" direction="row" spacing={2}>
          <EventCard />
          <EventCard />
          <EventCard />
        </Stack>
      </Stack>
    </Box>
  );
}

function Body() {
  return (
    <div>
      <Typography align="center" sx={{ fontWeight: 700, fontSize: 45 }}>
        Network with other interns
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1.69}
      >
        <img
          src={phoneImage}
          style={{ height: 488, width: 488 }}
          alt="picture of people texting each other"
        ></img>
        <Stack spacing={3.75}>
          <Card
            sx={{
              width: 434,
              height: 121,
              borderRadius: "10px",
              boxShadow: "0px 15.7993px 42.1314px rgba(0, 0, 0, 0.04)",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontWeight: 400, fontSize: 16, mt: 2 }}
                color="#D90429"
              >
                Total users registered
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: 21 }}
                color="#D90429"
              >
                10,000+
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: 434,
              height: 121,
              borderRadius: "10px",
              boxShadow: "0px 15.7993px 42.1314px rgba(0, 0, 0, 0.04)",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontWeight: 400, fontSize: 16, mt: 2 }}
                color="#D90429"
              >
                Events posted per month
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: 21 }}
                color="#D90429"
              >
                5,000+
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: 434,
              height: 121,
              borderRadius: "10px",
              boxShadow: "0px 15.7993px 42.1314px rgba(0, 0, 0, 0.04)",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontWeight: 400, fontSize: 16, mt: 2 }}
                color="#D90429"
              >
                Total messages sent
              </Typography>
              <Typography
                sx={{ fontWeight: 600, fontSize: 21 }}
                color="#D90429"
              >
                1,000,000+
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </div>
  );
}
