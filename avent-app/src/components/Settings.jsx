import {
  Button,
  Divider,
  Paper,
  Typography,
  Stack,
  Avatar,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Link,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import EventCardHorizontal from "./EventCardHorizontal";
import SmallEventCard from "./SmallEventCard";
import { Link as RouterLink } from "react-router-dom";

// This file houses all of the views for the settings page.
export default function Settings({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div>
      <GlobalNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Container maxWidth="xl">
        <Stack direction="row" spacing={12}>
          <Sidebar />
          {/* <MyProfile /> */}
        </Stack>
      </Container>
    </div>
  );
}

export function Sidebar({ selected }) {
  return (
    <Box sx={{ width: 291, height: 744, mt: 3 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 28, mb: 1.5 }}>
        Settings
      </Typography>
      {/* TOP HALF OF THE SIDEBAR */}
      <Paper
        elevation={0}
        sx={{
          width: 288,
          border: "1.01111px solid #E1E1E1",
          borderRadius: "10.11px",
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={3}
          sx={{ my: 3.5 }}
        >
          <Typography
            align="center"
            sx={{ fontSize: 28, fontWeight: 700, lineHeight: "32px" }}
          >
            Marc <br /> Benioff
          </Typography>
          <Button
            to="/settings/profile"
            component={RouterLink}
            color="secondary"
            variant="outlined"
            sx={{ width: 118 }}
          >
            Edit Profile
          </Button>
        </Stack>
        <Divider />
        <Stack sx={{ ml: 4, my: 1.3 }}>
          <Typography
            sx={{ fontWeight: 400, fontSize: 13, color: "rgba(0, 0, 0, 0.29)" }}
          >
            Email
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 13 }}>
            marcbenioff@salesforce.com
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 13, color: "red" }}>
            <Link
              to="/settings/profile"
              color="secondary"
              component={RouterLink}
              underline="none"
            >
              Edit
            </Link>
          </Typography>
        </Stack>
        <Divider />
        <Stack sx={{ ml: 4, my: 1.3 }}>
          <Typography
            sx={{ fontWeight: 400, fontSize: 13, color: "rgba(0, 0, 0, 0.29)" }}
          >
            Location
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 13 }}>
            San Francisco, CA
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 13, color: "red" }}>
            <Link
              to="/settings/profile"
              color="secondary"
              component={RouterLink}
              underline="none"
            >
              Edit Location
            </Link>
          </Typography>
        </Stack>
      </Paper>
      {/* BOTTOM HALF OF THE SIDEBAR STARTS HERE */}
      <Paper
        elevation={0}
        sx={{
          width: 288,
          border: "1.01111px solid #E1E1E1",
          borderRadius: "10.11px",
          mt: 2.625,
        }}
      >
        <Typography
          color="secondary"
          sx={{
            fontWeight: selected == "Profile" ? 700 : 400,
            fontSize: 18,
            ml: 4,
            my: 3.9,
          }}
        >
          <Link
            to="/settings/profile"
            color="secondary"
            component={RouterLink}
            underline="none"
          >
            My Profile
          </Link>
        </Typography>
        <Divider />
        <Typography
          color="secondary"
          sx={{
            fontWeight: selected == "Reservations" ? 700 : 400,
            fontSize: 18,
            ml: 4,
            my: 3.9,
          }}
        >
          <Link
            to="/settings/reservations"
            color="secondary"
            component={RouterLink}
            underline="none"
          >
            My Reservations
          </Link>
        </Typography>
        <Divider />
        <Typography
          color="secondary"
          sx={{
            fontWeight: selected == "Listings" ? 700 : 400,
            fontSize: 18,
            ml: 4,
            my: 3.9,
          }}
        >
          <Link
            to="/settings/listings"
            color="secondary"
            component={RouterLink}
            underline="none"
          >
            My Event Listings
          </Link>
        </Typography>
        <Divider />
        <Typography
          color="secondary"
          sx={{
            fontWeight: selected == "Payment" ? 700 : 400,
            fontSize: 18,
            ml: 4,
            my: 3.9,
          }}
        >
          Payment Options
        </Typography>
        <Divider />
      </Paper>
    </Box>
  );
}

export function MyProfile() {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 28, mt: 3, mb: 1.5 }}>
        My Profile
      </Typography>

      {/* Banner below */}

      <Box
        sx={{
          background: "linear-gradient(90deg, #D90429 0%, #AC001E 100%)",
          height: 225,
          borderRadius: "39.4333px 0px 0px 0px",
        }}
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Avatar
          sx={{
            width: 180,
            height: 180,
            border: "9.32726px solid #FFFFFF",
            position: "relative",
            bottom: 60,
            left: 10,
          }}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ position: "relative", bottom: 30 }}
        >
          <Button
            sx={{ width: 158, height: 48 }}
            variant="outlined"
            color="secondary"
            disabled
          >
            Cancel
          </Button>
          <Button
            disableElevation
            sx={{ width: 158, height: 48 }}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>

      {/* Form below */}

      <Box component="form" noValidate>
        <Stack sx={{ position: "relative", bottom: 40 }} spacing={2}>
          <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
            Edit Your Profile
          </Typography>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              sx={{
                fontFamily: "Inter",
                color: "#828282",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                width: 100,
              }}
              align="left"
            >
              First Name:
            </Typography>
            <TextField
              fullWidth
              id="firstName"
              placeholder="Marc"
              name="firstName"
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              sx={{
                fontFamily: "Inter",
                color: "#828282",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                width: 100,
              }}
              align="left"
            >
              Last Name:
            </Typography>
            <TextField
              fullWidth
              id="lastName"
              placeholder="Benioff"
              name="lastName"
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              sx={{
                fontFamily: "Inter",
                color: "#828282",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                width: 100,
              }}
              align="left"
            >
              Email Address:
            </Typography>
            <TextField
              fullWidth
              id="email"
              placeholder="marcbenioff@gmail.com"
              name="email"
              autoComplete="email"
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              sx={{
                fontFamily: "Inter",
                color: "#828282",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                width: 100,
              }}
              align="left"
            >
              Password:
            </Typography>
            <TextField
              fullWidth
              name="password"
              placeholder="**************"
              type="password"
              id="password"
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              sx={{
                fontFamily: "Inter",
                color: "#828282",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                width: 100,
              }}
              align="left"
            >
              Confirm Password:
            </Typography>
            <TextField
              fullWidth
              name="confirmPassword"
              placeholder="**************"
              type="password"
              id="confirmPassword"
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              sx={{
                fontFamily: "Inter",
                color: "#828282",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                width: 100,
              }}
            >
              Location:
            </Typography>

            <FormControl fullWidth>
              <Select
                labelId="demo-controlled-open-select-label"
                id="location"
                value={location}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"San Francisco, CA"}>
                  San Francisco, CA
                </MenuItem>
                <MenuItem value={"New York, NY"}>New York, NY</MenuItem>
                <MenuItem value={"Austin, TX"}>Austin, TX</MenuItem>
                <MenuItem value={"Seattle, WA"}>Seattle, WA</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              sx={{
                fontFamily: "Inter",
                color: "#828282",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                width: 100,
              }}
              align="left"
            >
              Company:
            </Typography>
            <TextField
              fullWidth
              name="company"
              placeholder="Salesforce"
              id="company"
            />
          </Stack>
          <Stack direction="row" spacing={3}>
            <Typography
              sx={{
                fontFamily: "Inter",
                color: "#828282",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                width: 100,
              }}
              align="left"
            >
              Bio:
            </Typography>
            <TextField
              multiline
              rows={3}
              fullWidth
              placeholder="Enter a short bio here"
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export function MyReservations() {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 45, mt: 3, mb: 1.5 }}>
        My Event Reservations
      </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 30, mt: 4, mb: 2 }}>
        Upcoming
      </Typography>
      <EventCardHorizontal
        eventCategory={"FUN"}
        eventHost={"david"}
        eventDescription={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit hic praesentium nihil consequatur cupiditate ratione a dolorem voluptates eaque iusto, dolore sint temporibus maxime ipsa! Repellendus laboriosam excepturi velit error. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit hic praesentium nihil consequatur cupiditate ratione a dolorem voluptates eaque iusto, dolore sint temporibus maxime ipsa! Repellendus laboriosam excepturi velit error."
        }
        startDate={"April 1st, 2022"}
        eventName={"Pool Party"}
        eventImageUrl={
          "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F184375039%2F474927372937%2F1%2Foriginal.20211111-155142?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C236%2C4724%2C2362&s=ff52e826c551abbd9a90a39cccc5c303"
        }
        eventId={2}
      />
      <Typography sx={{ fontWeight: 500, fontSize: 30, mt: 4, mb: 2 }}>
        Previous Events
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <SmallEventCard
            eventCategory={"FUN"}
            eventHost={"david"}
            startDate={"April 1st, 2022"}
            eventName={"Pool Party"}
            eventImageUrl={
              "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F184375039%2F474927372937%2F1%2Foriginal.20211111-155142?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C236%2C4724%2C2362&s=ff52e826c551abbd9a90a39cccc5c303"
            }
            eventId={2}
          />
        </Grid>
        <Grid item xs={6}>
          <SmallEventCard
            eventCategory={"FUN"}
            eventHost={"david"}
            startDate={"April 1st, 2022"}
            eventName={"Pool Party"}
            eventImageUrl={
              "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F184375039%2F474927372937%2F1%2Foriginal.20211111-155142?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C236%2C4724%2C2362&s=ff52e826c551abbd9a90a39cccc5c303"
            }
            eventId={2}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export function MyEventListings() {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 45, mt: 3, mb: 1.5 }}>
        My Event Listings
      </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 30, mt: 4, mb: 2 }}>
        Upcoming
      </Typography>
      <EventCardHorizontal
        eventCategory={"FUN"}
        eventHost={"david"}
        eventDescription={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit hic praesentium nihil consequatur cupiditate ratione a dolorem voluptates eaque iusto, dolore sint temporibus maxime ipsa! Repellendus laboriosam excepturi velit error. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit hic praesentium nihil consequatur cupiditate ratione a dolorem voluptates eaque iusto, dolore sint temporibus maxime ipsa! Repellendus laboriosam excepturi velit error."
        }
        startDate={"April 1st, 2022"}
        eventName={"Pool Party"}
        eventImageUrl={
          "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F184375039%2F474927372937%2F1%2Foriginal.20211111-155142?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C236%2C4724%2C2362&s=ff52e826c551abbd9a90a39cccc5c303"
        }
        eventId={2}
      />
      <Typography sx={{ fontWeight: 500, fontSize: 30, mt: 4, mb: 2 }}>
        Previous Events
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <SmallEventCard
            eventCategory={"FUN"}
            eventHost={"david"}
            startDate={"April 1st, 2022"}
            eventName={"Pool Party"}
            eventImageUrl={
              "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F184375039%2F474927372937%2F1%2Foriginal.20211111-155142?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C236%2C4724%2C2362&s=ff52e826c551abbd9a90a39cccc5c303"
            }
            eventId={2}
          />
        </Grid>
        <Grid item xs={6}>
          <SmallEventCard
            eventCategory={"FUN"}
            eventHost={"david"}
            startDate={"April 1st, 2022"}
            eventName={"Pool Party"}
            eventImageUrl={
              "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F184375039%2F474927372937%2F1%2Foriginal.20211111-155142?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C236%2C4724%2C2362&s=ff52e826c551abbd9a90a39cccc5c303"
            }
            eventId={2}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
