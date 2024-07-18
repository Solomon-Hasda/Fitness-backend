"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
// src/services/cartService.ts
const mongoose_1 = __importDefault(require("mongoose"));
const cart_model_1 = __importDefault(require("./cart.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// Create or update a cart
const createOrUpdateCartInDB = (sessionId, item) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        let cart = yield cart_model_1.default.findOne({ sessionId });
        if (!cart) {
            cart = new cart_model_1.default({
                sessionId,
                items: [],
                totalQuantity: 0,
                totalPrice: 0,
            });
        }
        const existingItemIndex = cart.items.findIndex((cartItem) => cartItem.product.toString() === item.product);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += item.quantity;
        }
        else {
            cart.items.push(item);
        }
        cart.totalQuantity = cart.items.reduce((total, cartItem) => total + cartItem.quantity, 0);
        cart.totalPrice = cart.items.reduce((total, cartItem) => total + cartItem.quantity * cartItem.product.price, 0);
        yield cart.save({ session });
        yield session.commitTransaction();
        yield session.endSession();
        return cart;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create or update cart');
    }
});
// Fetch a cart by session ID
const getCartBySessionIdFromDB = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.default.findOne({ sessionId }).populate('items.product');
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
    return result;
});
// Update a cart item quantity
const updateCartItemInDB = (sessionId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ sessionId });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex >= 0) {
        cart.items[itemIndex].quantity = quantity;
        cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
        yield cart.save();
        return cart;
    }
    else {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found in cart');
    }
});
// Delete a cart item
const deleteCartItemFromDB = (sessionId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ sessionId });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
    yield cart.save();
    return cart;
});
// Clear the cart
const clearCartInDB = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findOne({ sessionId });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
    cart.items = [];
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
    yield cart.save();
    return cart;
});
exports.CartService = {
    createOrUpdateCartInDB,
    getCartBySessionIdFromDB,
    updateCartItemInDB,
    deleteCartItemFromDB,
    clearCartInDB,
};
