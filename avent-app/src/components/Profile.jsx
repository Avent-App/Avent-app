import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import { Container, Stack } from "@mui/material";
import { MyProfile, Sidebar } from "./Settings";

export default function Profile() {
  return (
    <div>
      <GlobalNavbar />
      <Container maxWidth="xl">
        <Stack direction="row" spacing={12}>
          <Sidebar selected={"Profile"} />
          <MyProfile />
        </Stack>
      </Container>
    </div>
  );
}
