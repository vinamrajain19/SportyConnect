import { createSlice } from "@reduxjs/toolkit";


// & Redux is used to maintain and update data across your applications for multiple components to share, all while remaining independent of the components

export const loaderSlice = createSlice({
    name: 'Loader',
    initialState: {
        loading: false,
    },
    reducers: {
        ShowLoading(state) {
            state.loading = true;
        },
        HideLoading(state) {
            state.loading = false;
        }
    }
})

export const { ShowLoading, HideLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
