import { useNavigate, useParams } from "react-router-dom";
import { searchMovie } from "../../api";
import { useEffect, useState } from "react";
import { Col, Row, Pagination, Typography, Spin, Button, Result } from "antd";  // Import Result from Ant Design
import FilmCard from "../FilmCard/FilmCard";

const { Title } = Typography;

const SearchMovies = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { searchQuery, pageId } = useParams();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`/search/${searchQuery}/page/${page}`);
    };

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
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleMovieClick = (movieId: string) => {
        navigate(`/movies/${movieId}`);
    };

    useEffect(() => {
        setCurrentPage(Number(pageId));
        setLoading(true);
        searchMovie(searchQuery, pageId)
            .then((data) => {
                setMovies(data.results);
                setTotalResults(data.totalResults);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [searchQuery, pageId]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div>
            {movies.length === 0 ? (
                <div style={{ textAlign: 'center', paddingTop: '50px' }}>
                    <Result
                        status="404"
                        title="No Movies Found"
                        subTitle={`Sorry, we couldn't find any movies for "${searchQuery}"`}
                        extra={[
                            <Button type="primary" key="home" onClick={() => navigate('/page/1')}>
                                Back to Home
                            </Button>
                        ]}
                    />
                </div>
            ) : (
                <div style={{ padding: '24px' }}>
                    <Title level={2} style={{ marginBottom: '24px' }}>Search Results for "{searchQuery}"</Title>
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
                            total={totalResults}
                            pageSize={20}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            style={{ display: 'inline-block' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchMovies;
