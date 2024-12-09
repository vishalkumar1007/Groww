export const selectStockNewsApiData = (state)=>state.stockNewsData.data;
export const selectStockNewsApiLoading = (state)=>state.stockNewsData.isLoading;
export const selectStockNewsApiError = (state)=>state.stockNewsData.isError;
export const selectStockNewsApiErrorMsg = (state)=>state.stockNewsData.errorMsg;