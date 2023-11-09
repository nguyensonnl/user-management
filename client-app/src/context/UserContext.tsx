import { createContext, useEffect, useState, ReactNode } from "react";
import userService from "../api/userService";

interface UserData {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string;
  account: any;
}

export interface UserContextType {
  user: UserData;
  loginContext: (userData: UserData) => void;
  logoutContext: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const userDefault: UserData = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };

  const [user, setUser] = useState<UserData>(userDefault);

  const loginContext = (userData: UserData) => {
    setUser({ ...userData, isLoading: false });
  };

  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await userService.getAccount();
    // console.log(response);
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;

      let data: UserData = {
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, username },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    } else {
      setUser({ ...user, isLoading: false });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loginContext, logoutContext } as UserContextType}
    >
      {children}
    </UserContext.Provider>
  );
};
