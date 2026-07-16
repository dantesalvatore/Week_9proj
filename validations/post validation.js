const joi = require("joi");

const postValidation = (req, res, next) => {
    const schema = joi.object({
        title: joi.string().min(5).required(),
        content: joi.string().min(20).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Invalid data", error: error.details });
    }
    next();
};

const updateArticleSchema = joi.object({
    title: joi.string().min(5).optional(),
    content: joi.string().min(20).optional(),
});

const validateUpdateArticle = (req, res, next) => {
    const { error } = updateArticleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Invalid data", error: error.details });
    }
    next();
};

module.exports = {
    postValidation,
    validateUpdateArticle
};