import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Stack, Box, Container, Link } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  clickableIcon: {
    color: "black",
    "&:hover": {
      color: "#D90429",
    },
    cursor: "pointer",
  },
}));

export default function GlobalNavbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  /**
   * Function that handles when the logs out
   */
  const handleOnLogout = () => {
    // setAppState({});
    // setUserLoggedIn(false);
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
            <Link to="/feed" color="secondary" component={RouterLink} underline="none">
              Avent
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={5}>
              <Button color="inherit">Item 1</Button>
              <Button color="inherit">Item 2</Button>
              <Button color="inherit">About Us</Button>
              <Button color="inherit">Item 4</Button>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
              <AddCircleOutlineIcon onClick={(event) => (window.location.href = "createEvent")} className={classes.clickableIcon} />
              <NotificationsNoneOutlinedIcon />
              <SettingsOutlinedIcon className={classes.clickableIcon} />
              <Avatar />
              <LogoutIcon onClick={handleOnLogout} className={classes.clickableIcon} />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
