import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Container,
  Card,
  CardContent,
  CssBaseline,
  Link,
  ImageList,
  ImageListItem,
} from "@mui/material";
import heroBanner from "../assets/Different_people_01.jpg";
import EventCard from "./EventCard";
import phoneImage from "../assets/2992779.jpg";
import { Link as RouterLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import logo from "../assets/logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import PrintIcon from "@mui/icons-material/Print";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AboutUs from "./AboutUs";

export default function Landing() {
  return (
    <Container maxWidth="xl" disableGutters={true}>
      <Navbar />
      <Hero />
      <SubHero />
      <Body />
      <AboutUs />
      <Sponsors />
      <Footer />
    </Container>
  );
}

function Navbar() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            display: { xs: "none", sm: "block" },
            flexGrow: 1,
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          <Link
            to="/"
            color="secondary"
            component={RouterLink}
            underline="none"
          >
            Avent
          </Link>
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
              to="/login"
              component={RouterLink}
              sx={{ height: 42, width: 83 }}
              disableElevation
            >
              Login
            </Button>
            <Button
              color="secondary"
              variant="contained"
              to="/register"
              component={RouterLink}
              sx={{ height: 42, width: 83 }}
              disableElevation
            >
              Register
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
        to="/login"
        component={RouterLink}
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
        <Grid container spacing={2} sx={{ px: 24 }}>
          <Grid item xs={4}>
            <EventCard
              eventImageUrl={
                "https://thumbs.dreamstime.com/b/tropical-beach-party-24320856.jpg"
              }
              eventCategory={"COMMUNITY"}
              datePosted={"7/22/21"}
              eventName={"Beach Party"}
              eventDescription={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text..."
              }
              eventHostName={"Carlos Chavez"}
              eventHostImg={
                "https://www.codepath.org/hubfs/Headshots/Carlos.jpg"
              }
            />
          </Grid>
          <Grid item xs={4}>
            <EventCard
              eventImageUrl={
                "https://www.anarapublishing.com/wp-content/uploads/elementor/thumbs/photo-1506157786151-b8491531f063-o67khcr8g8y3egfjh6eh010ougiroekqaq5cd8ly88.jpeg"
              }
              eventCategory={"FESTIVAL"}
              datePosted={"7/22/21"}
              eventName={"Summerfest 2022"}
              eventDescription={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text..."
              }
              eventHostName={"Benito Antonio Ocasio"}
              eventHostImg={
                "https://assets.popbuzz.com/2020/13/how-old-is-bad-bunny-1585671751-view-0.jpg"
              }
            />
          </Grid>
          <Grid item xs={4}>
            <EventCard
              eventImageUrl={
                "https://www.signupgenius.com/cms/images/groups/beach-clean-up-tips-ideas-article-600x400.jpg"
              }
              eventCategory={"INTERN EVENT"}
              datePosted={"7/22/21"}
              eventName={"Beach Cleanup Day"}
              eventDescription={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text..."
              }
              eventHostName={"Kanye West"}
              eventHostImg={
                "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/10/19/153042.jpg"
              }
            />
          </Grid>
        </Grid>
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

function Footer() {
  return (
    <>
      <Divider sx={{ backgroundColor: "#D90429", borderWidth: "1px" }} />
      <CssBaseline />
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: "4rem",
          marginBottom: "4rem",
        }}
      >
        <Box>
          <img src={logo} alt="avent logo" />
        </Box>
        <Box>
          <Typography
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <LocationOnIcon sx={{ color: "#D90429" }} />
            345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
          </Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Box>
              <Typography
                component="p"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <CallIcon sx={{ color: "#D90429" }} />
                <span>(123) 456-7890</span>
              </Typography>
            </Box>
            <Box>
              <Typography
                component="p"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <PrintIcon sx={{ color: "#D90429" }} />
                <span>(123) 456-7890</span>
              </Typography>
            </Box>
          </Grid>
          <Grid
            sx={{
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  component="p"
                  sx={{
                    color: "GrayText",
                    fontWeight: "500",
                    marginTop: "1rem",
                    marginLeft: ".5rem",
                  }}
                >
                  Social Media
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}
              >
                <FacebookIcon sx={{ color: "#D90429" }} />
                <TwitterIcon sx={{ color: "#D90429" }} />
                <LinkedInIcon sx={{ color: "#D90429" }} />
                <YouTubeIcon sx={{ color: "#D90429" }} />
                <InstagramIcon sx={{ color: "#D90429" }} />
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Divider sx={{ backgroundColor: "FFD0D0", borderWidth: ".3px" }} />
      <Typography sx={{ textAlign: "end", fontSize: "14px" }}>
        @2022 All right reserved
      </Typography>
    </>
  );
}

function Sponsors() {
  return (
    <div>
      <Typography align="center" sx={{ fontWeight: 700, fontSize: 45, mb: 8 }}>
        Used by interns at
      </Typography>
      <ImageList cols={3} gap={120} sx={{ mx: 24, mb: 20 }}>
        <Card elevation={0}>
          <ImageListItem>
            <img
              src={
                "https://1000logos.net/wp-content/uploads/2021/10/Meta-Logo.png"
              }
            />
          </ImageListItem>
        </Card>
        <Card elevation={0}>
          <ImageListItem>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png"
              }
            />
          </ImageListItem>
        </Card>
        <Card elevation={0}>
          <ImageListItem>
            <img
              src={
                "https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png"
              }
            />
          </ImageListItem>
        </Card>
        <Card elevation={0}>
          <ImageListItem>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
              }
            />
          </ImageListItem>
        </Card>
        <Card elevation={0}>
          <ImageListItem>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
              }
            />
          </ImageListItem>
        </Card>
        <Card elevation={0}>
          <ImageListItem>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png"
              }
            />
          </ImageListItem>
        </Card>
      </ImageList>
    </div>
  );
}
