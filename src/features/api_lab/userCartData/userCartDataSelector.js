export const selectorUserCartData = (state)=> state.userCardApiData.data;
export const selectorUserCartLoading = (state)=> state.userCardApiData.isLoading;
export const selectorUserCartError = (state)=> state.userCardApiData.isError;
export const selectorUserCartErrorMessage = (state)=> state.userCardApiData.errorMsg;