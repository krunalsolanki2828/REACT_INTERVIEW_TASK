import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


/** get products data from apis */
export const fetchProductsData = createAsyncThunk(
    'products/getProducts',
    async () => {
        const response = await axios.get('https://dummyjson.com/products?limit=100')
        return response.data.products
    }
)



