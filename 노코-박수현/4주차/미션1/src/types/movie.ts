export type BaseMovie = {
    adult: boolean;
    backdrop_path: string;
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
}
export type Movie = BaseMovie & {
    adult: boolean;
}

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type BaseMoviePserson = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
}

export type MovieCast = BaseMoviePserson & {
    cast_id: number;
    character: string;
    order: number;
}
export type MovieCrew = BaseMoviePserson &{
    department: string;
    job: string;
}
export type movieCreditResponse = {
    id: number;
    cast: MovieCast[];
    crew: MovieCrew[];
}

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
export type BelongsToCollection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}
export type MovieDetailsResponse = BaseMovie & {
    belongs_to_collection: BelongsToCollection | null;
    budget: number;
    genres: MovieGenre[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    production_companies: MovieCompany[];
    production_countries: MovieCountry[];
    revenue: number;
    runtime: number;
    spoken_languages: MovieSpeakLanguage[];
    status: string;
    tagline: string;
}