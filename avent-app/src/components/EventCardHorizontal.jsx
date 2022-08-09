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
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../services/apiClient";

export default function EventCardHorizontal({
  eventImageUrl,
  eventCategory,
  startDate,
  eventName,
  eventDescription,
  eventHost,
  eventId,
  reservationId,
  getData,
}) {
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSubmit = async () => {
    try {
      await apiClient.deleteReservation(reservationId);
      setOpen(false);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        height: 312,
        borderRadius: "17px",
        boxShadow: "0px 26.1132px 69.6352px rgba(0, 0, 0, 0.06)",
        mb: 5,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 312 }}
        image={eventImageUrl ? eventImageUrl : NoPhoto}
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
          <CardContent sx={{ pb: 0, height: "240px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography
                color="#6E798C"
                sx={{ fontWeight: 600, fontSize: 15 }}
              >
                {eventCategory}
              </Typography>
              <Typography
                color="#6E798C"
                sx={{ fontWeight: 400, fontSize: 14 }}
              >
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
                WebkitLineClamp: "7",
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
          <Avatar alt="profile picture" />
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
            <Button variant="text" onClick={handleClickOpen}>
              Cancel Reservation
            </Button>
          </Typography>
        </CardActions>

        <Dialog
          maxWidth="md"
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: { borderRadius: "10px", width: 500 },
          }}
        >
          <DialogTitle sx={{ mt: 1 }}>
            <Typography sx={{ fontWeight: 500, fontSize: 30 }}>
              Cancel your reservation?
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ fontWeight: 400, fontSize: 15 }}>
              If you cancel your reservation, you may not be able to reserve
              again.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mx: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: 500 }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
                disableElevation
                sx={{
                  width: 175,
                  height: 43.2,
                  borderRadius: "5.6px",
                  mb: 1,
                }}
              >
                Keep Reservation
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => handleOnSubmit()}
                sx={{
                  width: 175,
                  height: 43.2,
                  borderRadius: "5.6px",
                  mb: 1,
                }}
              >
                Confirm
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
}
