import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  //destructure loggedIn and checkingStatus from useAuthStatus
  const {loggedIn, checkingStatus} = useAuthStatus()
  
  if(checkingStatus){
    return <Spinner />

  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
