import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    dashboardVisitCount:0,
    currentPage:'Home'
}

const pageRouteStalkSlice = createSlice({
    name:'pageRouteStalkData',
    initialState,
    reducers:{
        updatePageRouteStalk : (state,action)=>{
            state.currentPage = action.payload;
        },
        increaseDashboardVisitCount : (state,action)=>{
            state.dashboardVisitCount = action.payload;
        }
    }
});

export const {updatePageRouteStalk,increaseDashboardVisitCount} = pageRouteStalkSlice.actions;
export default pageRouteStalkSlice.reducer;