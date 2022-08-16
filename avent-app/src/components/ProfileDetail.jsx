import React from "react";
import {
  Typography,
  Stack,
  Box,
  Grid,
  Divider,
  Paper,
  Avatar,
  Container,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ellipse from "../assets/Ellipse.png";
import { useEffect, useState } from "react";
import SmallEventCard from "./SmallEventCard";
import apiClient from "../services/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import GlobalNavbar from "./GlobalNavbar";
import CircularProgress from "@mui/material/CircularProgress";

/************************************************PROFILE DETAIL*/
/**
 *
 * @param {*} param0 gets the user's authentication. stateVar drilled down from app.jsx
 * @returns
 */
const ProfileDetail = ({ user }) => {
  const { userId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  let navigate = useNavigate();

  //fetching user by id
  const getUserData = async () => {
    try {
      setIsLoading(true);
      const res2 = await apiClient.getUser(userId);
      setUserData(res2.data);
      console.log("USER:res2----->", res2);
      setTimeout(() => setIsLoading(false), 400);
    } catch (e) {
      console.log(e);
      navigate("/404");
    }
  };

  const getReservationsData = async () => {
    setIsLoading(true);
    //get upcoming reservations
    const res = await apiClient.getUpcomingReservations(userId);
    console.log("res:", res.data.upcomingReservations);
    setReservations(res.data.upcomingReservations);
    // const res2 = await apiClient.getPastReservations(userId);
    // setPastReservations(res2.data.getPastReservations);
    // setTimeout(() => setIsLoading(false), 700);
  };

  useEffect(() => {
    getUserData();
    getReservationsData();
  }, [user]);

  /**
   *
   * @returns this func maps the array of reservations and creates a card for each one, if not returns "Nothing to show"
   */
  const renderReservations = () => {
    if (reservations.length > 0) {
      return (
        <Grid container spacing={5} sx={{ mb: 5, width: "90%" }}>
          {reservations.map((reservation, idx) => {
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
                  eventImageUrl={reservation.user_img}
                  eventId={reservation.event_id}
                  reservationId={reservation.reservation_id}
                  hostId={reservation.host_id}
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
    <div className="DIVV">
      <GlobalNavbar user={user} />

      <img
        style={{ width: "100%", height: "340px" }}
        src={
          "https://www.jvs.org/wp-content/uploads/2020/03/SalesforceFellowship_banner.jpg)"
        }
      />

      <Stack>
        {isLoading ? (
          <Container
            maxWidth={false}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 30,
            }}
          >
            <CircularProgress color="secondary" size={120} />
          </Container>
        ) : (
          <>
            <Stack
              className="mainCardStack"
              sx={{ flexDirection: "row", gap: "12rem" }}
            >
              <Stack>
                <UserInformation user={user} userData={userData} />
              </Stack>

              <Stack className="cardStack">
                <Typography sx={{ fontSize: 35, fontWeight: "bold", my: 2 }}>
                  Events Attending
                </Typography>

                {renderReservations()}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </div>
  );
};

/************************************************USER INFORMATION */
/**
 *
 * @param {*} param0
 * @returns
 */
function UserInformation({ userData }) {
  return (
    <Box
      className="WhiteInfoBox"
      sx={{
        height: 700,
        width: 345,
        background:
          "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(247.52deg, rgba(255, 0, 0, 0.17) 1.52%, rgba(255, 255, 255, 0) 96.99%)",
        border: "border: 2.63915px solid rgba(155, 153, 153, 0.17)",
        boxShadow: "7.03774px 7.91745px 65px rgba(66, 66, 66, 0.21)",
        borderRadius: "22px",
        position: "relative",
        bottom: 240,
        right: -110,
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Stack direction="row" spacing={5.375} alignItems="right">
        <Box sx={{ width: 291, height: 710, mt: 1 }}>
          <Avatar
            sx={{ position: "absolute", height: 169, width: 169, mx: 7, my: 5 }}
            style={{ border: "1.68724px solid #26235C" }}
          />
          <img
            style={{ position: "relative", top: "1.9rem", left: "5.8rem" }}
            src={ellipse}
          />
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ my: 3 }}
          >
            <Typography
              align="center"
              sx={{
                fontSize: 28,
                fontWeight: 700,
                lineHeight: "35px",
                marginTop: "1rem",
              }}
            >
              {`${userData.first_name} ${userData.last_name}`}
            </Typography>
            <Typography variant="outlined">
              {" "}
              {`${userData.company} ${userData.account_type}`}
            </Typography>
          </Stack>
          <Paper
            elevation={0}
            sx={{
              width: 291,
              border: "1.01111px solid #E1E1E1",
              borderRadius: "10.11px",
            }}
          >
            <Stack sx={{ m: 4, my: 2 }}>
              <Typography
                sx={{ fontWeight: 400, fontSize: 13, color: "#D90429" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: ".3rem",
                }}
              >
                <AccountBoxIcon />
                <span>About</span>
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 13,
                  textAlign: "left",
                  lineHeight: "21px",
                  marginTop: "10px",
                }}
              >
                {userData.biography}
              </Typography>
            </Stack>
            <Divider />
            <Stack sx={{ m: 4, my: 3 }}>
              <Typography
                sx={{ fontWeight: 400, fontSize: 13, color: "#D90429" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: ".3rem",
                }}
              >
                <MailIcon />
                <span>Email</span>
              </Typography>

              <Typography
                sx={{ fontWeight: 400, fontSize: 13, marginTop: "10px" }}
              >
                {" "}
                {userData.email}{" "}
              </Typography>
            </Stack>
            <Divider />
            <Stack sx={{ ml: 4, my: 3 }}>
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
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
export default ProfileDetail;
