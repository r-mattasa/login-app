import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext} from "./context/AuthContext";

const RequireAuth = () => {
    const {authUser} = useContext(AuthContext);
    const location = useLocation();
    return (
        authUser?.token? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />

    );
}

export default RequireAuth;