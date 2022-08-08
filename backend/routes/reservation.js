const express = require("express");
const Reservation = require("../models/reservation");
const router = express.Router();
const security = require("../middleware/security");

//Route that gets all reservations made by a user.
router.get(
  "/user/:userId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const userId = req.params.userId; //Gets the parameter from the route...
      const reservations = await Reservation.getReservationsByUserId(userId);
      return res.status(200).json({ reservations });
    } catch (err) {
      next(err);
    }
  }
);
//Route that creates reservations
router.post(
  "/create",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const reservation = await Reservation.createReservation(req.body);
      console.log(req.body);
      return res.status(201).json({ reservation });
    } catch (err) {
      next(err);
    }
  }
);
//Route that gets reservations by their id
router.get(
  "/getReservation/:reservationID",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const reservationId = req.params.reservationID;
      const reservation = await Reservation.getReservation(reservationId);
      res.status(201).json({ reservation });
    } catch (err) {
      next(err);
    }
  }
);

//Route that deletes a reservation by ID

router.delete(
  "/delete/:reservationID",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const reservationID = req.params.reservationID;
      const deletedReservation = await Reservation.deleteReservation(
        reservationID
      );
      res.status(201).json({ deletedReservation });
    } catch (err) {
      next(err);
    }
  }
);

//Route that gets upcoming reservations by userId
router.get(
  "/upcoming/:userId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const userID = req.params.userId;
      const upcomingReservations = await Reservation.getUpcomingReservations(
        userID
      );
      res.status(201).json({ upcomingReservations });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/pastEvents/:userId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const userID = req.params.userId;
      const getPastReservations = await Reservation.getPastReservations(userID);
      res.status(201).json({ getPastReservations });
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
