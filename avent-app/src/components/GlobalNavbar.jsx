import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Stack, Box, Container, Link } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link as RouterLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useEffect } from "react";

export default function GlobalNavbar({ isLoggedIn, setIsLoggedIn, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!apiClient.getToken()) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  /**
   * Function that handles when the user logs out
   */
  const handleOnLogout = () => {
    // setIsLoggedIn(false);
    apiClient.deleteToken();
    // setUser({});
    navigate("/");
  };

  return (
    <Container maxWidth="xl">
      <AppBar position="sticky" elevation={0}>
        <Toolbar disableGutters>
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
              flexGrow: 1,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            <Link
              to="/feed"
              color="secondary"
              component={RouterLink}
              underline="none"
            >
              Avent
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <AddCircleOutlineIcon
                style={{ cursor: "pointer" }}
                sx={[
                  {
                    "&:hover": {
                      color: "red",
                      backgroundColor: "white",
                    },
                  },
                  AddCircleOutlineIcon && {
                    "&:hover": { backgroundColor: "grey" },
                  },
                ]}
                onClick={(event) => (window.location.href = "createEvent")}
              />
              <NotificationsNoneOutlinedIcon />
              <SettingsOutlinedIcon />
              <Avatar />
              <LogoutIcon
                style={{ cursor: "pointer" }}
                sx={[
                  {
                    "&:hover": {
                      color: "red",
                      backgroundColor: "white",
                    },
                  },
                  LogoutIcon && {
                    "&:hover": { backgroundColor: "grey" },
                  },
                  AddCircleOutlineIcon && {
                    "&:hover": { backgroundColor: "grey" },
                  },
                ]}
                onClick={handleOnLogout}
              />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
