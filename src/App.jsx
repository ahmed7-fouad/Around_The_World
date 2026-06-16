import './App.css'
import Nav from './mainComponents/Nav';
import Footer from "./mainComponents/Footer";
import { Outlet } from "react-router-dom";
// import axios from "axios";
function App() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default App
