import express from "express";
import { Users } from "../db";

const authRoutes = express.Router();

//Default to the login page
authRoutes.get("", (req, res) => {
  res.redirect("login");
});

authRoutes.get("/login", (req, res) => {
  res.render("login", { title: "battleshippers's site" });
});

authRoutes.get("/register", (req, res) => {
  res.render("register", { title: "battleshippers's site" });
});

export default authRoutes;
