"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
// src/routes/productRoutes.ts
const express_1 = __importDefault(require("express"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const ValidateRequest_1 = require("../../middleWares/ValidateRequest");
// import { createProduct, updateProduct } from '../controllers/productController';
const router = express_1.default.Router();
router.post('/create-product', (0, ValidateRequest_1.validate)(product_validation_1.ProductValidation.createProductValidationSchema), product_controller_1.ProductController.createProduct);
router.get('/', product_controller_1.ProductController.getAllProducts);
router.get('/:id', product_controller_1.ProductController.getSingleProduct);
router.patch('/:id', (0, ValidateRequest_1.validate)(product_validation_1.ProductValidation.updateProductValidationSchema), product_controller_1.ProductController.updateProduct);
router.delete('/:id', product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
