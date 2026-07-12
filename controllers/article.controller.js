const Joi = require("joi");
const ArticleModel = require("../models/article.model");


const postArticle = async (req, res, next) => {

    const ArticleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(20).required(),
        author: Joi.string().optional.default("Guest"),
    });
const {error,value} = articleSchema.validate(req.body)
if (error) {
    return res.status(400).json("please provide valid data")
    try {
         const newArticle = new ArticleModel(value);
         await newArticle.save();
         return res.status(200).json({message:"article created", data:newArticle});
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getAllArticles = async (req, res, next) => {
    try {
        const articles = await ArticleModel.find();
        return res.status(200).json({message:"all articles", data:articles});
    
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getArticleById = async (req, res, next) => {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
        return res.status(404).json({message:"article not found"});
    }
    return res.status(200).json({message:"article found", data:article});
};
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json({ message: "Article updated", data: updatedArticle });
    
    } catch (error) {
        next(error);
    }
};

const updateArticleById = async (req, res, next) => {
    const ArticleSchema = Joi.object({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(20).optional(),
        author: Joi.string().optional(),
    });
    const { error, value } = ArticleSchema.validate(value);

    if (error) {
        return res.status(400).json({ message: "Invalid data", error: error.details });
    }   
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json({ message: "Article updated", data: updatedArticle });
    } catch (error) {
        next(error);
    }
};

const deleteArticleById = async (req, res, next) => {
    try 
    {
        const deletedArticle = await ArticleModel.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json({ message: "Article deleted", data: deletedArticle });
    
    } catch (error) {
        next(error);
    }
};

const getAllArticles = async (req, res, next) => {
    const {limit = 10, page = 1} = req.query; 
    const skip = (page - 1) * limit;

    try {
        const articles = await ArticleModel.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
        return res.status(200).json({message:"all articles", data:articles});
    
    } catch (error) {
        next(error);
    }
};

const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({message:"article not found"});
        }
        return res.status(200).json({message:"article found", data:article});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById
};  