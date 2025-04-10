import React from "react";
import Spinner from "../assets/Spinner.gif";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      {/* <h3>잠시만 기다려주세요.</h3> */}
      <img src={Spinner} alt="로딩" width="5%" />
    </div>
  );
};

export default Loading;

// 출처: https://choijying21.tistory.com/139 [JDevelog:티스토리]