import "./Layout.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/UserContext";
import Sidebar from "../Sidebar";
import userService from "../../api/userService";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { logoutContext } = useContext(UserContext) as UserContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const handleLogout = async () => {
    let data = await userService.logout();
    localStorage.removeItem("accessToken");
    logoutContext();

    if (data && +data.EC === 0) {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="layout__container">
        <Sidebar />

        <main className="content">
          <div className="header">
            <span>Hello, {user?.account?.username}</span>
            <span onClick={() => handleLogout()}>Logout</span>
          </div>
          <div className="main">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
