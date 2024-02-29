import { createSlice } from '@reduxjs/toolkit';

const INIT_VARIABLES = {
    isEdit: false,
    selectedItems:[],
    transactionType: "",
    category: "",
    photoURL: "",
    itemData: {},
    selectedDate: "",
    isUpdate: false,
    status: false
}

const variableSlice = createSlice({
    name: 'variables',
    initialState:INIT_VARIABLES,
    reducers: {
      
      setEditStatus(state, action) {
        state.isEdit = action.payload;
      },
      setSelectedItems(state, action) {
        state.selectedItems = action.payload;
      },
      setItemTransactionType(state, action) {
        state.transactionType = action.payload;
      },
      setItemCategory(state, action) {
        state.category = action.payload;
      },
      setItemPhotoURL(state, action) {
        state.photoURL = action.payload;
      },
      setItemData(state, action) {
        state.itemData = action.payload;
      },
      setSelectedDate(state, action) {
        state.selectedDate = action.payload;
      },
      setIsUpdate(state, action) {
        state.isUpdate = action.payload;
      },
      setStatus(state, action) {
        state.status = action.payload;
      },
    },
});

const { actions, reducer } = variableSlice;
export const { setEditStatus, setSelectedItems, setItemTransactionType,setItemCategory, setItemPhotoURL, setItemData, setSelectedDate, setIsUpdate, setStatus} = actions;
export default reducer;