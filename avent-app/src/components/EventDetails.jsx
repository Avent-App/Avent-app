import React from "react";
import GlobalNavbar from "./GlobalNavbar";
import { Box, Container } from "@mui/system";
import { Typography, Stack, Button, Avatar, TextField } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";

export default function EventDetails() {
  return (
    <div>
      <GlobalNavbar />
      <Container maxWidth="xl">
        <img
          style={{ width: "100%", height: "482px" }}
          src="https://theperfectevent.com/wp-content/uploads/2020/01/Main-Scroll-2.jpg"
        />
        <EventInformation />
        <Stack>
          <CommentSection />
          <Comment />
        </Stack>
      </Container>
    </div>
  );
}

function EventInformation() {
  return (
    <Box
      sx={{
        height: 470,
        width: 1069,
        background:
          "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(247.52deg, rgba(255, 0, 0, 0.17) 1.52%, rgba(255, 255, 255, 0) 96.99%)",
        border: "border: 2.63915px solid rgba(155, 153, 153, 0.17)",
        boxShadow: "7.03774px 7.91745px 65px rgba(66, 66, 66, 0.09)",
        borderRadius: "22px",
        position: "relative",
        bottom: 100,
        left: 185,
      }}
    >
      <Stack direction="row" spacing={5.375}>
        <Stack spacing={0.2} sx={{ ml: 9, display: "flex", width: 543 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 34, mt: 2 }}>
            Event Name:
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
            Description:
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 20,
              color: "#828282",
              lineHeight: "23.82px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
            Location:
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 500,
              fontSize: 20,
              width: 267,
              height: 24,
              color: "#828282",
            }}
          >
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Date:</Typography>
          <Typography
            gutterBottom
            sx={{ fontWeight: 500, fontSize: 20, color: "#828282" }}
          >
            Lorem ipsum
          </Typography>
          <Stack direction="row" spacing={5}>
            {/* Figure out how to change the button outline colors */}
            <Button
              color="secondary"
              variant="outlined"
              sx={{ height: 38, width: 176, fontWeight: 800 }}
            >
              Message Host
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              sx={{ height: 38, width: 176 }}
            >
              Share
            </Button>
          </Stack>
        </Stack>
        <HostInfo />
      </Stack>
    </Box>
  );
}

function HostInfo() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ display: "flex", width: 359 }}
    >
      <Avatar
        sx={{ height: 169, width: 169, mt: 7.1675 }}
        style={{ border: "1.68724px solid #26235C" }}
      />
      <Typography align="center" sx={{ fontWeight: 700, fontSize: 30 }}>
        David Barcenas
      </Typography>
      <Typography align="center" sx={{ fontWeight: 400, fontSize: 19 }}>
        Salesforce Intern
      </Typography>
      <Stack direction="row" spacing={0.5}>
        <StarIcon sx={{ height: 17, width: 17.2 }} />
        <Typography sx={{ fontWeight: 400, fontSize: 12.6 }}>4.27</Typography>
      </Stack>
      <Typography
        align="center"
        sx={{ fontWeight: 400, fontSize: 17, lineHeight: "20px", pb: 1 }}
      >
        Lorem ipsum dolor sit amet, consectetur adispicing elit, sed do eisumod
        tempor incididunt ut labore.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        sx={{ width: 158, height: 43.2, borderRadius: "5.6px" }}
      >
        RSVP
      </Button>
    </Stack>
  );
}

function CommentSection() {
  return (
    <Box>
      <Typography
        align="center"
        sx={{ fontWeight: 700, fontSize: "36px", mb: 4 }}
      >
        Comments
      </Typography>
      <Stack
        sx={{ position: "relative", left: 185 }}
        direction="row"
        spacing={3.25}
      >
        <Avatar sx={{ height: 58, width: 58 }} />
        <TextField
          multiline
          rows={3}
          label="Add a comment..."
          sx={{ width: "838px" }}
        />
        <Button
          color="secondary"
          variant="contained"
          sx={{
            height: 45,
            width: 120,
            borderRadius: "6px",
            padding: "12.1333px 18.2px",
            fontWeight: "bold",
          }}
          disableElevation
          startIcon={<SendIcon />}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}

function Comment() {
  return (
    <Box>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "relative", left: 185, mt: 4, mr: 54.5 }}
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar></Avatar>
          <Typography fontWeight="bold">username</Typography>
          <Typography>createdAt</Typography>
        </Stack>
        <Button
          variant="text"
          sx={{
            fontWeight: 500,
          }}
          startIcon={<ReplyIcon />}
        >
          Reply
        </Button>
      </Stack>
      <Typography
        sx={{
          width: "1024px",
          position: "relative",
          left: 185,
          mt: 2.625,
          mb: 8,
        }}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit ipsam ut
        mollitia numquam fugiat modi repudiandae, in autem labore, quia ab
        itaque, id odio iure sint at eum doloribus et!
      </Typography>
    </Box>
  );
}
