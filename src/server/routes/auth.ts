import express from "express";
const authRoutes = express.Router();

authRoutes.get("/", (req, res) => {
  res.render("login", { title: "battleshippers's site" });
});

authRoutes.get("/register", (req, res) => {
  res.render("register", { title: "battleshippers's site" });
});

export default authRoutes;
