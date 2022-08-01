import { Typography, Stack } from "@mui/material";
import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import ErrorImage from "../assets/ErrorImage.png";

export default function NotFound() {
  return (
    <div>
      {/* If the user is logged in, show the glboal navbar. Otherwise, show the other navbar. */}
      <GlobalNavbar />
      <Stack spacing={3} sx={{ mt: 10 }}>
        <Typography
          align="center"
          mt={6}
          sx={{
            fontSize: 45,
            fontWeight: 700,
            lineHeight: "100%",
          }}
        >
          404: Page Not Found
        </Typography>
        <Typography align="center" sx={{ fontSize: 21, fontWeight: 400 }}>
          The requested URL does not exist
        </Typography>
        <img
          src={ErrorImage}
          style={{ maxWidth: "50%", height: "auto", margin: "auto" }}
        />
      </Stack>
    </div>
  );
}
