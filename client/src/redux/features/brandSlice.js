import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
export const fetchBrand = createAsyncThunk("brands/fetchAll", async () => {
  const response = await api.get("/brands");
  console.log("Raw API response:", response);
  console.log("Data:", response.data);
  return response.data.brands;
});
const brandSlice = createSlice({
  name: "brands",
  initialState: { brands: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
