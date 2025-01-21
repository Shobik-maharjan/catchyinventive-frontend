import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { loginRoute, registerRoute } from "src/utils/APIRoutes";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userCredentials, navigate }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${loginRoute}`, {
        email: userCredentials.email,
        password: userCredentials.password,
      });
      if (!res?.data?.user) {
        throw new Error(res.data.message);
      }
      toast.success("Login Success");
      navigate("/admin");
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message); // If login fails, pass the error message
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${registerRoute}`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
      });

      if (!res) {
        console.log(res.data);

        throw new Error(res.data);
      }
      if (res?.data) {
        toast.success("Register Success");
      }
      navigate("/admin/login");
      return res.data;
    } catch (error) {
      if (error.response) {
        // If the error is from the server (status code outside 2xx)
        console.error(error.response.data);
        toast.error(error.response.data.error || "Registration failed");
        return rejectWithValue(error.response.data); // Return server error message
      } else if (error.request) {
        // If the request was made but no response was received
        console.error(error.request);
        toast.error("Network error, please try again.");
      } else {
        // If the error is something else
        console.error(error.message);
        toast.error(error.message || "An error occurred.");
      }
    }
  }
);
