import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data:[]
}

const userCartSlice = createSlice({
    name:'userCartData',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            state.data.push(action.payload);
        },
        removeFromCart:(state,action)=>{
            state.data = state.data.filter((stock)=>(stock.stockId!==action.payload.stockId))
        }
    }
});

export const {addToCart , removeFromCart } = userCartSlice.actions;
export default userCartSlice.reducer;
