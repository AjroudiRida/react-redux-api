import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://randomuser.me/api/?results=5";

const initialState = {
  users: [],
  isLoading: true,
  error: "",
};

export const getUsers = createAsyncThunk("users/getUsers", async (name, thunkAPI) => {
  try {
    console.log(thunkAPI)
    const resp = await axios(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("can't fetch users from the API");
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.users = payload.results;
      state.isLoading = false;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default usersSlice.reducer;
