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
import { useState } from "react";
import apiClient from "../services/apiClient";
import Zoom from "@mui/material/Zoom";
import Alert from "@mui/material/Alert";

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

export function Sidebar({ selected, user }) {
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
            {user.first_name}
            <br />
            {user.last_name}
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
            {user.email}
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
            {user.location}
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

export function MyProfile({ user, setUser }) {
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [alertVisibility, setAlertVisibility] = useState(false);

  async function getUserFromToken() {
    if (await apiClient.getToken()) {
      const res = await apiClient.fetchUserFromToken();
      setUser(res.data.user);
    }
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setErrors((e) => ({ ...e, form: null }));
    const data = new FormData(event.currentTarget);
    //If the field is filled out, use the data in the field. Otherwise, use the current user data.
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    const company = data.get("company");
    const biography = data.get("biography");

    if (location == "") {
      setLocation(user.location);
    }

    const updatedInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      company: company,
      biography: biography,
      location: location,
    };

    try {
      //Attempt to update the user info with the given object.
      const res = await apiClient.updateUserInfo(user.id, updatedInfo);
      if (res?.data?.user) {
        //If the update goes through, create a new token using the new updated parameters.
        //Set that token in local storage.
        apiClient.setToken(res.data.token);
        //Call getUserFromToken someway or app will trigger it byself because of state change idk
        getUserFromToken();
        setAlertVisibility(true);
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with the update",
        }));
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
    }
  };

  const handleLocChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocClose = () => {
    setLocationOpen(false);
  };

  const handleLocOpen = () => {
    setLocationOpen(true);
  };

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
            type="submit"
            form="userForm"
            sx={{ width: 158, height: 48 }}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>

      {/* Form below */}

      <Box component="form" id="userForm" noValidate onSubmit={handleOnSubmit}>
        <Stack sx={{ position: "relative", bottom: 40 }} spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
              Edit Your Profile
            </Typography>
            <Zoom
              in={alertVisibility}
              timeout={{ enter: 300, exit: 300 }}
              addEndListener={() => {
                setTimeout(() => {
                  setAlertVisibility(false);
                }, 4000);
              }}
            >
              <Alert severity="success" sx={{ height: 50 }}>
                You have successfully updated your profile!
              </Alert>
            </Zoom>
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
              First Name:
            </Typography>
            <TextField
              fullWidth
              id="firstName"
              placeholder={user.first_name}
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
              placeholder={user.last_name}
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
              placeholder={user.email}
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
              autoComplete="password"
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
                open={locationOpen}
                onClose={handleLocClose}
                onOpen={handleLocOpen}
                value={location}
                onChange={handleLocChange}
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
              placeholder={user.company}
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
              id="biography"
              name="biography"
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export function MyReservations({
  upcomingReservations,
  pastReservations,
  getData,
  pageType,
}) {
  const renderUpcomingReservations = () => {
    if (upcomingReservations.length > 0) {
      return (
        <Box>
          {upcomingReservations.map((reservation, idx) => {
            return (
              <EventCardHorizontal
                key={idx}
                eventCategory={reservation.event_category}
                eventHost={`${reservation.first_name} ${reservation.last_name}`}
                eventDescription={reservation.description}
                startDate={new Date(reservation.start_date).toLocaleString(
                  "en-US",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }
                )}
                eventName={reservation.title}
                eventImageUrl={reservation.image_url}
                eventId={reservation.event_id}
                reservationId={reservation.reservation_id}
                getData={getData}
                pageType={pageType}
              />
            );
          })}
        </Box>
      );
    } else {
      return <Typography>Nothing to show!</Typography>;
    }
  };

  const renderPastReservations = () => {
    if (pastReservations.length > 0) {
      return (
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {pastReservations.map((reservation, idx) => {
            return (
              <Grid key={idx} item xs={6}>
                <SmallEventCard
                  eventCategory={reservation.event_category}
                  eventHost={`${reservation.first_name} ${reservation.last_name}`}
                  startDate={new Date(reservation.start_date).toLocaleString(
                    "en-US",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  )}
                  eventName={reservation.title}
                  eventImageUrl={reservation.image_url}
                  eventId={reservation.event_id}
                  reservationId={reservation.reservation_id}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return <Typography>Nothing to show!</Typography>;
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 45, mt: 3, mb: 1.5 }}>
        My Event Reservations
      </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 30, mt: 4, mb: 2 }}>
        Upcoming
      </Typography>
      {renderUpcomingReservations()}
      <Typography sx={{ fontWeight: 500, fontSize: 30, mt: 4, mb: 2 }}>
        Previous Events
      </Typography>
      {renderPastReservations()}
    </Box>
  );
}

export function MyEventListings({
  user,
  pastListings,
  upcomingListings,
  getData,
  pageType,
}) {
  const renderUpcomingListings = () => {
    if (upcomingListings.length > 0) {
      return (
        <Box>
          {upcomingListings.map((listing, idx) => {
            return (
              <EventCardHorizontal
                key={idx}
                eventCategory={listing.event_category}
                eventHost={`${listing.first_name} ${listing.last_name}`}
                eventDescription={listing.description}
                startDate={new Date(listing.start_date).toLocaleString(
                  "en-US",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }
                )}
                eventName={listing.title}
                eventImageUrl={listing.image_url}
                eventId={listing.event_id}
                reservationId={listing.reservation_id}
                getData={getData}
                pageType={pageType}
              />
            );
          })}
        </Box>
      );
    } else {
      return <Typography>Nothing to show!</Typography>;
    }
  };

  const renderPastListings = () => {
    if (pastListings.length > 0) {
      return (
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {pastListings.map((listing, idx) => {
            return (
              <Grid key={idx} item xs={6}>
                <SmallEventCard
                  eventCategory={listing.event_category}
                  eventHost={`${listing.first_name} ${listing.last_name}`}
                  startDate={new Date(listing.start_date).toLocaleString(
                    "en-US",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  )}
                  eventName={listing.title}
                  eventImageUrl={listing.image_url}
                  eventId={listing.event_id}
                  reservationId={listing.reservation_id}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return <Typography>Nothing to show!</Typography>;
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 45, mt: 3, mb: 1.5 }}>
        My Event Listings
      </Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 30, mt: 4, mb: 2 }}>
        Upcoming
      </Typography>
      {renderUpcomingListings()}
      <Typography sx={{ fontWeight: 500, fontSize: 30, mt: 4, mb: 2 }}>
        Previous Events
      </Typography>
      {renderPastListings()}
    </Box>
  );
}
