import express from "express";

const router = express.Router();

// Default games/ will redirect to landing page
router.get("/", (req, res) => {
  res.redirect("/");
});

router.get("/:id", (request, response) => {
  const { id } = request.params;

  response.render("games/game", { title: `Game ${id}`, id });
});

router.get("/:id/lobby", (request, response) => {
  const { id } = request.params;

  response.render("games/lobby", { title: "Game lobby", id });
});

export default router;
