import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  console.log("아바타주소:", data?.data?.avatar);
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
  <div className="bg-white p-8 rounded-xl shadow-md text-center space-y-4">
    <h1 className="text-xl font-semibold">{data?.data.name}님 환영합니다.</h1>
    <img
      src={data?.data.avatar as string}
      alt="구글 로고"
      className="w-24 h-24 rounded-full mx-auto"
    />
    <h1 className="text-gray-600">{data?.data.email}</h1>

    <button
      className="cursor-pointer bg-blue-500 text-white rounded-md px-6 py-3 hover:scale-95 transform transition duration-200"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  </div>
</div>

  );
};

export default MyPage;