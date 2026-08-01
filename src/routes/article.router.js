const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { postArticle, getAllArticles, getArticleById, updateArticleById, deleteArticleById } = require("../controllers/article.controller");


router.use(requireAuth);

router.post("/articles", postArticle);

router.get("/articles", getAllArticles);

router.get("/articles/:id", getArticleById);

router.put("/articles/:id", updateArticleById);

router.delete("/articles/:id", deleteArticleById);

module.exports = router;