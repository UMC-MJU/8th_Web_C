import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState("ko-KR");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    const params = new URLSearchParams({
      query,
      include_adult: String(includeAdult),
      language,
    });
    navigate(`/?${params.toString()}`);  
  };

  return (
    <div className="bg-opacity-80 text-black p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto space-y-4">
      <div className="flex w-full">
        <p className="w-1/2 text-center font-semibold flex items-center justify-center gap-1">
          🎬 영화 제목
        </p>
        <p className="w-1/2 text-center font-semibold flex items-center justify-center gap-1">
          ⚙️ 옵션
        </p>
      </div>

      <div className="flex w-full gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 제목을 입력하세요"
          className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label className="w-1/2 flex items-center justify-center gap-2">
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(e) => setIncludeAdult(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <span className="text-sm">성인 콘텐츠 표시</span>
        </label>
      </div>

      <div className="flex flex-col items-start gap-1">
        <p className="text-sm font-medium flex items-center gap-1">🌐 언어</p>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ko-KR">한국어</option>
          <option value="ja-JP">일본어</option>
          <option value="en-US">영어</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
      >
        🔍 검색하기
      </button>
    </div>
  );
}
