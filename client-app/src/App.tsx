import { useContext, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserContext, UserContextType } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
