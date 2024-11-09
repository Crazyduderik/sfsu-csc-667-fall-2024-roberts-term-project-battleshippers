import express from "express";
const authRoutes = express.Router();

authRoutes.get("/", (req, res) => {
  res.send("Auth route");
});

export default authRoutes;
