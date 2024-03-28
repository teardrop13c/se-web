import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    OnOffReg: null,
};

export const varSlice = createSlice({
    name: 'var',
    initialState,
    reducers: {
        setOnReg: (state) => {
            state.OnOffReg = true;
        },
        setOffReg: (state) => {
            state.OnOffReg = false;
        },    
    },
});

export const { setOnReg ,setOffReg} = varSlice.actions;

export default varSlice.reducer;