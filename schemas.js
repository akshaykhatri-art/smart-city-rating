const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');


const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.citySchema = Joi.object({
    city: Joi.object({
        cityname: Joi.string().required().escapeHTML(),
        state: Joi.string().required().escapeHTML(),
        population: Joi.number().required().min(0),
        // image: Joi.string().required(),
        description: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        easeOfLiving: Joi.number().required().min(1).max(5),
        municipalPerformance: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})