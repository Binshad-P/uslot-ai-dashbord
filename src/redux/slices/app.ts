import { createSlice } from '@reduxjs/toolkit';


const initialState: Uslotapp = {
    isLoadding: false,
    AllCouponCodeList: [],
    isDeleted:false,
}













const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {

        LoadingSlice(state, action) {
            state.isLoadding = action.payload.isLoadding;
        },
        deleteSlice(state) {
            state.isDeleted = !state.isDeleted
        },


        fetchUser(state, action) {

        },

    
        AllCouponCodeListSlice(state, action) {
            //AllStudentList
            state.AllCouponCodeList = action.payload.data;
        },

      



    }
});

//Reducer
export default slice.reducer;
//actions
export const {AllCouponCodeListSlice, LoadingSlice, fetchUser,deleteSlice } = slice.actions;




export type Uslotapp = {
    isDeleted:boolean,
    isLoadding: any,
    AllCouponCodeList:any;
    
  }