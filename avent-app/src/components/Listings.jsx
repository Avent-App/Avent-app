import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import { Container, Stack } from "@mui/material";
import { MyEventListings, Sidebar } from "./Settings";
import apiClient from "../services/apiClient";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Listings({ user }) {
  //Get all the listings that a user has using a get request.
  const [upcomingListings, setUpcomingListings] = useState([]);
  const [pastListings, setPastListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    //get upcoming reservations
    const res = await apiClient.getUpcomingUserEventListings(user.id);
    setUpcomingListings(res.data.upcomingListings);
    const res2 = await apiClient.getPastUserEventListings(user.id);
    setPastListings(res2.data.pastListings);
    setTimeout(() => setIsLoading(false), 700);
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <div>
      <GlobalNavbar />
      <Container maxWidth="xl">
        <Stack direction="row" spacing={12}>
          <Sidebar selected={"Listings"} user={user} />
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
            <MyEventListings
              upcomingListings={upcomingListings}
              pastListings={pastListings}
              user={user}
              getData={getData}
              pageType={"listings"}
            />
          )}
        </Stack>
      </Container>
    </div>
  );
}

//Route is http://localhost:3001/event/getListings/:userid
