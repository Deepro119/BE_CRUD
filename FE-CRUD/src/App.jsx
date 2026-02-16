import { useState } from 'react'
// import './App.css'
import User from './getUsers/User.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AddUser from './addUser/AddUser.jsx'
import Update from './updateUser/update.jsx'

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <User /> },
    { path: "/add-user", element: <AddUser /> },
    { path: "/update-user/:id", element: <Update /> }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
