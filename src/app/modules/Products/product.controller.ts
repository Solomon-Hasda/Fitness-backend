import { Request, Response } from 'express';
import { TProduct } from './product.interface';
import Product from './product.model';
import { ProductService } from './product.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

//  handle product creation
const createProduct = async (req: Request, res: Response) => {
    try {
        const payload: TProduct = req.body;
        const result = await ProductService.createProductInDB(payload);

        if (result.success) {
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: result.message,
                error: result.error,
            });
        }
    } catch (error) {

        console.error('Error creating product:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed creating product',
            error
        });
    }
};



//  fetch all products
const getAllProducts = catchAsync(async (req, res) => {
    const { search, category } = req.query;
    const query: Record<string, string> = {
        search: typeof search === 'string' ? search : '',
        category: typeof category === 'string' ? category : '',
    };
    const result = await ProductService.getAllProductsFromDB(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products are retrieved succesfully',
        data: result,
    });
});

//  fetching a single product by ID
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.id; // Assuming route parameter is 'id'
    const result = await ProductService.getSingleProductFromDB(productId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products are retrieved succesfully',
        data: result,
    });
});

const updateProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload: Partial<TProduct> = req.body;
    const result = await ProductService.updateProductInDB(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product is updated succesfully',
      data: result,
    });
  });

  const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProductService.deleteProductFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product is deleted succesfully',
      data: result,
    });
  });
  

export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
