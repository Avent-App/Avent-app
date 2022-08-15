import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import NoPhoto from "../assets/No-Photo-Available.jpeg";
import {
  CardActionArea,
  CardActions,
  Stack,
  Avatar,
  Link,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function SmallEventCard({
  eventImageUrl,
  eventCategory,
  startDate,
  eventName,
  eventHost,
  eventId,
  listingHostImg,
}) {
  let navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        height: 123,
        borderRadius: "17px",
        boxShadow: "0px 26.1132px 69.6352px rgba(0, 0, 0, 0.06)",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 312 }}
        image={eventImageUrl}
        alt="Event image"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CardActionArea onClick={() => navigate(`/details/${eventId}`)}>
          <CardContent sx={{ pb: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 0.5 }}
            >
              <Typography
                color="#6E798C"
                sx={{ fontWeight: 600, fontSize: 10 }}
              >
                {eventCategory}
              </Typography>
              <Typography
                color="#6E798C"
                sx={{ fontWeight: 400, fontSize: 10 }}
              >
                {startDate}
              </Typography>
            </Stack>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: 600 }}
            >
              {eventName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ mb: 1, mr: 1, ml: 1, mt: "auto" }}>
          <Avatar
            sx={{ height: 27, width: 27 }}
            alt="profile picture"
            src={listingHostImg}
          >
            {eventHost.charAt(0)}
          </Avatar>
          <Typography
            color="secondary"
            sx={{ fontWeight: 600, fontSize: 12, ml: 1 }}
          >
            {eventHost}
          </Typography>
          <Typography
            style={{ marginLeft: "auto" }}
            color="secondary"
            sx={{ fontWeight: 600, fontSize: 12 }}
          >
            <Link
              to={`/details/${eventId}`}
              color="secondary"
              component={RouterLink}
              underline="none"
            >
              Learn more →
            </Link>
          </Typography>
        </CardActions>
      </Box>
    </Card>
  );
}
