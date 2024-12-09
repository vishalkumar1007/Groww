export const selectorUserTransactionWalletBalance = (state)=>state.userTransactionData.walletBalance;
export const selectorUserTransactionTransactionData = (state)=>state.userTransactionData.transactionData;
export const selectorUserTransactionError = (state)=>state.userTransactionData.isError;
export const selectorUserTransactionLoading = (state)=>state.userTransactionData.isLoading;