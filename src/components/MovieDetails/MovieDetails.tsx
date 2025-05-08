import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Typography, Button, Card, Row, Col, Rate, Space, message, Tag, Progress } from "antd";
import { getImageUrl, getMovieDetails } from "../../api";
import {
    ArrowLeftOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    HeartOutlined,
    HeartFilled
} from "@ant-design/icons";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const { Title, Paragraph, Text } = Typography;

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

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

    const handleClick = () => {
        if (isFavorite) {
            dispatch(removeFavorite(movie.id));
            messageApi.open({
                type: 'warning',
                content: `${movie.title} removed from favorites`,
            });
        } else {
            dispatch(addFavorite(movie));
            messageApi.open({
                type: 'success',
                content: `${movie.title} added to favorites`,
            });
        }
    }


    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to bottom, #141414, #1f1f1f)"
            }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div>
            {contextHolder}
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
            >
                Back to Movies
            </Button>


            <Card
                bordered={false}
            >
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={10}>
                        <div style={{ position: "relative" }}>
                            <img
                                src={getImageUrl(movie.poster_path)}
                                alt={movie.title}
                                style={{
                                    width: "100%",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                }}
                            />
                        </div>
                    </Col>

                    <Col xs={24} md={14}>
                        <Space direction="vertical" size="large" style={{ width: "100%" }} >
                            <Title level={2} style={{
                                marginBottom: 0,
                                fontSize: "45px",
                                color: "#fff",
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                            }}>
                                {movie.title}
                            </Title>

                            <Space size="large" style={{ marginTop: 12 }}>
                                <Space>
                                    <CalendarOutlined style={{ color: "#1890ff" }} />
                                    <Text style={{
                                        fontSize: "18px",
                                        color: "#fff"
                                    }}>
                                        {movie.release_date}
                                    </Text>
                                </Space>
                                <Space>
                                    <ClockCircleOutlined style={{ color: "#1890ff" }} />
                                    <Text style={{
                                        fontSize: "18px",
                                        color: "#fff"
                                    }}>
                                        {movie.runtime} min
                                    </Text>
                                </Space>
                            </Space>

                            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                                    <Progress
                                        type="circle"
                                        percent={Math.round(movie.vote_average * 10)}
                                        width={80}
                                        strokeColor={
                                            "#FFD700"
                                        }
                                        format={(percent) => `${percent}%`}
                                    />
                                    <div>
                                        <Text strong style={{ fontSize: "18px", color: "#fff" }}>User Score</Text>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                                            <Rate
                                                disabled
                                                allowHalf
                                                value={movie.vote_average / 2}
                                                style={{ fontSize: "16px" }}
                                            />
                                            <Text style={{
                                                fontSize: "16px",
                                                color: "#ffd700"
                                            }}>
                                                {movie.vote_average.toFixed(1)}
                                            </Text>
                                        </div>
                                    </div>
                                </div>

                                <Paragraph style={{
                                    fontSize: "18px",
                                    color: "#fff",
                                    lineHeight: "1.6"
                                }}>
                                    {movie.overview}
                                </Paragraph>

                                {movie.genres && (
                                    <Space direction="vertical" size="small">
                                        <Text strong style={{
                                            fontSize: "20px",
                                            color: "#fff"
                                        }}>
                                            Genres
                                        </Text>
                                        <Space size={[8, 8]} wrap>
                                            {movie.genres.map(genre => (
                                                <Tag
                                                    key={genre.id}
                                                    style={{
                                                        background: "#FFD700",
                                                        color: "black",
                                                        border: "none",
                                                        padding: "4px 12px",
                                                        borderRadius: "16px",
                                                        fontSize: "14px"
                                                    }}
                                                >
                                                    {genre.name}
                                                </Tag>
                                            ))}
                                        </Space>
                                    </Space>
                                )}
                            </Space>

                            <Button
                                icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                                onClick={handleClick}
                                size="large"
                                style={{
                                    marginTop: "24px",
                                    height: "50px",
                                    borderRadius: "24px",
                                    fontSize: "18px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    width: "200px",
                                    border: "none",
                                    color: "#fff"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = "0.9";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = "1";
                                }}
                            >
                                {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default MovieDetails;