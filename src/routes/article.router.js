const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { postArticle, getAllArticles, getArticleById, updateArticleById, deleteArticleById } = require("../controllers/article.controller");

const dns = require("dns");

dns.lookup("www.google.com", (err) => {
  if (err) {
    console.error("Error occured  while resolving DNS:", err);
  } else {
    console.log("DNS resolved successfully");
  }  
});

router.use(requireAuth);

router.post("/articles", postArticle);

router.get("/articles", getAllArticles);

router.get("/articles/:id", getArticleById);

router.put("/articles/:id", updateArticleById);

router.delete("/articles/:id", deleteArticleById);

module.exports = router;