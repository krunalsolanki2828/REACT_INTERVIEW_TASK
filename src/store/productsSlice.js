const { createSlice } = require('@reduxjs/toolkit');
const { fetchProductsData } = require('../controllers/productsSlice');

const initialState = {
    products: [],
    productsLoading: false,
    productsError: null,
    categories:[],
    filters:{
        category:'',
        brand:'',
        sort:''
    },
    brands:[]
}

/** products slice for redux */
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: (state, action) => {
            state.products = null;
            state.productsLoading = false;
            state.productsError = null;
        },
        setCategoryFilter: (state, action) => {
            state.filters.category = action.payload.category;
        },
        setBrandFilter: (state, action) => {
            state.filters.brand = action.payload.brand;
        },
        setSortFilter: (state, action) => {
            state.filters.sort = action.payload.sort;
        }
    },
    extraReducers: (Builder) => {
        /** redux builder for getting products */
        Builder.addCase(fetchProductsData.pending, (state) => {
            return {
                ...state,
                productsLoading: true,
                productsError: null,
            };
        })
            .addCase(fetchProductsData.fulfilled, (state, action) => {
                const categories = [...new Set(action.payload?.map((product) => product.category))];
                const brands = [...new Set(action.payload.map((product) => product.brand))];
                return {
                    ...state,
                    productsLoading: false,
                    products: action.payload,
                    categories:categories,
                    brands:brands
                };
            })
            .addCase(fetchProductsData.rejected, (state, action) => {
                return {
                    ...state,
                    productsLoading: false,
                    productsError: action.payload
                        ? action.payload
                        : "Internal Server error"
                };
            });       
    }
})

export const { setCategoryFilter, setBrandFilter, setSortFilter } = productsSlice.actions;
export default productsSlice.reducer;





