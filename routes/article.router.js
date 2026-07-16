const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { postArticle, getAllArticles, getArticleById, updateArticleById, deleteArticleById } = require("../controllers/article.controller");

router.post("/articles", requireAuth, postArticle);

router.get("/articles", requireAuth, getAllArticles);

router.get("/articles/:id", requireAuth, getArticleById);

router.put("/articles/:id", requireAuth, updateArticleById);

router.delete("/articles/:id", requireAuth, deleteArticleById);

module.exports = router;