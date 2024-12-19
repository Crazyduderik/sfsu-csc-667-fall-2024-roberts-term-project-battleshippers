import express from "express";
const main_lobby = express.Router();

main_lobby.get("/", (req, res) => {
    res.render("main_lobby", { title: "Main Lobby" });
  });
  
  export default main_lobby;
