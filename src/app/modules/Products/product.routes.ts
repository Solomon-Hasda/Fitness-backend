
import express from 'express';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';
import { validate } from '../../middleWares/ValidateRequest';


const router = express.Router();

router.post('/create-product',
  validate(ProductValidation.createProductValidationSchema),
  ProductController.createProduct
);

router.get('/',
  ProductController.getAllProducts
);

router.get('/:id',
  ProductController.getSingleProduct
);

router.patch('/:id',
  validate(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct
);
router.delete('/:id',
  ProductController.deleteProduct
);


export const ProductRoutes =  router;
