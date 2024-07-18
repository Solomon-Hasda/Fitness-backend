"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCartValidation = void 0;
// src/app/modules/Cart/cart.validation.ts
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const cartItemSchema = zod_1.z.object({
    product: zod_1.z.instanceof(mongoose_1.Types.ObjectId), // Ensure this is a valid ObjectId
    quantity: zod_1.z.number().min(1).default(1),
});
const createCartSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
    items: zod_1.z.array(cartItemSchema).default([]),
    totalQuantity: zod_1.z.number().min(0).default(0),
    totalPrice: zod_1.z.number().min(0).default(0),
});
const updateCartSchema = zod_1.z.object({
    sessionId: zod_1.z.string().optional(),
    items: zod_1.z.array(cartItemSchema).optional(),
    totalQuantity: zod_1.z.number().min(0).optional(),
    totalPrice: zod_1.z.number().min(0).optional(),
});
exports.createCartValidation = zod_1.z.object({
    body: createCartSchema,
});
