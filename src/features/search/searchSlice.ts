import { createAppSlice } from "../../app/createAppSlice";

const initialState = {
    searchQuery: "",
    isSearching: false,
    page: 1,
}


const searchSlice = createAppSlice({
    name: "search",
    initialState,
    reducers: create => ({
        setSearchQuery: create.reducer((state, action) => {
            state.isSearching = true
            state.searchQuery = action.payload.searchQuery
        }),
        setPage: create.reducer((state, action) => {
            state.isSearching = true
            state.page = action.payload.page
        }),
    })
})

export const { setSearchQuery, setPage } = searchSlice.actions

export default searchSlice.reducer

