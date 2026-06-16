import SearchIcon from '@mui/icons-material/Search';
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import DropDownMenu from "../secondaryComponents/dropDownMenu"
import CircularProgress from "@mui/material/CircularProgress";
import CountryCard from '../secondaryComponents/countryCard';
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { getCountriesDataFromApi } from "../allSlices/CountriesDataSlice";
import {updateOnSearch} from "../allSlices/CountriesDataSlice";
import NotFound from "../secondaryComponents/NotFound";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "27px",
  padding: "9px 13px",
  backgroundColor: "#F9FAFB",
  maxWidth: "21rem",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "9px",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "9px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));


// Set ALL Countries Cards


export default function Home() {
  let countriesData=useSelector(state=>{
     return state.countriesReducer.filteredCountries;
   })
  
  let loadingState=useSelector(state=>{
    return state.countriesReducer.loading;
  })
  

  let dispatch=useDispatch();


    function setAllCountriesCards() {
      if(countriesData.length!==0){
         let countriesList = countriesData.map((countryObj) => {
           return (
             <CountryCard
               key={uuidv4()}
               imageSource={countryObj.imageSource}
               alternateTitle={countryObj.slug}
               countryName={countryObj.name}
               population={countryObj.population}
               region={countryObj.region}
               capital={countryObj.capital}
             />
           );
         });
         return countriesList;
      }
      return <NotFound />;
      
    }

    function handleSearchInput(searchInputText) {
      dispatch(updateOnSearch(searchInputText));
    }


   useEffect(() => {
     if (countriesData.length === 0) {
       dispatch(getCountriesDataFromApi());
     }
     console.log(countriesData);
   }, []);


  return (
    <>
      {/* Search Bar */}
      <section className="py-5 min-h-[calc(100vh-122px)] bg-mainBg dark:bg-darkBg">
        <section className="mainContainer text-center">
          {/* Search And Choose Country */}
          <header className="flex justify-between items-center">
            <Search className="bg-main dark:bg-mainDark! text-slate-700 dark:text-main!">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e)=>handleSearchInput(e.target.value)}
              />
            </Search>
            {/* Countries Selections */}
            <DropDownMenu />
          </header>

          {/* All Countries Cards */}
          <section className="pt-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 justify-center items-center ">
            {loadingState?
             <CircularProgress size="3rem" aria-label="Loading…" className="text-mainDark! dark:text-main! mx-auto"/>
             :
            setAllCountriesCards()}   
          </section>

        </section>
      </section>
    </>
  );
}
