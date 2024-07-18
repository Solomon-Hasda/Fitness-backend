
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Product from './product.model';
import { TProduct } from './product.interface';
import AppError from '../../errors/AppError';


// Create a new product
const createProductInDB = async (payload: TProduct) => {
    try {
        const result = await Product.create(payload);
        return {
            success: true,
            message: 'Product created successfully',
            data: result,
        };
    } catch (error) {
        console.error('Failed to creating product:', error);
        return {
            success: false,
            message: 'Failed to create product',
            error, 
        };
    }
};

// Fetch all products with basic filtering, sorting, and pagination
const getAllProductsFromDB = async (query: Record<string, string>) => {
    const { search, category } = query;
  
    const filter: Record<string, any> = {};
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
      ];
    }
    if (category) {
      filter.category = category;
    }
  
    const result = await Product.find(filter);
    return result;
  };

// Fetch a single product by ID
const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }
    return result;
};


// Update a product by ID
const updateProductInDB = async (id: string, payload: Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (result) {
        return result;
    } else {
        throw new AppError(httpStatus.NOT_FOUND, 'Faild to Update product');

    }

    return result;
};

// Delete a product by ID
const deleteProductFromDB = async (id: string): Promise<TProduct | null> => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedProduct = await Product.findByIdAndDelete(
            id,
            { isDeleted: true },
        );

        if (!deletedProduct) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete product');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedProduct;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const ProductService = {
    createProductInDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductInDB,
    deleteProductFromDB,
};
