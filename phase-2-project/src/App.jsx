import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'

function App() {


  return (
    <>
      <h1>Working</h1>
      <Outlet />
    </>
  )
}

export default App

