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
exports.ProductService = void 0;
// src/services/productService.ts
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("./product.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
// Create a new product
const createProductInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.default.create(payload);
        return {
            success: true,
            message: 'Product created successfully',
            data: result,
        };
    }
    catch (error) {
        console.error('Failed to creating product:', error);
        return {
            success: false,
            message: 'Failed to create product',
            error,
        };
    }
});
// Fetch all products with basic filtering, sorting, and pagination
const getAllProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category } = query;
    const filter = {};
    if (search) {
        filter.$or = [
            { name: new RegExp(search, 'i') },
            { category: new RegExp(search, 'i') },
        ];
    }
    if (category) {
        filter.category = category;
    }
    const result = yield product_model_1.default.find(filter);
    return result;
});
// Fetch a single product by ID
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    return result;
});
// Update a product by ID
const updateProductInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (result) {
        return result;
    }
    else {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faild to Update product');
    }
    return result;
});
// Delete a product by ID
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedProduct = yield product_model_1.default.findByIdAndDelete(id, { isDeleted: true });
        if (!deletedProduct) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete product');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedProduct;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.ProductService = {
    createProductInDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductInDB,
    deleteProductFromDB,
};
