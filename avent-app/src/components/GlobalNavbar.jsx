import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function GlobalNavbar({}) {
  return (
    <Container
      maxWidth="100vh"
      sx={{ borderBottom: "solid #E2E8F0 2px" }}
      disableGutters={true}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Hero />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 8 }}>
            Lifetracker by 4Life
          </Typography>
          <Button
            component={Link}
            to="/nutrition"
            variant="contained"
            color="secondary"
            sx={{ mr: 8 }}
          >
            Nutrition
          </Button>
          <Button
            component={Link}
            to="/sleep"
            variant="contained"
            color="secondary"
            sx={{ mr: 8 }}
          >
            Sleep
          </Button>
          <Button
            component={Link}
            to="/exercise"
            variant="contained"
            color="secondary"
            sx={{ mr: 8 }}
          >
            Exercise
          </Button>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            sx={{ mr: 8 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export function Hero() {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    ></IconButton>
  );
}
