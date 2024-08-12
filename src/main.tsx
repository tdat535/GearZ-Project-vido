import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
// import Tainghe from './component/TaiNghe.tsx'
// import BodyApp from './component/Body/BodyApp.tsx'
//import Header from './component/Header/Header.tsx'
// import InputProduct from './component/InputProduct.tsx'
import Login from './pages/Login/Login.tsx'
//import BodyApp from './component/Body/BodyApp.tsx'
import Product from './pages/Product/ProductPage.tsx'
//import BodyApp from './component/Body/BodyApp.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "pages",
    element: <App />,
    children: [
      {
        path: "categorys",
        element: <Product />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
