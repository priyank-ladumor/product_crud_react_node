import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
