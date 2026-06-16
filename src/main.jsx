import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import {router} from "./routers/routing.jsx";
import { Provider } from "react-redux";
import { store } from "./mainStore/Store.jsx";
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
