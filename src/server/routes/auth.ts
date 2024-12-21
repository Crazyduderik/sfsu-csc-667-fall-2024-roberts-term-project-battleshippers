import express from "express";
import { Users } from "../db";

const authRoutes = express.Router();

//Default to the login page
authRoutes.get("", (req, res) => {
  res.redirect("login");
});

/* Login */

authRoutes.get("/login", (req, res) => {
  res.render("login", { title: "battleshippers's site" });
});

authRoutes.post("/login", async (request, response) => {
  console.log("Request Body:", request.body);
  console.log("Headers:", request.headers);
  const { email, password } = request.body;

  try {
    const user = await Users.login(email, password);
    // @ts-expect-error TODO: Define the session type for the user object
    request.session.user = user;

    response.redirect("/lobby");
  } catch (error) {
    console.error(error);

    request.flash("error", error as string);
    response.redirect("/auth/login");
  }
});

//Destroys Session and bails out to index page
authRoutes.get("/logout", (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
});

/* Registration */

authRoutes.get("/register", (req, res) => {
  res.render("register", { title: "battleshippers's site" });
});

authRoutes.post("/register", async (request, response) => {
  const { username, email, password } = request.body;

  try {
    const user = await Users.register(username, email, password);
    // @ts-expect-error TODO: Define the session type for the user object
    request.session.user = user;

    response.redirect("/lobby");
  } catch (error) {
    console.error(error);

    request.flash("error", "Failed to register user");
    response.redirect("/auth/register");
  }
});

/* Account Management */

export default authRoutes;
