"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
// src/validators/cartValidation.ts
const zod_1 = require("zod");
const cartItemSchema = zod_1.z.object({
    product: zod_1.z.string({
        message: 'Product ID is required',
        invalid_type_error: 'Product ID must be a string',
    }),
    quantity: zod_1.z.number({
        message: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
    }).min(1, {
        message: 'Quantity must be at least 1',
    }),
});
const createCartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        sessionId: zod_1.z.string({
            message: 'Session ID is required',
            invalid_type_error: 'Session ID must be a string',
        }),
        items: zod_1.z.array(cartItemSchema).default([]),
        totalQuantity: zod_1.z.number({
            message: 'Total quantity is required',
            invalid_type_error: 'Total quantity must be a number',
        }).default(0),
        totalPrice: zod_1.z.number({
            message: 'Total price is required',
            invalid_type_error: 'Total price must be a number',
        }).default(0),
    }),
});
const updateCartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        sessionId: zod_1.z.string({
            message: 'Session ID is required',
            invalid_type_error: 'Session ID must be a string',
        }).optional(),
        items: zod_1.z.array(cartItemSchema).optional(),
        totalQuantity: zod_1.z.number({
            message: 'Total quantity is required',
            invalid_type_error: 'Total quantity must be a number',
        }).optional(),
        totalPrice: zod_1.z.number({
            message: 'Total price is required',
            invalid_type_error: 'Total price must be a number',
        }).optional(),
    }),
});
exports.CartValidation = {
    createCartValidationSchema,
    updateCartValidationSchema,
};
