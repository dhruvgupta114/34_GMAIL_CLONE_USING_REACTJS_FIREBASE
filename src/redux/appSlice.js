import {createSlice} from "@reduxjs/toolkit"

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        open: false,
        emails: [],
        selectedEmail: null,
        searchText: "",
        authUser: null
    },
    reducers: {
        setOpen: (state, action)=>{
            state.open = action.payload
        },
        setEmails: (state, action)=>{
            state.emails = action.payload
        },
        setSelectedEmail: (state, action)=>{
            state.selectedEmail = action.payload
        },
        setSearchText: (state,action)=>{
            state.searchText = action.payload
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        }
    }
})

export const {setOpen , setEmails, setSelectedEmail, setSearchText, setAuthUser} = appSlice.actions;
export default appSlice.reducer