import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useParams } from "react-router-dom";
import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getSelectedCountryApiReq} from "../allSlices/selectedCountrySlice";
export default function CountryInfo() {

    const {slug}=useParams();

    const selectedCountryData=useSelector(state=>{
        return state.selectedCountryReducer.selectedCountry;
    });

    const loadingState=useSelector(state=>{
        return state.selectedCountryReducer.countryDetailsLoading;
    })

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getSelectedCountryApiReq(slug));
    },[])
    let isoCode=selectedCountryData.iso2;
    let imgSource = isoCode ? `https://flagcdn.com/48x36/${isoCode.toLowerCase()}.png` : "https://flagcdn.com/w80/aq.png";


  return (
    <>
      <section className="py-5 min-h-[calc(100vh-122px)] bg-mainBg dark:bg-darkBg">
        <section className="mainContainer items-center justify-center flex-col lg:flex-row">
          {loadingState ? (
            <CircularProgress
              size="3rem"
              aria-label="Loading…"
              className="text-mainDark! dark:text-main! mx-auto"
            />
          ) : (
            <>
              <Link to="/">
                <button className="mb-5 bg-main dark:bg-mainDark dark:text-main py-3 px-5 rounded-lg cursor-pointer">
                  <KeyboardBackspaceIcon className="w-3" />
                </button>
              </Link>

              <section className="dark:text-main flex items-center gap-11 flex-col lg:flex-row py-5">
                <section className="flex-1">
                  <img src={imgSource} alt="CountryFlag" className="w-[23rem] lg:w-full" />
                </section>
                <section className="flex-1">
                  <h1 className="capitalize font-bold text-4xl mb-6">
                    {selectedCountryData.name ?? "unKnown"}
                  </h1>
                  <section className="flex items-start gap-5 flex-col lg:flex-row">
                    {/* First Country Column */}
                    <ul className="space-y-3">
                      <li className="capitalize text-xl">
                        <span className="font-semibold">native name : </span>
                        <span>{selectedCountryData.slug ?? "unKnown"}</span>
                      </li>
                      <li className="capitalize text-xl">
                        <span className="font-semibold">population : </span>
                        <span>
                          {selectedCountryData.population ?? "unKnown"}
                        </span>
                      </li>
                      <li className="capitalize text-xl">
                        <span className="font-semibold">region : </span>
                        <span>{selectedCountryData.region ?? "unKnown"}</span>
                      </li>
                      <li className="capitalize text-xl">
                        <span className="font-semibold">sub region : </span>
                        <span>
                          {selectedCountryData.subregion ?? "unKnown"}
                        </span>
                      </li>
                      <li className="capitalize text-xl">
                        <span className="font-semibold">capital : </span>
                        <span>{selectedCountryData.capital ?? "unKnown"}</span>
                      </li>
                    </ul>

                    {/*=== First Country Column ===*/}

                    {/* Second Country Column */}
                    <ul className="space-y-3">
                      <li className="capitalize text-xl">
                        <span className="font-semibold">
                          top level domain :{" "}
                        </span>
                        <span>{selectedCountryData.ciaCode ?? "unKnown"}</span>
                      </li>

                      <li className="capitalize text-xl">
                        <span className="font-semibold">area : </span>
                        <span>{selectedCountryData.area ?? "unKnown"}</span>
                      </li>
                    </ul>
                    {/*=== Second Country Column ===*/}
                  </section>
                </section>
              </section>
            </>
          )}
        </section>
      </section>
    </>
  );
}
