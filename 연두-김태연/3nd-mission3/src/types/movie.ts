export type Movie = {
    adult: boolean;
    backdrop_path:string;
    genre_ids : number[];
    id : number;
    original_language: string;
    original_title: string;
    overview : string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count : number;
};

// 필요에 따라 사용해서 모든 api에 맞는 type을 따로 설정X -> 대신 TMDB용 공통 타입 구성 붙임

export interface MovieBase {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
  }
  
  export interface MovieDetail extends MovieBase {
    backdrop_path: string;
    vote_average: number;
    genre_ids: number[];
  }
  
  export interface CastMember {
    cast_id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }
  