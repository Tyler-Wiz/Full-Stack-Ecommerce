import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "@/services/config/index";

const cookie = new Cookies();
const cookies = new Cookies();
const authToken = cookies.get("authToken");

const initialState = {
  token: cookie.get("session") || "",
  googleUser: "",
  user_id: "",
  email: "",
  password: "",
  created_at: "",
  is_admin: false,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
};

// Register new user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${config.REGISTER_URL}`, user, {
        withCredentials: true,
      });
      cookie.set("session", token.data, {
        maxAge: 7 * 24 * 3600,
      });
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login user into state
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${config.LOGIN_API_URL}`, user, {
        withCredentials: true,
      });
      cookie.set("session", token.data, {
        maxAge: 7 * 24 * 3600,
      });
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser(state) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          user_id: user.id,
          email: user.email,
          password: user.password,
          created_at: user.created_at,
          is_admin: user.is_admin,
          userLoaded: true,
        };
      }
    },
    getGoogleUser(state) {
      if (authToken) {
        const decoded = jwtDecode(authToken);
        return {
          ...state,
          googleUser: decoded,
        };
      }
    },
    logOut(state) {
      cookie.remove("session");
      return {
        ...state,
        token: "",
        user_id: "",
        email: "",
        password: "",
        created_at: "",
        is_admin: false,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          token: action.payload,
          registerStatus: "success",
          registerError: "",
        };
      } else return state;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          token: payload,
          loginError: "",
          loginStatus: "",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: payload,
      };
    });
  },
});

export const { getUser, logOut, getGoogleUser } = authSlice.actions;
export default authSlice.reducer;
