import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Stack, Box, Container } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function GlobalNavbar() {
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
            Avent
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={5}>
              <Button color="inherit">Item 1</Button>
              <Button color="inherit">Item 2</Button>
              <Button color="inherit">Item 3</Button>
              <Button color="inherit">Item 4</Button>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <AddCircleOutlineIcon />
              <NotificationsNoneOutlinedIcon />
              <SettingsOutlinedIcon />
              <Avatar />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
