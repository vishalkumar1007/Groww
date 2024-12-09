export const selectUserCartValue = (state)=> state.userCartData.data;
export const selectUserCartIsLoading = (state)=> state.userCartData.isLoading;
export const selectUserCartIsError = (state)=> state.userCartData.isError;
export const selectUserCartErrorMessage = (state)=> state.userCartData.errorMsg;