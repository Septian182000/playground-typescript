import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export const getPlaceData = createAsyncThunk("get/placeholder", async () => {
  try {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    return (error as Error).message;
  }
});

type ServerState = {
  data: { body: string; id: number; title: string }[];
  status: string;
};

const initialState: ServerState = {
  data: [],
  status: "loading",
};

export const placeHolderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getPlaceData.fulfilled,
        (state, action: PayloadAction<ServerState["data"]>) => {
          state.data = action.payload;
          state.status = "success";
        }
      )
      .addCase(getPlaceData.pending, (state) => {
        state.data = [];
        state.status = "loading";
      });
  },
});

export const selectPlaceData = (state: RootState) => state.placeData.data;
export const getPlaceStatus = (state: RootState) => state.placeData.status;

export default placeHolderSlice.reducer;
