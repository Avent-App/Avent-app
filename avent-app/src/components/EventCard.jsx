import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack, Avatar } from "@mui/material";

export default function EventCard({ eventImageUrl, eventCategory, startDate, eventName, eventDescription, eventHost }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 435,
        borderRadius: "17px",
        boxShadow: "0px 26.1132px 69.6352px rgba(0, 0, 0, 0.06)",
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="182" image={eventImageUrl} alt="event picture" />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography color="#6E798C" sx={{ fontWeight: 600, fontSize: 12 }}>
              {eventCategory}
            </Typography>
            <Typography color="#6E798C" sx={{ fontWeight: 400, fontSize: 12 }}>
              {startDate}
            </Typography>
          </Stack>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {eventName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {eventDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack direction="row" alignItems="center" spacing={10}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ ml: 1 }}>
            <Avatar alt="profile picture" />
            <Typography color="secondary" sx={{ fontWeight: 600, fontSize: 12 }}>
              {eventHost}
            </Typography>
          </Stack>
          <Typography color="secondary" sx={{ fontWeight: 600, fontSize: 12 }}>
            Learn more →
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
}
