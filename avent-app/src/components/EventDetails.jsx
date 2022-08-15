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
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import NoPhoto from "../assets/No-Photo-Available.jpeg";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import Zoom from "@mui/material/Zoom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ellipse from "../assets/Ellipse.png";

// This page GETS information from the events table using the eventsId param in the URL and displays it to the user.

export default function EventDetails({ isLoggedIn, setIsLoggedIn, user }) {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [hostData, setHostData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reserved, setReserved] = useState(false);
  const [commentData, setCommentData] = useState([]);

  let navigate = useNavigate();

  const handleOnSubmit = async (comment) => {
    comment.preventDefault();
    const data = new FormData(comment.currentTarget);

    console.log(data.get("sendComment"));

    /**
     * Printing out the data retreived from the createEvent page
     */
    const sendComment = data.get("sendComment");
    const sendCommentSection = eventId;
    const sendUser = user.id;
    const commentInfo = {
      user_id: sendUser,
      comment_section_id: sendCommentSection,
      comment_text: sendComment,
    };

    console.log(commentInfo);

    try {
      const res = await apiClient.postComment(commentInfo);
      getComments();
      if (res?.data) {
        console.log("Successfully posted into the database!");
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
    }
  };

  const getComments = async () => {
    try {
      const res = await apiClient.getComments(eventId);
      console.log("res data:", res.data.comments);
      setCommentData(res.data.comments);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      console.log("HERE IS THE USER DATA: ", user);
      setIsLoading(true);
      const res = await apiClient.getEvent(eventId);
      setEventData(res.data.event[0]);
      const res2 = await apiClient.getUser(res.data.event[0].host_id);
      getComments();
      setHostData(res2.data);
      checkReserved();
      setTimeout(() => setIsLoading(false), 400);
    } catch (e) {
      console.log(e);
      navigate("/404");
    }
  };

  const checkReserved = async () => {
    try {
      const res = await apiClient.checkReserved(eventId, user.id);
      console.log(res.data.getReservation);
      if (res.data.getReservation.length > 0) {
        setReserved(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <div>
      <GlobalNavbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user}
      />
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
          <EventInformation
            eventData={eventData}
            hostData={hostData}
            eventId={eventId}
            user={user}
            reserved={reserved}
            setReserved={setReserved}
          />
          <Stack>
            <CommentSection
              commentData={commentData}
              handleOnSubmit={handleOnSubmit}
              user={user}
              userData={hostData}
            />
          </Stack>
        </Container>
      )}
    </div>
  );
}

function EventInformation({
  eventData,
  hostData,
  eventId,
  user,
  reserved,
  setReserved,
}) {
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
        <HostInfo
          hostData={hostData}
          eventId={eventId}
          user={user}
          reserved={reserved}
          setReserved={setReserved}
        />
      </Stack>
    </Box>
  );
}

function HostInfo({ hostData, eventId, user, reserved, setReserved }) {
  //Use host id to GET host information.
  const [alertVisibility, setAlertVisibility] = useState(false);

  async function handleOnSubmit() {
    const reservationObject = {
      user_id: user.id,
      event_id: parseInt(eventId),
    };
    try {
      const res = await apiClient.createRSVP(reservationObject);
      console.log(res);
      setAlertVisibility(true);
      setReserved(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ display: "flex", width: 359 }}
    >
      <Stack sx={{ mr: 6.4 }}>
        <Avatar
          sx={{ position: "absolute", height: 169, width: 169 }}
          style={{ border: "1.68724px solid #26235C" }}
          src={hostData.image_url}
        />
        <img
          style={{ position: "relative", top: "-.6rem", left: "2.3rem" }}
          src={ellipse}
        />
      </Stack>
      <Typography align="center" sx={{ fontWeight: 700, fontSize: 30 }}>
        {`${hostData.first_name} ${hostData.last_name}`}
      </Typography>
      <Typography align="center" sx={{ fontWeight: 400, fontSize: 19 }}>
        {`${hostData.company} ${hostData.account_type}`}
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        disabled={reserved}
        disableElevation
        onClick={() => handleOnSubmit()}
        sx={{ width: 158, height: 43.2, borderRadius: "5.6px", mt: 1, mb: 1 }}
      >
        RSVP
      </Button>
      {alertVisibility ? (
        <Zoom
          in={alertVisibility}
          timeout={{ enter: 500, exit: 500 }}
          addEndListener={() => {
            setTimeout(() => {
              setAlertVisibility(false);
            }, 4000);
          }}
          sx={{ my: 1 }}
        >
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            You have successfully RSVPed for this event!
          </Alert>
        </Zoom>
      ) : null}
    </Stack>
  );
}

function CommentSection({ commentData, handleOnSubmit, userData, user }) {
  return (
    <Box component="form" onSubmit={handleOnSubmit}>
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
        <Avatar sx={{ height: 58, width: 58 }} src={user.image_url} />
        <TextField
          id="sendComment"
          name="sendComment"
          multiline
          rows={3}
          label="Add a comment..."
          sx={{ width: "838px" }}
        />
        <Button
          color="secondary"
          variant="contained"
          type="submit"
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
      {commentData.map((commentObj, idx) => (
        <Comment key={idx} commentObj={commentObj} hostId={userData.id} />
      ))}
    </Box>
  );
}

function Comment({ commentObj, hostId }) {
  const comment_text = commentObj.comment_text;
  const comment_created_at = commentObj.created_at;
  const comment_firstName_lastName = `${commentObj.first_name} ${commentObj.last_name}`;

  const comment_date = new Date(comment_created_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  
  console.log(commentObj)

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
          <Avatar src={commentObj.image_url}></Avatar>
          <Typography
            sx={{ color: hostId == commentObj.user_id ? "red" : "black" }}
            fontWeight="bold"
          >
            {comment_firstName_lastName}{" "}
            {hostId == commentObj.user_id ? "(Host)" : null}
          </Typography>
          <Typography>{comment_date}</Typography>
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
        {comment_text}
      </Typography>
    </Box>
  );
}
