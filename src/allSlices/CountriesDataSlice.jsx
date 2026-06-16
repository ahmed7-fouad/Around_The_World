import axios from "axios";
// const mainUrl = "https://restcountries.com/v3.1";
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import axios from "axios";
export const getCountriesDataFromApi=createAsyncThunk("allCountries/data",async ()=>{
        const mainUrl = "https://worldfactbook.io/api/v1/countries/";
        const response = await axios.get(`${mainUrl}`);
        if (Array.isArray(response.data)) {

        let cleanData=[]
        async function getCountryDataObj(){
          for (let country of response.data.slice(0, 99)) {
            
            let countryData = await axios.get(
                `https://worldfactbook.io/api/v1/countries/${country.slug.toLowerCase()}/`,
            );
            

            let ISO = countryData.data.iso2;

            let imageSource = `${
              ISO
                ? `https://flagcdn.com/48x36/${ISO.toLowerCase()}.png`
                : "https://flagcdn.com/w80/aq.png"
            }`;

            // Country Object
            let countryCardData = {
              name: country.name,
              imageSource: imageSource,
              slug: country.slug,
              flag: country.flag,
              region: country.region,
              capital:
                country.capital && typeof country.capital === "object"
                  ? country.capital.name
                  : country.capital,
              population: country.population,
            };

            cleanData.push(countryCardData);
          }   
        }    

        await getCountryDataObj();

        return cleanData;
      }
})

const localStorageCountries=window.localStorage.getItem("countriesData");

const initialState={
    countries: localStorageCountries && localStorageCountries!=="undefined" ? JSON.parse(localStorageCountries) : [],
    filteredCountries: localStorageCountries && localStorageCountries!=="undefined" ? JSON.parse(localStorageCountries) : [],
    loading:false,
    searchInput:"",
    selectDropDownInput:[],
}

export const CountriesData=createSlice({
    name:"countriesDataSlice",
    initialState:initialState,
    reducers:{
        updateOnSearch:(currentState,action)=>{
            if(action.payload===""){
              currentState.filteredCountries=currentState.countries;
            }else{
              currentState.filteredCountries=currentState.countries.filter((country=>{
                 return country.slug.toLowerCase().includes(action.payload.toLowerCase());
              }))
            }
        },
        selectInput:(currentState,action)=>{
          let currentChoice=action.payload;
          // On autofill we get a stringified value.
          currentState.selectDropDownInput=typeof currentChoice === "string" ? currentChoice.split(",") : currentChoice;


          if(currentChoice.length !== 0){
            currentState.filteredCountries=currentState.countries.filter((country)=>{
              let testFlag=false;
                  for(let i=0;i<currentChoice.length;++i){
                    if(country.slug.toLowerCase().includes(currentChoice[i].toLowerCase())){
                      testFlag=true;
                      break;
                    }
                  }
                  return testFlag;
            })

          }else{
            currentState.filteredCountries=currentState.countries;
          }

        }  
    },
    extraReducers:(builder)=>{
        builder.addCase(getCountriesDataFromApi.pending,
          (currentState) => {
            currentState.loading = true;
          }).addCase(getCountriesDataFromApi.fulfilled,
            (currentState, action) => {
              currentState.loading = false;
              currentState.countries = action.payload;
              currentState.filteredCountries = action.payload;
              window.localStorage.setItem("countriesData",JSON.stringify(action.payload));
            },
          );
    }   
})
export const { updateOnSearch,selectInput} = CountriesData.actions;
export default CountriesData.reducer;