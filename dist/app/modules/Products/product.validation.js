"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
// src/validators/productValidation.ts
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            message: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        title: zod_1.z.string({
            message: 'Title is required',
            invalid_type_error: 'Title must be a string',
        }),
        price: zod_1.z.number({
            message: 'Price is required',
            invalid_type_error: 'Price must be a number',
        }),
        description: zod_1.z.string({
            message: 'Description is required',
            invalid_type_error: 'Description must be a string',
        }),
        category: zod_1.z.string({
            message: 'Category is required',
            invalid_type_error: 'Category must be a string',
        }),
        countInStock: zod_1.z.number({
            message: 'Count in stock is required',
            invalid_type_error: 'Count in stock must be a number',
        }),
        imageUrl: zod_1.z.string({
            message: 'Image URL is required',
            invalid_type_error: 'Image URL must be a string',
        }),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            message: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }).optional(),
        title: zod_1.z.string({
            message: 'Title is required',
            invalid_type_error: 'Title must be a string',
        }).optional(),
        price: zod_1.z.number({
            message: 'Price is required',
            invalid_type_error: 'Price must be a number',
        }).optional(),
        description: zod_1.z.string({
            message: 'Description is required',
            invalid_type_error: 'Description must be a string',
        }).optional(),
        category: zod_1.z.string({
            message: 'Category is required',
            invalid_type_error: 'Category must be a string',
        }).optional(),
        countInStock: zod_1.z.number({
            message: 'Count in stock is required',
            invalid_type_error: 'Count in stock must be a number',
        }).optional(),
        imageUrl: zod_1.z.string({
            message: 'Image URL is required',
            invalid_type_error: 'Image URL must be a string',
        }).optional(),
    }),
});
exports.ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
