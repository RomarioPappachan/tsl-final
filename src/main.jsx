import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import UserRegistration from "./pages/UserRegistration";
import RegSuccess from './pages/RegSuccess';
import './index.css'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<StrictMode><App /></StrictMode>}>
      <Route index element={<UserRegistration />} />
      <Route path="/registrationSuccess" element={<RegSuccess />} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
