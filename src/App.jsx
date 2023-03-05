import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { isUserAuth } from "./api";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const FirstContext = React.createContext({});

function App() {
  const location = useLocation();
  const userHere =
    location.pathname == "/signup" || location.pathname == "/signin";

  const {
    data: isAuth,
    isLoading,
    refetch: refetchAuth,
  } = useQuery({
    queryKey: ["isUserAuth"],
    queryFn: () => isUserAuth(),
  });

  if (isLoading) {
    return <CircularProgress color="secondary" className="loader" />;
  }

  const valueForContext = { refetchAuth };

  if (isAuth === false) {
    if (!userHere) {
      return <Navigate to="/signup" />;
    } else {
      return (
        <FirstContext.Provider value={valueForContext}>
          <Outlet />
        </FirstContext.Provider>
      );
    }
  }

  if (isAuth === true) {
    if (location.pathname == "/" || userHere) {
      return <Navigate to="/main" />;
    }
  }

  return (
    <FirstContext.Provider value={valueForContext}>
      <Header />
      <Outlet />
      <Footer />
    </FirstContext.Provider>
  );
}

export default App;
