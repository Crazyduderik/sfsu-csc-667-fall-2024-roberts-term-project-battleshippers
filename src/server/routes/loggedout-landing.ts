import express from "express";
const loggedout_landingRoutes = express.Router();

loggedout_landingRoutes.get("/", (req, res) => {
  res.send("Logged Out Landing Route");
});

export default loggedout_landingRoutes;
