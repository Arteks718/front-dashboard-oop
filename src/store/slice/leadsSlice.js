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
  async ({lead, updateData}, { rejectWithValue }) => {
    try {
      const { data } = await updateHttpLead(lead, updateData)
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
    .addCase(updateLeadStatusThunk.fulfilled, (state, {payload: { data }}) => {
      state.isFetching = false;
      const updatedLead = {...data[1][0]}
      const updateLeadStatus = state.leads.findIndex(
        (lead) => lead.id === updatedLead.id
      );
      state.leads[updateLeadStatus] = { ...updatedLead };
    })
    .addCase(updateLeadStatusThunk.rejected, rejectedFunction)
  }
})

const { reducer } = leadsSlice

export default reducer;