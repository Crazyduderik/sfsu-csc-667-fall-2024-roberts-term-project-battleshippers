import express from "express";
const loggedin_landingRoutes = express.Router();

loggedin_landingRoutes.get("/", (req, res) => {
  res.render("loggedout-landing", { title: "LOGGGOUT" });
});

export default loggedin_landingRoutes;
