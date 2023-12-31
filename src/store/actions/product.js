import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const getProducts = createAsyncThunk(
  "get/products",
  async (page, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem('usertoken'))
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product?page=${page}`,
        page,
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": token
          },
        }
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSingleProducts = createAsyncThunk(
  "getSingle/products",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/${id}`,
        id,
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": token
          },
        }
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserProducts = createAsyncThunk(
  "getUser/products",
  async (data, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem('usertoken'))
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/user`,
        
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
        }
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const deleteProducts = createAsyncThunk(
  "delete/products",
  async (id, { rejectWithValue }) => {
    // const token = JSON.parse(localStorage.getItem('usertoken'))
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/product/${id}`,
        id,
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": token
          },
        }
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createProducts = createAsyncThunk(
  "create/products",
  async (item, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem('usertoken'))
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/product/`,
        item,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token
          },
        }
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateProductAction = createAsyncThunk(
  "update/products",
  async (item, { rejectWithValue }) => {
    console.log(item.getId , "iddd");
    const token = JSON.parse(localStorage.getItem('usertoken'))
    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/product/${item.getId}`,
        item.fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token
          },
        }
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const watchlaterAction = createAsyncThunk(
  "watchlater/products",
  async (item, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem('usertoken'))
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/product/watchlater`,
        item,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
        }
      );
      if(result.data){
        toast.success(result.data.msg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getwatchlaterAction = createAsyncThunk(
  "watchlater/get/products",
  async (item, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem('usertoken'))
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/product/watchlater`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
        }
      );
      if(result.data){
        toast.success(result.data.msg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return result.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);