import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Typography, Button, Card, Row, Col, Rate, Space } from "antd";
import { getImageUrl, getMovieDetails } from "../../api";
import { ArrowLeftOutlined, StarFilled, CalendarOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState([]);
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
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            style={{ width: "100%", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        />
                    </Col>
                    <Col xs={24} md={14}>
                        <Title level={2} style={{ marginBottom: 0, fontSize: "45px" }}>{movie.title}</Title>
                        <Space size="middle" style={{ marginTop: 12, marginBottom: 24 }}>
                            <CalendarOutlined />
                            <Text type="secondary" style={{ fontSize: "20px" }}>{movie.release_date}</Text>
                        </Space>

                        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
                            <Space align="center">
                                <Rate disabled allowHalf value={movie.vote_average / 2} />
                                <Text type="secondary" style={{ fontSize: "22px" }}>({movie.vote_average.toFixed(1)})</Text>
                            </Space>

                            <Paragraph style={{ marginTop: 16, fontSize: "20px" }}>
                                <Text strong style={{ fontSize: "30px" }}>Overview</Text> <br />
                                {movie.overview}
                            </Paragraph>

                            {movie.genres && (
                                <Paragraph style={{ fontSize: "25px" }}>
                                    <Text strong style={{ fontSize: "25px" }}>Genres:</Text> {movie.genres.map(g => g.name).join(', ')}
                                </Paragraph>
                            )}

                            {movie.runtime && (
                                <Paragraph style={{ fontSize: "25px" }}>
                                    <Text strong style={{ fontSize: "25px" }}>Runtime:</Text> {movie.runtime} minutes
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
