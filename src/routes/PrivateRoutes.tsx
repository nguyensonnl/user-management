import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext, UserContextType } from "../context/UserContext";

/**
 * Handle protected router
 */

interface Props {
  children?: React.ReactNode;
}

const PrivateRoutes: React.FC<Props> = (props) => {
  const { user } = useContext(UserContext) as UserContextType;

  const auth = user && user.isAuthenticated === true;

  const token = localStorage.getItem("accessToken");

  return token ? <> {props.children}</> : <Navigate to="/login" />;
};

export default PrivateRoutes;
