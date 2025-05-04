const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjkwYWU0YWY5ZjFhNjFlMWNiMTEzNzBmODUwNDQyNCIsIm5iZiI6MTc0NjM3Mjg0Ny43MSwic3ViIjoiNjgxNzg4ZWZjOTIzOGNhOWY5YTIxNmU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.00l7LdXUIIL0XuL9Lh6N1EsbvlfYo6bRzgF1apJGq6Y";

const BASE_URL = "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1";

const IMAGE_BASE_URL = "https://media.themoviedb.org/t/p/w440_and_h660_face";

const getImageUrl = (path) => {
    return `${IMAGE_BASE_URL}${path}`;
};

const getTrendingMovies = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                Accept: "application/json",
            },
        });

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

export { getTrendingMovies,getImageUrl};
