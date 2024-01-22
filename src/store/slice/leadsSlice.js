import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getHttpAllLeads, updateHttpLead } from "../../api"

export const getLeadsThunk = createAsyncThunk(
  "leads/get",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getHttpAllLeads(payload)
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateLeadStatusThunk = createAsyncThunk(
  "leads/put",
  async ({lead, status}, { rejectWithValue }) => {
    try {
      console.log(lead, status)
      const { data } = await updateHttpLead(lead, status)
      return data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  leads: [],
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

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(getLeadsThunk.pending, pendingFunction)
    .addCase(getLeadsThunk.fulfilled, (state, { payload }) => {
      state.leads = []
      state.isFetching = false;
      state.leads.push(...payload.data)
    })
    .addCase(getLeadsThunk.rejected, rejectedFunction)
    .addCase(updateLeadStatusThunk.pending, pendingFunction)
    .addCase(updateLeadStatusThunk.fulfilled, (state, {payload}) => {
      state.leads = []
      state.isFetching = false;
      state.leads.push(...payload.data)
    })
    .addCase(updateLeadStatusThunk.rejected, rejectedFunction)
  }
})

const { reducer } = leadsSlice

export default reducer;