import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HomeLayout from "./HomeLayout";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    const location = useLocation();
    if (!accessToken) {
        alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
        return <Navigate to={"/login"} state={{ location }} replace />;
    }

    return (
        <HomeLayout />
    )
}
export default ProtectedLayout;