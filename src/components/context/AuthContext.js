import { createContext ,useState } from "react";
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState({});
    return(
        <AuthContext.Provider value= {{ authUser, setAuthUser }}> 
          {children}  
        </AuthContext.Provider>
    )

}
export default AuthContextProvider;
