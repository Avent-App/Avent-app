import * as React from "react";
import {
  Container,
  Typography,
  Stack,
  Box,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import GlobalNavbar from "./GlobalNavbar";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import CircularProgress from "@mui/material/CircularProgress";

export default function EventFeed({}) {
  return (
    <div>
      <GlobalNavbar />
      <Hero />
      <Container maxWidth="xl" sx={{ mb: 5 }}>
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
        <Typography
          align="center"
          sx={{ fontWeight: 400, fontSize: 16, lineHeight: "22px" }}
        >
          Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
          no suscipit quaerendum. <br /> At nam minimum ponderum. Est audiam
          animal molestiae te.
        </Typography>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={3}
      >
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
  const [eventsData, setEventsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  /**
   * On load, get event data from the link...
   */
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/event`)
      .then((response) => {
        setEventsData(response.data.events);
      })
      .catch((e) => {
        // console.log("id is empty");
      })
      .finally((res) => {
        setTimeout(() => setIsLoading(false), 400);
      });
  }, []);

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
                eventImageUrl={event.image_url}
                eventHost={event.host_id}
              />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Typography
          variant="h5"
          sx={{
            color: "black",
            top: 100,
            fontWeight: "bold",
            mb: 5,
            mt: 5,
            display: "flex",
            alignContent: "center",
          }}
        >
          Nothing to show!
        </Typography>
      );
    }
  };

  return (
    <div>
      <Box sx={{ mt: 11, mb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: 700, fontSize: 45 }}>
            Explore
          </Typography>
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
