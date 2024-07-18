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
exports.CartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cartService_1 = require("../services/cartService");
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = require("../utils/catchAsync");
// Add or update cart item
const addToCart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    const { product, quantity } = req.body;
    const cart = yield cartService_1.CartService.createOrUpdateCartInDB(sessionId, { product, quantity });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product added to cart successfully',
        data: cart,
    });
}));
// Get cart by session ID
const getCart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    const cart = yield cartService_1.CartService.getCartBySessionIdFromDB(sessionId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart retrieved successfully',
        data: cart,
    });
}));
// Update cart item quantity
const updateCartItem = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    const { productId, quantity } = req.body;
    const cart = yield cartService_1.CartService.updateCartItemInDB(sessionId, productId, quantity);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart item updated successfully',
        data: cart,
    });
}));
// Delete cart item
const deleteCartItem = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId, productId } = req.params;
    const cart = yield cartService_1.CartService.deleteCartItemFromDB(sessionId, productId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart item deleted successfully',
        data: cart,
    });
}));
// Clear cart
const clearCart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    const cart = yield cartService_1.CartService.clearCartInDB(sessionId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart cleared successfully',
        data: cart,
    });
}));
exports.CartController = {
    addToCart,
    getCart,
    updateCartItem,
    deleteCartItem,
    clearCart,
};
