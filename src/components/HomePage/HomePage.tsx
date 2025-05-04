import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api";
import { Row, Col, Typography, Spin } from 'antd';
import FilmCard from "../FilmCard/FilmCard";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate("/login");
            }
        });

        getTrendingMovies().then((data) => {
            setMovies(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>Trending Movies</Title>
            <Row gutter={[24, 24]}>
                {movies.map((movie) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
                        <FilmCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default HomePage;