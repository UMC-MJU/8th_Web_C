import { useEffect, useState } from "react";
import { MeAPI } from "../api/MeAPI";
import { DelAPI } from "../api/DelAPI";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function MyPage(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
// 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await MeAPI();
        console.log("userData:", userData); 
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);
// 회원 탈퇴
  const DeleteAccount = async() => {
    try{
        await DelAPI();
        // logout();
        navigate("/");
        alert("회원 탈퇴에 완료했습니다.");
    }catch(error){
        console.error("탈퇴 실패: ",error);
        alert("회원 탈퇴에 실패했했습니다.");

    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-6">
      <p>마이페이지</p>
      <p>이름 : {name}</p>
      <p>이메일 : {email}</p>
      <button className="text-sm border rounded px-3 hover:bg-[#F0648C] h-10"
        onClick={DeleteAccount}
      >회원 탈퇴</button>
    </div>
  );
}
function logout() {
    throw new Error("Function not implemented.");
}

