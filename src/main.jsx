import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { CustomProvider } from "./context";
import ItemRoot from "./routes/item";
import Root from "./routes/root";
import Cart from "./routes/cart";
import Checkout from "./routes/checkout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/category/:id", 
    element: <Root />,
  },
  {
    path: "/item/:id",
    element: <ItemRoot />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout/:id",
    element: <Checkout />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomProvider>
    <RouterProvider router={router} />
    </CustomProvider>
  </React.StrictMode>,
)
