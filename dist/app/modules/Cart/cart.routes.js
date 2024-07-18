"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
// src/routes/cartRoutes.ts
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const cartValidation_1 = require("../validators/cartValidation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = express_1.default.Router();
router.post('/:sessionId', (0, validateRequest_1.validate)(cartValidation_1.CartValidation.addToCartValidationSchema), cartController_1.CartController.addToCart);
router.get('/:sessionId', cartController_1.CartController.getCart);
router.patch('/:sessionId', (0, validateRequest_1.validate)(cartValidation_1.CartValidation.updateCartItemValidationSchema), cartController_1.CartController.updateCartItem);
router.delete('/:sessionId/:productId', cartController_1.CartController.deleteCartItem);
router.delete('/:sessionId', cartController_1.CartController.clearCart);
exports.CartRoutes = router;
