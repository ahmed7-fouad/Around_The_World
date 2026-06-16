import { createSlice } from "@reduxjs/toolkit";

const themeStateFromLocalStorage=window.localStorage.getItem("theme");

const initialState={
    themeState:themeStateFromLocalStorage && themeStateFromLocalStorage !=="undefined"? themeStateFromLocalStorage : "light",
}


const themeSwitcher=createSlice({
    name:"themeSwitcher",
    initialState:initialState,
    reducers:{
        changeTheme:(currentState,action)=>{
            currentState.themeState=currentState.themeState=="light"? "dark" : "light";
            window.localStorage.setItem("theme",currentState.themeState);
        }
    }
})

export const {changeTheme} = themeSwitcher.actions
export default themeSwitcher.reducer