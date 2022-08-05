import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import { Container, Stack } from "@mui/material";
import { MyEventListings, Sidebar } from "./Settings";

export default function Listings() {
  return (
    <div>
      <GlobalNavbar />
      <Container maxWidth="xl">
        <Stack direction="row" spacing={12}>
          <Sidebar selected={"Listings"} />
          <MyEventListings />
        </Stack>
      </Container>
    </div>
  );
}
