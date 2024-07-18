import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';


const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: true,
        unique : true,
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    }
);

const Product = model<TProduct>('Product', productSchema);

export default Product;
