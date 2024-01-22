import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getHttpSalesManagers } from "../../api"

export const getSalesManagersThunk = createAsyncThunk(
  "salesManagers/get",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getHttpSalesManagers()
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  salesManagers: [],
  isFetching: false,
  error: null
}

const pendingFunction = (state) => {
  state.isFetching = true;
  state.error = null;
};

const rejectedFunction = (state, {payload}) => {
  state.isFetching = false;
  state.error = payload;
}

const salesManagersSlice = createSlice({
  name: 'salesmanagers',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getSalesManagersThunk.pending, pendingFunction)
    .addCase(getSalesManagersThunk.fulfilled, (state, { payload }) => {
      state.salesManagers = []
      state.isFetching = false;
      state.salesManagers.push(...payload.data)
    })
    .addCase(getSalesManagersThunk.rejected, rejectedFunction);
  }
})

const { reducer } = salesManagersSlice

export default reducer;