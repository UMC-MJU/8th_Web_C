export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export interface Cast {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  tagline?: string;
  credits?: {
    cast?: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
}
