import { createAppSlice } from "../../app/createAppSlice"


const initialState = {
    isLoggedIn: localStorage.getItem("user") ? true : false,
    user: JSON.parse(localStorage.getItem("user") || "null"),
}

const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: create => ({
        login: create.reducer((state, action) => {
            state.isLoggedIn = true
            state.user = action.payload.user
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        }),
        logout: create.reducer(state => {
            state.isLoggedIn = false
            state.user = null
            localStorage.removeItem("user")
        })
    })

})

export const { login, logout } = authSlice.actions
export { authSlice }