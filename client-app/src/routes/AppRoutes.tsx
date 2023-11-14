import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import User from "../components/User";
import Regsiter from "../components/Register";
import NotFound from "../components/NotFound";
import Role from "../components/Role";
import Permission from "../components/Permission";
import PrivateRoutes from "./PrivateRoutes";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";

const AppRoutes = () => {
  const { user } = useContext(UserContext) as UserContextType;
  // console.log(user);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Regsiter />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/user"
          element={
            <PrivateRoutes>
              <User />
            </PrivateRoutes>
          }
        />

        <Route
          path="/role"
          element={
            <PrivateRoutes>
              <Role />
            </PrivateRoutes>
          }
        />
        <Route
          path="/permission"
          element={
            <PrivateRoutes>
              <Permission />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
