import express from "express";
const loggedin_landingRoutes = express.Router();

loggedin_landingRoutes.get("/", (req, res) => {
  res.render("loggedin-landing", { title: "LOGGGIN" });
});

export default loggedin_landingRoutes;
