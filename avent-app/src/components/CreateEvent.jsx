import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import GlobalNavbar from "./GlobalNavbar";
import createEvent from "../assets/createEvent.png";
import EventCard from "./EventCard";

export default function CreateEvent() {
  const [errors, setErrors] = useState({});

  /**
   *
   * @param {*} event
   * input entered by user in create event form
   */
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setErrors((e) => ({ ...e, form: null }));
    const data = new FormData(event.currentTarget);
    // const navigate = useNavigate();

    //Printing out the data retreived from the createEvent page
    const eventName = data.get("eventName");
    const eventAddress = data.get("eventAddress");
    const eventStartDate = data.get("eventStartDate");
    const eventEndDate = data.get("eventEndDate");
    const eventStartTime = data.get("eventStartTime");
    const eventEndTime = data.get("eventEndTime");
    const eventType = data.get("eventType");
    const eventDescription = data.get("eventDescription");

    const eventsInfo = {
      event_Name: eventName,
      event_Address: eventAddress,
      event_StartDate: eventStartDate,
      event_EndDate: eventEndDate,
      event_StartTime: eventStartTime,
      event_EndTime: eventEndTime,
      event_Type: eventType,
      event_Description: eventDescription,
    };
    console.log(eventsInfo);

    if (
      eventsInfo.event_Name === "" ||
      eventsInfo.event_Address === "" ||
      eventsInfo.event_StartDate === "" ||
      eventsInfo.event_EndDate === "" ||
      eventsInfo.event_StartTime === "" ||
      eventsInfo.event_EndTime === "" ||
      eventsInfo.event_Type === "" ||
      eventsInfo.event_Description === ""
    ) {
      return alert("Please fill out the entire form.");
    }

    /**
     * Post the event info to the correct user id... Each user should have their own exercise info.
     */

    // let params = {
    //   eventsInfo: eventsInfo,
    //   // userId: user.id,
    // };

    try {
      const res = await axios.post("http://localhost:3001/event/create", eventsInfo);
      if (res?.data) {
        console.log("Successfully posted into the database!");
        alert("Congratulations, your event has been successfully created!");
        // navigate("/feed");
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
            backgroundImage: `url(${createEvent})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "150%",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} elevation={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>
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
            <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 1 }}>
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
                  id="eventEndDate"
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
                // onClick={handleOnSubmit}
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
