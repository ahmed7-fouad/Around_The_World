import  {createBrowserRouter}  from "react-router-dom";
import Home from "../mainComponents/home";
import Error from "../mainComponents/Error";
import CountryInfo from "../mainComponents/countryInfo";
import App from "../App";
export const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"/home",
                element:<Home/>,   
            },
            {
                path:"/country/:slug",
                element:<CountryInfo/>,
            },
            {
                path:"/country",
                element:<CountryInfo/>,
            },
            {
                path:"*",
                element:<Error/>
            }
        ]
    },
])
