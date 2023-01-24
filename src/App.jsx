import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { isUserAuth } from "./Api";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CircularProgress } from "@mui/material";

export const FirstContext = React.createContext({});

function App() {

  const [isAuth, setIsAuth] = useState();
  const loc = useLocation();


  useEffect(() => {
    isUserAuth().then(isTokenCorrect => {
      setIsAuth(isTokenCorrect);
    })
  })

  const valueForContext = { isAuth, setIsAuth }

  if (isAuth === false) {
    if (loc.pathname != '/' && loc.pathname != '/signIn') {
      console.log('Nav to main')
      return <Navigate to="/" />
    } else {
      return (
        <FirstContext.Provider value={valueForContext}>
          <Outlet />
        </FirstContext.Provider>
      )
    }
  }

  if (isAuth === undefined) {
    return <CircularProgress color="secondary" className="loader" />
  }

  if (isAuth === true) {
    if (loc.pathname == '/' || loc.pathname == '/signIn') {
      console.log('Nav to main')
      return <Navigate to="/main" />
    }
  }

  return (

    <FirstContext.Provider value={valueForContext}>
      <Header />
      <Outlet />
      <Footer />
    </FirstContext.Provider>

  )
}

export default App;
