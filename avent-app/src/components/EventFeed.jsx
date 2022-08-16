import * as React from "react";
import { Container, Typography, Stack, Box, TextField, Button, Grid, Divider, checkboxClasses } from "@mui/material";
import GlobalNavbar from "./GlobalNavbar";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import CircularProgress from "@mui/material/CircularProgress";
import apiClient from "../services/apiClient";
import BridgeBanner from "../assets/BridgePic.png";

export default function EventFeed({ isLoggedIn, setIsLoggedIn, setUser, user }) {
  const [isLoading, setIsLoading] = useState(true);
  //state var to store array of events fetched from database
  const [eventsData, setEventsData] = useState([]);
  //state var to set users input from searchbar
  const [searchItem, setSearchItem] = React.useState("");

  /**
   *asynchronous function for fetching the events data from database
   */
  const getData = async () => {
    setIsLoading(true);
    const res = await apiClient.getEvents();
    console.log(res.data.events);
    setEventsData(res.data.events);
    setTimeout(() => setIsLoading(false), 300);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <GlobalNavbar setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />
      <Hero eventsData={eventsData} setSearchItem={setSearchItem} searchItem={searchItem} user={user} />

      <Container maxWidth="xl" sx={{ mb: 5 }}>
        <Feed
          //filters eventData array and includes the value iputted by user
          eventsData={eventsData.filter((event) => {
            return event.title.toLowerCase().includes(searchItem);
          })}
          isLoading={isLoading}
        />
      </Container>
    </div>
  );
}

function Hero({ setSearchItem, searchItem, user }) {
  return (
    <Box
      alignContent="center"
      justifyContent="center"
      sx={{
        background: "#F4F6FB",
        height: "372px",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${BridgeBanner})`,
      }}
    >
      <Stack spacing={3} sx={{ mb: 4, alignItems: "center" }}>
        <Typography
          align="center"
          mt={10}
          sx={{
            fontSize: 44,
            fontWeight: 700,
            lineHeight: "56px",
            color: "white",
          }}
        >
          Upcoming Events in {user.location}
        </Typography>
        {/* Eventually, San Francisco will be replaced with the city that a user has chosen */}
        <Typography align="center" sx={{ fontWeight: 400, fontSize: 16, lineHeight: "22px" }}>
          San Francisco is a city rich in history, culture and natural beauty. The City by the Bay welcomes <br /> interns from around the world to experience
          its unique charm and vibrancy.
        </Typography>
      </Stack>

      <Stack justifyContent="center" alignItems="center" direction="row" spacing={3}>
        <TextField
          variant="outlined"
          label="Search for an event"
          value={searchItem}
          onChange={(event) => {
            setSearchItem(event.target.value);
          }}
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

function Feed({ eventsData, isLoading }) {
  /**
   *
   * @returns creates a grid of event cards by mapping the eventsData array from the database
   */
  const renderEventCards = () => {
    if (eventsData.length > 0) {
      return (
        <Grid container spacing={{ xl: 4, lg: 3, md: 2, sm: 2 }}>
          {eventsData.map((event, idx) => (
            <Grid key={idx} item xl={3} lg={3} md={4} sm={6} xs={12}>
              <EventCard
                eventName={event.title}
                eventCategory={event.event_category.toUpperCase()}
                startDate={new Date(event.start_date).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                eventDescription={event.description}
                eventHostName={`${event.first_name} ${event.last_name}`}
                eventImageUrl={event.events_img}
                eventId={event.event_id}
                eventHostImg={event.user_img}
                hostId={event.host_id}
              />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Stack sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#D90429",
              top: 100,
              fontWeight: "bold",
              mt: 15,
            }}
          >
            Event does not exist!
          </Typography>
        </Stack>
      );
    }
  };

  return (
    <div>
      <Box sx={{ mt: 5, mb: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
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
        <Divider sx={{ mt: 1 }} />
      </Box>

      {isLoading ? (
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <CircularProgress color="secondary" size={100} />
        </Container>
      ) : (
        renderEventCards()
      )}
    </div>
  );
}
