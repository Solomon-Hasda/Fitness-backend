
import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    title: z.string({
      message: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    price: z.number({
      message: 'Price is required',
      invalid_type_error: 'Price must be a number',
    }),
    description: z.string({
      message: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    category: z.string({
      message: 'Category is required',
      invalid_type_error: 'Category must be a string',
    }),
    countInStock: z.number({
      message: 'Count in stock is required',
      invalid_type_error: 'Count in stock must be a number',
    }),
    imageUrl: z.string({
      message: 'Image URL is required',
      invalid_type_error: 'Image URL must be a string',
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }).optional(),
    title: z.string({
      message: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }).optional(),
    price: z.number({
      message: 'Price is required',
      invalid_type_error: 'Price must be a number',
    }).optional(),
    description: z.string({
      message: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }).optional(),
    category: z.string({
      message: 'Category is required',
      invalid_type_error: 'Category must be a string',
    }).optional(),
    countInStock: z.number({
      message: 'Count in stock is required',
      invalid_type_error: 'Count in stock must be a number',
    }).optional(),
    imageUrl: z.string({
      message: 'Image URL is required',
      invalid_type_error: 'Image URL must be a string',
    }).optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
