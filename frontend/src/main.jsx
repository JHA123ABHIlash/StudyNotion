// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {BrowserRouter} from 'react-router-dom'
// import {Provider} from 'react-redux'
// import store from './services/reducer/store.js'
// import { Toaster } from "react-hot-toast";


// createRoot(document.getElementById('root')).render(
  
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//         <Toaster/>
//       </BrowserRouter>
//     </Provider>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";


const store = configureStore({
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
  </Provider>
    
    
  </React.StrictMode>
);
