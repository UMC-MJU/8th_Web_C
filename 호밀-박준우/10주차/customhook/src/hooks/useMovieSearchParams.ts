import { useState } from 'react';
import type { MovieSearchParams } from '../types/movie';


export function useMovieSearchParams() {
  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('en-US'); // 기본값: 한국어

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleIncludeAdultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeAdult(e.target.checked);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const getSearchParams = (): MovieSearchParams => ({
    query,
    include_adult: includeAdult,
    language,
  });

  return {
    query,
    includeAdult,
    language,
    handleQueryChange,
    handleIncludeAdultChange,
    handleLanguageChange,
    getSearchParams,
  };
}
