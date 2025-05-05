import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Typography, Button, Card, Row, Col, Rate, Space } from "antd";
import { getMovieDetails } from "../../api";
import { ArrowLeftOutlined, StarFilled, CalendarOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const parsedId = Number(movieId);
        if (isNaN(parsedId)) {
            navigate("*");
            return;
        }
        setTimeout(() => {
            getMovieDetails(parsedId)
                .then((data) => {
                    if (!data) {
                    navigate("*");
                } else {
                    setMovie(data);
                }
            })
            .catch(() => navigate("*"))
            .finally(() => setLoading(false));
        }, 1000);
    }, []);

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
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                style={{ marginBottom: "24px" }}
            >
                Back to Movies
            </Button>

            <Card bordered={false}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={10}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: "100%", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        />
                    </Col>
                    <Col xs={24} md={14}>
                        <Title level={2} style={{ marginBottom: 0 }}>{movie.title}</Title>
                        <Space size="middle" style={{ marginTop: 12, marginBottom: 24 }}>
                            <CalendarOutlined />
                            <Text type="secondary">{movie.release_date}</Text>
                        </Space>

                        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
                            <Space align="center">
                                <StarFilled style={{ color: "#faad14" }} />
                                <Rate disabled allowHalf value={movie.vote_average / 2} />
                                <Text type="secondary">({movie.vote_average.toFixed(1)})</Text>
                            </Space>

                            <Paragraph style={{ marginTop: 16 }}>
                                <Text strong>Overview:</Text> <br />
                                {movie.overview}
                            </Paragraph>

                            {movie.genres && (
                                <Paragraph>
                                    <Text strong>Genres:</Text> {movie.genres.map(g => g.name).join(', ')}
                                </Paragraph>
                            )}

                            {movie.runtime && (
                                <Paragraph>
                                    <Text strong>Runtime:</Text> {movie.runtime} minutes
                                </Paragraph>
                            )}
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default MovieDetails;
