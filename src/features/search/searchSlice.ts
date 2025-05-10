import { createAppSlice } from "../../app/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchQuery: string;
  isSearching: boolean;
  page: number;
}

const initialState: SearchState = {
  searchQuery: "",
  isSearching: false,
  page: 1,
};

const searchSlice = createAppSlice({
  name: "search",
  initialState,
  reducers: (create) => ({
    setSearchQuery: create.reducer((state, action: PayloadAction<{ searchQuery: string }>) => {
      state.isSearching = true;
      state.searchQuery = action.payload.searchQuery;
    }),
    setPage: create.reducer((state, action: PayloadAction<{ page: number }>) => {
      state.isSearching = true;
      state.page = action.payload.page;
    }),
  }),
});

export const { setSearchQuery, setPage } = searchSlice.actions;
export default searchSlice.reducer;
