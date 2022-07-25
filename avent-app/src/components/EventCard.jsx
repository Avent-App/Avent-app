import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Stack,
  Avatar,
} from "@mui/material";

export default function EventCard() {
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
        <CardMedia
          component="img"
          height="182"
          image="https://www.htmlcsscolor.com/preview/gallery/D90429.png"
          alt="green iguana"
        />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography color="#6E798C" sx={{ fontWeight: 600, fontSize: 12 }}>
              BUSINESS
            </Typography>
            <Typography color="#6E798C" sx={{ fontWeight: 400, fontSize: 12 }}>
              3 days ago
            </Typography>
          </Stack>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 600 }}
          >
            Event Name
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack direction="row" alignItems="center" spacing={10}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ ml: 1 }}
          >
            <Avatar alt="profile picture" />
            <Typography
              color="secondary"
              sx={{ fontWeight: 600, fontSize: 12 }}
            >
              Person McPerson
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
