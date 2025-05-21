// src/layout/ProtectedLayout.tsx
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedLayout() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) {
      // 로그인 필요 경고
      window.alert("로그인이 필요한 서비스입니다.\n로그인해주세요!");
      // 확인 누르면 로그인 페이지로 이동, 기존 위치는 state로 전달
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [accessToken, navigate, location]);

  // 토큰 없으면 자식 컴포넌트(render) 막기
  if (!accessToken) {
    return null;
  }

  // 로그인된 경우에만 자식 라우트 렌더링
  return <Outlet />;
}
