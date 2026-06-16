import axios from "axios";
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getSelectedCountryApiReq=createAsyncThunk("countryData",async(slug)=>{
    const response = await axios.get(
      `https://worldfactbook.io/api/v1/countries/${slug.toLowerCase()}/`,
    );
    return response.data
})


const initialState = {
    selectedCountry:{},
    countryDetailsLoading:false,
}



const selectedCountrySlice=createSlice({
    name:"selectedCountry",
    initialState:initialState,
    reducers:{
        
    },

    extraReducers:(builder)=>{
        builder.addCase(getSelectedCountryApiReq.pending,(currentState)=>{
            currentState.countryDetailsLoading=true
        }).addCase(getSelectedCountryApiReq.fulfilled,(currentState,action)=>{
            currentState.countryDetailsLoading=false;
            currentState.selectedCountry=action.payload;
        })
    }
})


export default selectedCountrySlice.reducer;