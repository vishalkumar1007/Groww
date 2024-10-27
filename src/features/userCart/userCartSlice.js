import {createSlice} from '@reduxjs/toolkit';
import {fetchUserCartThunk} from './userCartThunk';

const initialState = {
    isLoading:false,
    data:[],
    isError:false,
    errorMsg:''
}

const userCartSlice = createSlice({
    name:'userCartData',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            state.data.push(action.payload);
        },
        removeFromCart:(state,action)=>{
            state.data = state.data.filter((stock)=>(stock.stock_id!==action.payload.stock_id));
        },
        deleteAllCartData:(state,action)=>{
            // console.log('remove cart -------------');
            state.data = [];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserCartThunk.pending,(state,action)=>{
            state.isLoading=true;
            state.isError = false;
        })
        builder.addCase(fetchUserCartThunk.fulfilled , (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            const CART_API_DATA = action.payload.userCart.userCartData;
            state.data = [];
            for (const element of CART_API_DATA) {
                state.data.push(element);
            }
            // console.log('CART API slice : ',action.payload.userCart.userCartData);
            // state.data.push(action.payload.userCart.userCartData);
        })
        builder.addCase(fetchUserCartThunk.rejected , (state,action)=>{
            state.isError = true
            state.errorMsg= action.error.message
        })
    }
});

export const {addToCart , removeFromCart , deleteAllCartData } = userCartSlice.actions;
export default userCartSlice.reducer;
