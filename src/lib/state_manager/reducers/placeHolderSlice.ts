import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export const getPlaceData = createAsyncThunk("get/placeholder", async () => {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";
  const response = await axios.get(apiUrl);
  return response.data;
});

// POST Data
interface PostPlaceDataPayload {
    newData: any;
}

export const postPlaceData = createAsyncThunk("post/placeholder", async (payload: PostPlaceDataPayload) => {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.post(apiUrl, payload.newData);
    return response.data;
});
// 

interface ServerState {
  data: Record<string, any>;
  status: string;
}

const initialState: ServerState = {
  data: {},
  status: "loading",
};

export const placeHolderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPlaceData.fulfilled,(state, action: PayloadAction<ServerState["data"]>) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getPlaceData.pending, (state) => {
        state.data = {};
        state.status = "loading";
      })
      .addCase(postPlaceData.fulfilled,(state, action: PayloadAction<ServerState["data"]>) => {
        state.data = action.payload;
        state.status = "success add";
      })
      .addCase(postPlaceData.pending, (state) => {
        state.data = {};
        state.status = "loading";
      });
  },
});

export const selectPlaceData = (state: RootState) => state.placeData.data;
export const getPlaceStatus = (state: RootState) => state.placeData.status;

export default placeHolderSlice.reducer;
