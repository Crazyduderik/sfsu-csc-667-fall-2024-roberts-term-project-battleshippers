import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
  response.render("root", { title: "battleshippers's site" });
});

export default router;
