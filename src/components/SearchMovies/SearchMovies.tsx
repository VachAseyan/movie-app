import { useNavigate, useParams } from "react-router-dom";
import { searchMovie } from "../../api";
import { useEffect, useState } from "react";
import { Col, Row, Pagination, Typography, Spin, Button, Result, message } from "antd";
import FilmCard from "../FilmCard/FilmCard";
import { Movie } from '../../types/Movie';

const { Title } = Typography;


interface RouteParams extends Record<string, string | undefined> {
  searchQuery?: string;
  pageId?: string;
}

const SearchMovies = () => {
  const navigate = useNavigate();
  const { searchQuery = "", pageId = "1" } = useParams<RouteParams>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [messageApi, contextHolder] = message.useMessage();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/search/${searchQuery}/page/${page}`);
  };

  useEffect(() => {
    const parsed = Number(pageId);
    if (isNaN(parsed) || parsed < 1 || parsed > 500) {
      navigate("*");
    } else {
      setCurrentPage(parsed);
    }
  }, [pageId, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  useEffect(() => {
    setLoading(true);
    searchMovie(searchQuery, Number(pageId))
      .then((data) => {
        setMovies(data.results);
        setTotalResults(data.totalResults);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        messageApi.error("Failed to load movies.");
      });
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
      {contextHolder}
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
                <FilmCard movie={movie} onMovieClick={handleMovieClick} messageApi={messageApi} />
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
