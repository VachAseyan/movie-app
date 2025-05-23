const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjkwYWU0YWY5ZjFhNjFlMWNiMTEzNzBmODUwNDQyNCIsIm5iZiI6MTc0NjM3Mjg0Ny43MSwic3ViIjoiNjgxNzg4ZWZjOTIzOGNhOWY5YTIxNmU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.00l7LdXUIIL0XuL9Lh6N1EsbvlfYo6bRzgF1apJGq6Y";

const BASE_URL = "https://api.themoviedb.org/3/discover/movie?language=en-US&page=";

const TOP_RATED_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

const IMAGE_BASE_URL = "https://media.themoviedb.org/t/p/original";

const MOVIE_DETAILS_URL = "https://api.themoviedb.org/3/movie/"

const SEARCH_MOVIE_URL = "https://api.themoviedb.org/3/search/movie";

const VIDEO_URL = `https://api.themoviedb.org/3/movie`;

const getVideo = async (movieId: string) => {
    return fetch(
        `${VIDEO_URL}/${movieId}/videos`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                Accept: "application/json",
            },
        }
    ).then(response => response.json())
};

const getMovieCast = async (movieId:string) => {

    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                Accept: "application/json",
            },
        }
    ).then(res => res.json())
};


const searchMovie = async (query: string, page: number) => {
    try {
        const response = await fetch(
            `${SEARCH_MOVIE_URL}?query=${query}&page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch search movies");
        }

        const data = await response.json();
        return {
            results: data.results,
            totalResults: data.total_results,
        }
    } catch (error) {
        console.error("Error fetching search movies:", error);
        return {
            results: [],
            totalResults: 0,
        }
    }
};

const getImageUrl = (path: string) => {
    return `${IMAGE_BASE_URL}${path}`;
};

const getAllMovies = async (page: number) => {
    try {
        const response = await fetch(
            `${BASE_URL}${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return [];
    }
};


const getMovieDetails = async (movieId: string) => {
    try {
        const response = await fetch(
            `${MOVIE_DETAILS_URL}${movieId}?language=en-US`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

const getPopularMovies = async () => {
    try {
        const response = await fetch(
            `${TOP_RATED_URL}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch popular movies");
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
};




export { getAllMovies, getImageUrl, getMovieDetails, getPopularMovies, searchMovie, getVideo, getMovieCast };