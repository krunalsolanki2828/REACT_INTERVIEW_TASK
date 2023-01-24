const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
    carts: [],
}
/** cart slice for redux */
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.carts.push(action.payload);
        }
    }
})



export const { addCart } = cartSlice.actions

export default cartSlice.reducer;
