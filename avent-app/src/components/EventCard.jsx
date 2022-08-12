import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import NoPhoto from "../assets/No-Photo-Available.jpeg";
import {
  Button,
  CardActionArea,
  CardActions,
  Stack,
  Avatar,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function EventCard({
  eventImageUrl,
  eventCategory,
  startDate,
  eventName,
  eventDescription,
  eventHost,
  eventId,
  hostId,
}) {
  let navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "100%",
        height: "435px",
        borderRadius: "17px",
        boxShadow: "0px 26.1132px 69.6352px rgba(0, 0, 0, 0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea onClick={() => navigate(`/details/${eventId}`)}>
        <CardMedia
          component="img"
          height="182px"
          image={eventImageUrl ? eventImageUrl : NoPhoto}
          alt="event picture"
        />
        <CardContent sx={{ pb: 0, height: "180px" }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography color="#6E798C" sx={{ fontWeight: 600, fontSize: 12 }}>
              {eventCategory}
            </Typography>
            <Typography color="#6E798C" sx={{ fontWeight: 400, fontSize: 12 }}>
              {startDate}
            </Typography>
          </Stack>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 600 }}
          >
            {eventName}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "4",
              WebkitBoxOrient: "vertical",
            }}
            variant="body2"
            color="text.secondary"
            paragraph
          >
            {eventDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ mb: 1, mr: 1, ml: 1, mt: "auto" }}>
        <Button
          disableRipple
          to={`/profile/${hostId}`}
          color="secondary"
          component={RouterLink}
        >
          <Avatar alt="profile picture">{eventHost.charAt(0)}</Avatar>
          <Typography
            color="secondary"
            sx={{ fontWeight: 600, fontSize: 12, ml: 1 }}
          >
            {eventHost}
          </Typography>
        </Button>
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
    </Card>
  );
}
