const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjkwYWU0YWY5ZjFhNjFlMWNiMTEzNzBmODUwNDQyNCIsIm5iZiI6MTc0NjM3Mjg0Ny43MSwic3ViIjoiNjgxNzg4ZWZjOTIzOGNhOWY5YTIxNmU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.00l7LdXUIIL0XuL9Lh6N1EsbvlfYo6bRzgF1apJGq6Y";

const BASE_URL = "https://api.themoviedb.org/3/discover/movie?language=en-US&page=";

const TOP_RATED_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=5";

const IMAGE_BASE_URL = "https://media.themoviedb.org/t/p/w440_and_h660_face";

const getImageUrl = (path: string) => {
    return `${IMAGE_BASE_URL}${path}`;
};

const getAllMovies = async (page) => {
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



const getMovieDetails = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
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




export { getAllMovies, getImageUrl, getMovieDetails, getPopularMovies };
