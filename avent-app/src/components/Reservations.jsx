import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import { Container, Stack } from "@mui/material";
import { MyReservations, Sidebar } from "./Settings";

export default function Reservations() {
  return (
    <div>
      <GlobalNavbar />
      <Container maxWidth="xl">
        <Stack direction="row" spacing={12}>
          <Sidebar selected={"Reservations"} />
          <MyReservations />
        </Stack>
      </Container>
    </div>
  );
}
