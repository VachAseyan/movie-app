import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api";
import { Row, Col, Typography, Spin, Pagination } from "antd";
import { auth } from "../../firebase";
import FilmCard from "../FilmCard/FilmCard";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { pageId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (pageId) {
            const parsed = Number(pageId);
            if (isNaN(parsed)) {
                navigate("*");
            } else {
                setCurrentPage(parsed);
            }
        }
    }, [pageId, navigate]);

    useEffect(() => {
        setLoading(true);
        getTrendingMovies(currentPage).then((data) => {
            setMovies(data);
            setLoading(false);
        });
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        navigate(`/page/${page}`);
        setCurrentPage(page);
    };

    const handleMovieClick = (movieId: string) => {
        navigate(`/movie/${movieId}`);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>All Movies</Title>
            <Row gutter={[24, 24]}>
                {movies.map((movie) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
                        <FilmCard movie={movie} onClick={() => handleMovieClick(movie.id)} />
                    </Col>
                ))}
            </Row>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Pagination
                    current={currentPage}
                    total={50 * 20}
                    pageSize={20}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    style={{ display: 'inline-block' }}
                />
            </div>
        </div>
    );
};

export default HomePage;
