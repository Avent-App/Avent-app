import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import { Box, Container } from "@mui/system";
import {
  Typography,
  Stack,
  Button,
  Avatar,
  TextField,
  Card,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import NoPhoto from "../assets/No-Photo-Available.jpeg";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

// This page GETS information from the events table using the eventsId param in the URL and displays it to the user.

export default function EventDetails({isLoggedIn, setIsLoggedIn}) {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.getEvent(eventId);
      setEventData(res.data.event[0]);
      const res2 = await apiClient.getUser(res.data.event[0].host_id);
      setUserData(res2.data);
      setIsLoading(false);
      setTimeout(() => setIsLoading(false), 400);
    } catch (e) {
      console.log(e);
      navigate("/404");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <GlobalNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      {isLoading ? (
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" size={100} />
        </Container>
      ) : (
        <Container maxWidth="xl">
          <img
            style={{ width: "100%", height: "600px" }}
            src={eventData.image_url ? eventData.image_url : NoPhoto}
          />
          <EventInformation eventData={eventData} userData={userData} />
          <Stack>
            <CommentSection />
            <Comment />
          </Stack>
        </Container>
      )}
    </div>
  );
}

function EventInformation({ eventData, userData }) {
  const startDate = new Date(eventData.start_date);
  const endDate = new Date(eventData.end_date);

  return (
    <Box
      sx={{
        height: 430,
        width: 1069,
        background:
          "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(247.52deg, rgba(255, 0, 0, 0.17) 1.52%, rgba(255, 255, 255, 0) 96.99%)",
        border: "border: 2.63915px solid rgba(155, 153, 153, 0.17)",
        boxShadow: "7.03774px 7.91745px 65px rgba(66, 66, 66, 0.21)",
        borderRadius: "22px",
        position: "relative",
        bottom: 100,
        left: 185,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={5.375} alignItems="center">
        <Stack spacing={0.2} sx={{ ml: 9, display: "flex", width: 543 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 34 }}>
            {eventData.title}
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
            Description:
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 20,
              color: "#828282",
              lineHeight: "23.82px",
              display: "flex",
            }}
          >
            {eventData.description}
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
            Location:
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 500,
              fontSize: 20,
              width: 500,
              height: 24,
              color: "#828282",
              display: "flex",
            }}
          >
            {eventData.address}
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 20, display: "flex" }}>
            Date:
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 500,
              fontSize: 20,
              color: "#828282",
              display: "flex",
            }}
          >
            {`${startDate.toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })} - ${endDate.toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}`}
          </Typography>
          <Stack direction="row" spacing={5}>
            {/* Figure out how to change the button outline colors */}
            <Button
              color="secondary"
              variant="outlined"
              sx={{ height: 38, width: 176, fontWeight: 800 }}
            >
              Message Host
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              sx={{ height: 38, width: 176 }}
            >
              Share
            </Button>
          </Stack>
        </Stack>
        <HostInfo userData={userData} />
      </Stack>
    </Box>
  );
}

function HostInfo({ userData }) {
  //Use host id to GET host information.

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ display: "flex", width: 359 }}
    >
      <Avatar
        sx={{ height: 169, width: 169 }}
        style={{ border: "1.68724px solid #26235C" }}
      />
      <Typography align="center" sx={{ fontWeight: 700, fontSize: 30 }}>
        {`${userData.first_name} ${userData.last_name}`}
      </Typography>
      <Typography align="center" sx={{ fontWeight: 400, fontSize: 19 }}>
        {`${userData.company} ${userData.account_type}`}
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        disableElevation
        sx={{ width: 158, height: 43.2, borderRadius: "5.6px" }}
      >
        RSVP
      </Button>
    </Stack>
  );
}

function CommentSection() {
  return (
    <Box>
      <Typography
        align="center"
        sx={{ fontWeight: 700, fontSize: "36px", mb: 4 }}
      >
        Comments
      </Typography>
      <Stack
        sx={{ position: "relative", left: 185 }}
        direction="row"
        spacing={3.25}
      >
        <Avatar sx={{ height: 58, width: 58 }} />
        <TextField
          multiline
          rows={3}
          label="Add a comment..."
          sx={{ width: "838px" }}
        />
        <Button
          color="secondary"
          variant="contained"
          sx={{
            height: 45,
            width: 120,
            borderRadius: "6px",
            padding: "12.1333px 18.2px",
            fontWeight: "bold",
          }}
          disableElevation
          startIcon={<SendIcon />}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}

function Comment() {
  return (
    <Box>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "relative", left: 185, mt: 4, mr: 54.5 }}
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar></Avatar>
          <Typography fontWeight="bold">username</Typography>
          <Typography>createdAt</Typography>
        </Stack>
        <Button
          variant="text"
          sx={{
            fontWeight: 500,
          }}
          startIcon={<ReplyIcon />}
        >
          Reply
        </Button>
      </Stack>
      <Typography
        sx={{
          width: "1024px",
          position: "relative",
          left: 185,
          mt: 2.625,
          mb: 8,
        }}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit ipsam ut
        mollitia numquam fugiat modi repudiandae, in autem labore, quia ab
        itaque, id odio iure sint at eum doloribus et!
      </Typography>
    </Box>
  );
}
