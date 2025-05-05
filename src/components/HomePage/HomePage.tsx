import { useEffect, useState } from "react";
import { getPopularMovies, getAllMovies } from "../../api";
import { Row, Col, Typography, Spin, Pagination, Carousel } from "antd";
import { auth } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import FilmCard from "../FilmCard/FilmCard";
import PopularMovieCard from "../PopularMovieCard/PopularMovieCard";
const { Title, Paragraph } = Typography;

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
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
        getPopularMovies().then((data) => {
            setPopularMovies(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        getAllMovies(currentPage).then((data) => {
            setMovies(data);
            setLoading(false);
        });
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        navigate(`/page/${page}`);
        setCurrentPage(page);
    };

    const handleMovieClick = (movieId: string) => {
        navigate(`/movies/${movieId}`);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div>
            <div
                style={{
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '20px'
                }}
            >
                <div>
                    <Title style={{ color: 'white' }}>🎬 KinoMan</Title>
                    <Paragraph style={{ fontSize: '18px', color: '#f0f0f0' }}>
                        Discover trending movies, explore top hits of the year, and never miss a cinematic moment.
                    </Paragraph>
                </div>
            </div>

            <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
                <Title level={2} style={{ marginBottom: '24px', color: 'white', fontWeight: '600' }}>Popular Movies</Title>
                <Carousel
                    autoplay
                    autoplaySpeed={3000}
                    dots={true}
                    slidesToShow={4}
                    slidesToScroll={1}
                    infinite={true}
                    style={{ paddingBottom: '40px' }}
                >
                    {popularMovies.map((movie) => (
                        <div
                            key={movie.id}
                        >
                            <div style={{
                                margin: '0 10px',
                                transition: 'transform 0.3s ease',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                height: '100%'
                            }}>
                                <PopularMovieCard
                                    movie={movie}
                                    onMovieClick={handleMovieClick}
                                    style={{ height: '100%' }}
                                />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div style={{ padding: '24px' }}>
                <Title level={2} style={{ marginBottom: '24px' }}>All Movies</Title>
                <Row gutter={[24, 24]}>
                    {movies.map((movie) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={movie.id}>
                            <FilmCard movie={movie} onMovieClick={handleMovieClick} />
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
        </div>
    );
};

export default HomePage;