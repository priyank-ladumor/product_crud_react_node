import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const registerUser = createAsyncThunk(
  "auth/register",
  async (item, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/signup`,
        item,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("usertoken2", JSON.stringify(result.data.token));
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


export const loginUser = createAsyncThunk(
  "auth/login",
  async (item, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem('usertoken'))
    console.log(token);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/signin`,
        item,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
        }
      );
      localStorage.setItem("usertoken", JSON.stringify(result.data.token));
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

export const ForgotPasswordAction = createAsyncThunk(
  "auth/ForgotPassword",
  async (item, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/forgotpassword`,
        item,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.data.status) {
        toast.error('user does not exit', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success(result.data, {
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

export const ResetPasswordAction = createAsyncThunk(
  "auth/ResetPassword",
  async (item, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/reset-password/${item.id}/${item.token}`,
        item,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.data.status) {
        toast.success('reset password successfully', {
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
      localStorage.clear()
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
