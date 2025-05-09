import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const RedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const userId = urlParams.get('userId');
    const name = urlParams.get('name');
  
    if (accessToken && refreshToken && userId) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('name', decodeURIComponent(name || ''));
  
      login(accessToken);
      setTimeout(() => {
        navigate('/');
      }, 100);
    } else {
      navigate('/LoginPage');
    }
  }, [navigate, login]);
  

  return <div>로그인 처리 중입니다...</div>;
};

export default RedirectPage;
