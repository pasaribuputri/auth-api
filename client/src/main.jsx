import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NavLink, RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from './assets/pages/Login/index.jsx'
import SignUp from './assets/pages/SignUp/index.jsx'
import Home from './assets/pages/Home/index.jsx'

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <SignUp/>
  },
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
