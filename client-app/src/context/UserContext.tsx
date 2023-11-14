import { createContext, useEffect, useState, ReactNode, useRef } from "react";
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
  const stateRef = useRef<boolean>(false);

  const loginContext = (userData: UserData) => {
    setUser({ ...userData, isLoading: false });
  };

  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUser = async () => {
    let account = await userService.getAccount();

    if (account && account.EC === 0) {
      let groupWithRoles = account.DT.groupWithRoles;
      let email = account.DT.email;
      let username = account.DT.username;
      let token = account.DT.access_token;

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
    if (window.location.pathname !== "/login") {
      if (stateRef.current === false) {
        stateRef.current = true;
        fetchUser();
      }
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
