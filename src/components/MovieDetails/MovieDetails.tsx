import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Typography, Button } from "antd";
import { getMovieDetails } from "../../api";

const { Title, Paragraph } = Typography;

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!movieId) {
            navigate("*");
            return;
        }

        setLoading(true);
        getMovieDetails(movieId)
            .then((data) => {
                if (!data) {
                    navigate("*");
                } else {
                    setMovie(data);
                }
            })
            .catch(() => navigate("*"))
            .finally(() => setLoading(false));
    }, [movieId, navigate]);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div style={{ padding: "24px" }}>
            <Button onClick={() => navigate(-1)} style={{ marginBottom: "16px" }}>
                Back
            </Button>
            <Title level={2}>{movie.title}</Title>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "300px", borderRadius: "12px", marginBottom: "16px" }}
            />
            <Paragraph><strong>Release Date:</strong> {movie.release_date}</Paragraph>
            <Paragraph><strong>Rating:</strong> {movie.vote_average}</Paragraph>
            <Paragraph><strong>Overview:</strong> {movie.overview}</Paragraph>
        </div>
    );
};

export default MovieDetails;
