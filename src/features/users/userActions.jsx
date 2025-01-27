import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { loginRoute, registerRoute } from "src/utils/APIRoutes";

const showToast = (type, message) => {
  if (type === "success") toast.success(message);
  if (type === "error") toast.success(message);
};

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
      showToast("success", "Login Success");
      navigate("/admin");
      return res.data;
    } catch (error) {
      showToast("error", error.message);
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
        showToast("success", "Register Success");
      }
      navigate("/admin/login");

      return res.data;
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.error || "Registration failed");
        return rejectWithValue(error.response.data); // Return server error message
      } else if (error.request) {
        // If the request was made but no response was received
        console.error(error.request);
        showToast("error", "Network error, please try again.");
      } else {
        showToast("eerror", error.message || "An error occurred.");
      }
    }
  }
);
