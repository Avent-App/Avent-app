import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import { Container, Stack } from "@mui/material";
import { MyReservations, Sidebar } from "./Settings";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import CircularProgress from "@mui/material/CircularProgress";

export default function Reservations({ user }) {
  //Get all the reservations that a user has using a get request.
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    //get upcoming reservations
    const res = await apiClient.getUpcomingReservations(user.id);
    console.log("res:", res);
    setUpcomingReservations(res.data.upcomingReservations);
    const res2 = await apiClient.getPastReservations(user.id);
    setPastReservations(res2.data.getPastReservations);
    setTimeout(() => setIsLoading(false), 700);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <GlobalNavbar />
      <Container maxWidth="xl">
        <Stack direction="row" spacing={12}>
          <Sidebar selected={"Reservations"} />
          {isLoading ? (
            <Container
              maxWidth={false}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="secondary" size={100} />
            </Container>
          ) : (
            <MyReservations
              user={user}
              upcomingReservations={upcomingReservations}
              pastReservations={pastReservations}
              getData={getData}
            />
          )}
        </Stack>
      </Container>
    </div>
  );
}
