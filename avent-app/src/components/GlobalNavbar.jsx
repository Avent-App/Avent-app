import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Stack,
  Box,
  Container,
  Link,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link as RouterLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useEffect } from "react";

export default function GlobalNavbar({ isLoggedIn, setIsLoggedIn, setUser, user }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!apiClient.getToken()) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  /**
   * Function that handles when the user logs out
   */
  const handleOnLogout = () => {
    apiClient.deleteToken();
    navigate("/");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
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
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <IconButton component={RouterLink} to="/createEvent">
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
                  />
                </IconButton>
                <IconButton>
                  <NotificationsNoneOutlinedIcon />
                </IconButton>
                <IconButton component={RouterLink} to="/settings/profile">
                  <SettingsOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar src={user.image_url}/>
                </IconButton>
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
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={RouterLink} to="/settings/profile">
          My Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/settings/reservations">
          My Reservations
        </MenuItem>
        <MenuItem component={RouterLink} to="/settings/listings">
          My Listings
        </MenuItem>
      </Menu>
    </div>
  );
}

function SettingsMenu() {}
