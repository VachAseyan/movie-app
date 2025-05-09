import { useEffect, useState } from "react";
import { getPopularMovies, getAllMovies } from "../../api";
import { Row, Col, Typography, Spin, Pagination, Carousel, message } from "antd";
import { auth } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import FilmCard from "../FilmCard/FilmCard";
import PopularMovieCard from "../PopularMovieCard/PopularMovieCard";
import { useAppSelector } from "../../app/hooks";
import banner from "../../assets/banner.png";
const { Title } = Typography;

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { pageId } = useParams();
    const navigate = useNavigate();
    const isSearching = useAppSelector(state => state.search.isSearching);
    const searchQuery = useAppSelector(state => state.search.searchQuery);
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);


    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [currentPage]);


    useEffect(() => {
        if (pageId) {
            const parsed = Number(pageId);
            if (isNaN(parsed) || parsed > 100 || parsed < 1) {
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

    console.log(movies);
    

    const handlePageChange = (page) => {
        navigate(`/page/${page}`);
        setCurrentPage(page);
    };

    const handleMovieClick = (movieId) => {
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
                    borderRadius: '16px',
                    backgroundImage: `url(${banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '350px',
                    padding: '80px 20px',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Title style={{ color: 'white', fontSize: '55px', marginBottom: '10px' }}>Welcome to Cinema World</Title>
                <p style={{ fontSize: '30px', maxWidth: '700px', margin: '0 auto' }}>
                    Discover and explore thousands of movies, from timeless classics to the latest blockbusters.
                </p>
            </div>
            {contextHolder}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '20px'
                }}
            >
                {isSearching ? (
                    <div>
                        <h1>Searching for {searchQuery}</h1>
                    </div>
                ) : (
                    <div>
                        <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
                            <Title level={2} style={{ marginBottom: '24px', color: 'white', fontWeight: '600' }}>Top Rated Movies</Title>
                            <Carousel
                                autoplay
                                autoplaySpeed={3000}
                                dots
                                slidesToShow={5}
                                slidesToScroll={1}
                                infinite
                                style={{ paddingBottom: '40px' }}
                            >
                                {popularMovies.map((movie) => (
                                    <div key={movie.id}>
                                        <div style={{
                                            margin: '0 10px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            height: '100%'
                                        }}>
                                            <PopularMovieCard movie={movie} onMovieClick={handleMovieClick} />
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
                                        <FilmCard movie={movie} onMovieClick={handleMovieClick} messageApi={messageApi} />
                                    </Col>
                                ))}
                            </Row>

                            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                <Pagination
                                    current={currentPage}
                                    total={2000}
                                    pageSize={20}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                    style={{ display: 'inline-block' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;