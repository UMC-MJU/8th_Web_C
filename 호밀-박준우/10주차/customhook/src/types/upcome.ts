export type Upcome = {
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

type Dates = {
    maximum: string,
    minimum: string,
}

export type UpcomeResponse = {
    dates: Dates;
    page: number;
    results: Upcome[]; // 실제로 들어오는거는 여러개의 영화 데이터니 Movie의 배열로 표현
    total_pages: number;
    total_results: number;
};
