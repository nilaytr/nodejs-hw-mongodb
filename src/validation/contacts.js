import Joi from 'joi';

const joiPostObject = {
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least 3 characters long',
        'string.max': 'Name should have at most 20 characters',
        'any.required': 'Name is required',
    }),
    phoneNumber: Joi.string().required().messages({
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email should be a valid email address',
    }),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string()
        .valid('work', 'home', 'personal')
        .default('personal')
        .required(),
};

const joiPatchObject = {
    name: Joi.string().min(3).max(20).optional().messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least 3 characters long',
        'string.max': 'Name should have at most 20 characters',
    }),
    phoneNumber: Joi.string().optional(),
    email: Joi.string().email().messages({
        'string.email': 'Email should be a valid email address',
    }),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string()
        .valid('work', 'home', 'personal')
        .default('personal')
        .optional(),
};

export const createContactSchema = Joi.object(joiPostObject);

export const updateContactSchema = Joi.object(joiPatchObject);











































