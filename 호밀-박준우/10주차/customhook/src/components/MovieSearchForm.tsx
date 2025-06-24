import React from 'react';
import { useMovieSearchParams } from '../hooks/useMovieSearchParams';
import type { MovieSearchParams } from '../types/movie';

interface MovieSearchFormProps {
  onSearch: (params: MovieSearchParams) => void;
}

const MovieSearchForm: React.FC<MovieSearchFormProps> = ({ onSearch }) => {
  const {
    query,
    includeAdult,
    language,
    handleQueryChange,
    handleIncludeAdultChange,
    handleLanguageChange,
    getSearchParams,
  } = useMovieSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = getSearchParams();
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div>
        <label>
          🎬 영화 제목
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="영화 제목을 입력하세요"
            style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
          />
        </label>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <label>
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={handleIncludeAdultChange}
          />
          성인 콘텐츠 표시
        </label>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <label>
          언어
          <select value={language} onChange={handleLanguageChange} style={{ marginLeft: '0.5rem' }}>
            <option value="ko-KR">한국어</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
          </select>
        </label>
      </div>
      <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        🔍 검색하기
      </button>
    </form>
  );
};

export default MovieSearchForm;
