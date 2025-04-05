export type MovieGenre = {
    id: number;
    name: string;
}
export type MovieCompany = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
export type MovieCountry = {
    iso_3166_1: string;
    name: string;
}
export type MovieSpeakLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string
}
export type MovieDetailsResponse = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null;
    budget: number;
    genres: MovieGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: MovieCompany[];
    production_countries: MovieCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: MovieSpeakLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}