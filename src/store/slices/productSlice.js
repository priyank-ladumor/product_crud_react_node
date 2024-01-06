import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getSingleProducts, getUserProducts, deleteProducts, createProducts, updateProductAction, watchlaterAction, getwatchlaterAction } from "../actions/product";

const initialState = {
    loading: false,
    error: null,
    product: null,
    singleproduct: null,
    userproduct: null,
    success: false,
    isloading: false,
    iserror: null,
    issuccess: false,
    isdelete: false,
    createproductdata: null,
    createerror: null,
    createsuccess: false,
    updateproductdata: null,
    updateerror: null,
    updatesuccess: false,
    isloader: false,
    iswatchlater: null,
    getwatchlater: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, { payload }) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })

        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.product = payload;
            state.error = null;
        })

        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        })

        builder.addCase(getSingleProducts.pending, (state, { payload }) => {
            state.singleproduct = null;
        })

        builder.addCase(getSingleProducts.fulfilled, (state, { payload }) => {
            state.singleproduct = payload;
        })

        builder.addCase(getSingleProducts.rejected, (state, { payload }) => {
            state.singleproduct = null;
        })

        builder.addCase(getUserProducts.pending, (state, { payload }) => {
            state.userproduct = null;
            state.isloader = true;
        })

        builder.addCase(getUserProducts.fulfilled, (state, { payload }) => {
            state.userproduct = payload;
            state.isloader = false;
        })

        builder.addCase(getUserProducts.rejected, (state, { payload }) => {
            state.userproduct = null;
            state.isloader = false;
        })

        builder.addCase(deleteProducts.pending, (state, { payload }) => {
            state.isdelete = false;
        })

        builder.addCase(deleteProducts.fulfilled, (state, { payload }) => {
            state.isdelete = true;
        })

        builder.addCase(deleteProducts.rejected, (state, { payload }) => {
            state.isdelete = false;
        })

        builder.addCase(createProducts.pending, (state, { payload }) => {
            state.createproductdata = null;
            state.createerror = null;
            state.createsuccess = false;
        })

        builder.addCase(createProducts.fulfilled, (state, { payload }) => {
            state.createproductdata = payload;
            state.createerror = null;
            state.createsuccess = true;
        })

        builder.addCase(createProducts.rejected, (state, { payload }) => {
            state.createproductdata = null;
            state.createerror = payload;
            state.createsuccess = false;
        })

        builder.addCase(updateProductAction.pending, (state, { payload }) => {
            state.updateproductdata = null;
            state.updateerror = null;
            state.updatesuccess = false;
        })

        builder.addCase(updateProductAction.fulfilled, (state, { payload }) => {
            state.updateproductdata = payload;
            state.updateerror = null;
            state.updatesuccess = true;
        })

        builder.addCase(updateProductAction.rejected, (state, { payload }) => {
            state.updateproductdata = null;
            state.updateerror = payload;
            state.updatesuccess = false;
        })

        builder.addCase(watchlaterAction.pending, (state, { payload }) => {
            state.iswatchlater = null;
        })

        builder.addCase(watchlaterAction.fulfilled, (state, { payload }) => {
            state.iswatchlater = payload;
        })

        builder.addCase(watchlaterAction.rejected, (state, { payload }) => {
            state.iswatchlater = null;
        })

        builder.addCase(getwatchlaterAction.pending, (state, { payload }) => {
            state.getwatchlater = null;
        })

        builder.addCase(getwatchlaterAction.fulfilled, (state, { payload }) => {
            state.getwatchlater = payload;
        })

        builder.addCase(getwatchlaterAction.rejected, (state, { payload }) => {
            state.getwatchlater = null;
        })
    }
});

export default productSlice.reducer;
