// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
export default function Headers(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mx-8 mt-2.5">
      <p className="font-bold text-[#F0648C]">돌려돌려LP판</p>
      <div className="mr-1 flex space-x-2">
        <button className="text-sm border rounded px-3 hover:bg-[#F0648C]"
           onClick={() => navigate("/LoginPage")}
        >
          로그인
        </button>
        <button className="text-sm border rounded px-3 hover:bg-[#F0648C]"
            onClick={() => navigate("/EmailSignUpPage")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};