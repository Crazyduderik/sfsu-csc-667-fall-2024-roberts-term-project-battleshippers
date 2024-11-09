import express from "express";
const loggedin_landingRoutes = express.Router();

loggedin_landingRoutes.get("/", (req, res) => {
  res.send("Logged In Landing Route");
});

export default loggedin_landingRoutes;
