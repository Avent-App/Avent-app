import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import GlobalNavbar from "./GlobalNavbar";

export default function CreateEvent() {
  const [eventsData, setEventsData] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);

    const eventName = data.get("eventName");
    const eventAddress = data.get("eventAddress");
    const eventStartDate = data.get("eventEndDate");
    const eventStartTime = data.get("eventStartTime");
    const eventEndTime = data.get("eventEndTime");
    const eventType = data.get("eventType");
    const eventDescription = data.get("eventDescription");

    const eventsInfo = {
      eventName: eventName,
      eventAddress: eventAddress,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      eventType: eventType,
      eventDescription: eventDescription,
    };

    console.log(eventsInfo);
    //Post the exercise info to the correct user id... Each user should have their own exercise info.
    let params = {
      eventsInfo: eventsInfo,
      userId: user.id,
    };

    axios.post("http://localhost:3001/topics/event", params).then((response) => {
      console.log("Successfully posted into the database!");
      alert("Congratulations, your event has been successfully created!");
    });
  };

  const newLocal = "eventEndDate";
  return (
    <Container maxWidth="xl">
      <GlobalNavbar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?w=996&t=st=1658940995~exp=1658941595~hmac=1ada56f3592e8e30c21814c6dc9608f291cf78836fcd1dad9d59561faf2efc21)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "150%",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} elevation={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "stretch" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "8rem",
              width: "450px",
              height: "900px",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "32px",
                marginBottom: "2rem",
              }}
            >
              Create an Event
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
                }}
              >
                Event Name
              </label>
              <TextField
                margin="normal"
                fullWidth
                id="eventName"
                placeholder="Event Name"
                name="eventName"
                autoComplete="eventName"
                autoFocus
                style={{ marginTop: "8px" }}
              />
              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
                }}
              >
                Event Address
              </label>
              <TextField
                margin="normal"
                fullWidth
                name="eventAddress"
                placeholder="Event Address"
                id="eventAddress"
                autoComplete="eventAddress"
                autoFocus
                style={{ marginTop: "8px" }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <label
                  style={{
                    fontFamily: "Inter",
                    color: "#828282",
                    fontWeight: 600,
                  }}
                >
                  Event Start Date
                </label>
                <label
                  style={{
                    fontFamily: "Inter",
                    color: "#828282",
                    fontWeight: 600,
                    marginRight: "6rem",
                  }}
                >
                  Event End Date
                </label>
              </Box>
              <Box className="namesInput" sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="eventStartDate"
                  placeholder="Event Start Date"
                  name="eventStartDate"
                  autoComplete="eventStartDate"
                  autoFocus
                  style={{ marginTop: "8px" }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id={newLocal}
                  placeholder="Event End Date"
                  name="eventEndDate"
                  autoComplete="eventEndDate"
                  autoFocus
                  style={{ marginTop: "8px" }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <label
                  style={{
                    fontFamily: "Inter",
                    color: "#828282",
                    fontWeight: 600,
                  }}
                >
                  Event Start Time
                </label>
                <label
                  style={{
                    fontFamily: "Inter",
                    color: "#828282",
                    fontWeight: 600,
                    marginRight: "6rem",
                  }}
                >
                  Event End Time
                </label>
              </Box>
              <Box className="namesInput" sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="eventStartTime"
                  placeholder="Event Start Time"
                  name="eventStartTime"
                  autoComplete="eventStartTime"
                  autoFocus
                  style={{ marginTop: "8px" }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="eventEndTime"
                  placeholder="Event End Time"
                  name="eventEndTime"
                  autoComplete="eventEndTime"
                  autoFocus
                  style={{ marginTop: "8px" }}
                />
              </Box>

              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
                }}
              >
                Event Type
              </label>
              <TextField
                margin="normal"
                fullWidth
                id="eventType"
                placeholder="Event Type"
                name="eventType"
                autoComplete="eventType"
                autoFocus
                style={{ marginTop: "8px" }}
              />

              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
                }}
              >
                Event Description
              </label>
              <TextField
                margin="normal"
                fullWidth
                id="eventDescription"
                placeholder="Write a short event description"
                name="eventDescription"
                autoComplete="eventDescription"
                autoFocus
                style={{ marginTop: "8px" }}
                multiline
                rows={4}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{
                  padding: "13px 10px 12px",
                  fontFamily: "Inter",
                  fontWeight: "800",
                  fontStyle: "normal",
                  fontSize: "16px",
                  background: "#EF233C",
                  borderRadius: "6px",
                  marginTop: "32px",
                  textTransform: "none",
                }}
              >
                Create Event
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
