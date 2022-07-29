import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Container,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Container maxWidth="xl" disableGutters={true}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{ backgroundColor: "white" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
            >
              Avent
            </Typography>
            <Stack direction="row" spacing={12}>
              <Stack direction="row" spacing={2}>
                <Button color="inherit">Home</Button>
                <Button color="inherit">About Us</Button>
                <Button color="inherit">Help</Button>
              </Stack>
              <Stack direction="row" spacing={3}>
                <Button
                  color="secondary"
                  variant="contained"
                  to="/login"
                  component={RouterLink}
                  sx={{ height: 42, width: 83 }}
                  disableElevation
                >
                  Login
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  to="/register"
                  component={RouterLink}
                  sx={{ height: 42, width: 83 }}
                  disableElevation
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
}
