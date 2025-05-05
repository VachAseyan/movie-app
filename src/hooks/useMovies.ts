import { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

interface MoviesResponse {
    results: Movie[];
    total_pages: number;
    total_results: number;
    page: number;
}

const API_KEY = 'your_api_key'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const useMovies = (page: number) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get<MoviesResponse>(
                    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
                );
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
                setError(null);
            } catch (err) {
                setError('Failed to fetch movies');
                console.error('Error fetching movies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    return { movies, loading, error, totalPages };
}; 