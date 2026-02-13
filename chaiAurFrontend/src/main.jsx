import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import AuthLayout from './layouts/AuthLayout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import WatchVideo from './pages/WatchVideo.jsx';
import UploadVideo from './pages/UploadVideo.jsx';


const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path : "watch/:videoId",
        element :<WatchVideo/>
      },
      {
        path : "/upload",
        element : ( 
          <AuthLayout authentication={true}>
            <UploadVideo/> 
          </AuthLayout>
        )
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store ={store}>
      <RouterProvider  router ={router}/>
    </Provider>
  </StrictMode>
)
