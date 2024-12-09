export const selectorUserWatchlistData = (state)=> state.userWatchlistAPiData.data;
export const selectorUserWatchlistLoading = (state)=> state.userWatchlistAPiData.isLoading;
export const selectorUserWatchlistError = (state)=> state.userWatchlistAPiData.isError;
export const selectorUserWatchlistErrorMessage = (state)=> state.userWatchlistAPiData.errorMsg;