import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import { Container, Stack } from "@mui/material";
import { MyProfile, Sidebar } from "./Settings";

export default function Profile({ user, setUser }) {
  return (
    <div>
      <GlobalNavbar user={user} />
      <Container maxWidth="xl">
        <Stack direction="row" spacing={12}>
          <Sidebar selected={"Profile"} user={user} />
          <MyProfile user={user} setUser={setUser} />
        </Stack>
      </Container>
    </div>
  );
}
