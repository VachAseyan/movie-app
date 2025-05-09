import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Spin,
    Typography,
    Button,
    Card,
    Row,
    Col,
    Space,
    message,
    Tag,
    Progress,
} from "antd";
import {
    ArrowLeftOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    HeartOutlined,
    HeartFilled,
} from "@ant-design/icons";
import { getImageUrl, getMovieCast, getMovieDetails, getVideo } from "../../api";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./MovieDetails.module.css";

const { Title, Paragraph, Text } = Typography;

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [cast, setCast] = useState([])
    const [movie, setMovie] = useState([]);
    const [videoKey, setVideoKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const favorites = useAppSelector((state) => state.favorites.favorites);
    const isFavorite = movie && favorites.some((fav) => fav.id === movie.id);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });

    }, [movieId])

    useEffect(() => {
        const parsedId = Number(movieId);
        if (isNaN(parsedId)) {
            navigate("*");
            return;
        }

        setLoading(true);

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
    }, [movieId, navigate]);


    useEffect(() => {
        getVideo(movieId)
            .then((data) => {
                const key = data?.results?.[0]?.key;
                if (key) {
                    setVideoKey(key);
                }
            })
            .catch(() => navigate("*"));
    }, [movieId, navigate]);

    useEffect(() => {
        getMovieCast(movieId).then((data) => {
            setCast(data.cast);
        });
    }, [movieId]);

    const handleClick = () => {
        if (!movie) return;

        if (isFavorite) {
            dispatch(removeFavorite(movie.id));
            messageApi.open({
                type: "warning",
                content: `${movie.title} removed from favorites`,
            });
        } else {
            dispatch(addFavorite(movie));
            messageApi.open({
                type: "success",
                content: `${movie.title} added to favorites`,
            });
        }
    };

    if (loading) {
        return (
            <div
                className={
                    styles.loadingContainer
                }
            >
                <Spin size="large" />
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`
            }}
        >
            {contextHolder}
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                className={styles.backButton}
            >
                Back to Movies
            </Button>

            <Card bordered={false} className={styles.card}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8} lg={6}>
                        {movie.poster_path ? (
                            <img
                                src={getImageUrl(movie.poster_path)}
                                alt={movie.title}
                                className={styles.poster}
                            />
                        ) : (
                            <div className={styles.noPoster}>
                                No image available
                            </div>
                        )}
                    </Col>

                    <Col xs={24} md={8} lg={9}>
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Title level={2} className={styles.movieTitle}>
                                {movie.title}
                            </Title>
                            {movie.original_title !== movie.title && (
                                <Title level={2} className={styles.originalTitle}>
                                    ({movie.original_title})
                                </Title>
                            )}

                            <Space size="large" wrap>
                                <Space>
                                    <CalendarOutlined className={styles.icon} />
                                    <Text className={styles.infoText}>
                                        {movie.release_date}
                                    </Text>
                                </Space>
                                <Space>
                                    <ClockCircleOutlined className={styles.icon} />
                                    <Text className={styles.infoText}>
                                        {movie.runtime} min
                                    </Text>
                                </Space>
                            </Space>

                            <div className={styles.scoreContainer}>
                                <Progress
                                    type="circle"
                                    percent={Math.round(movie.vote_average * 10)}
                                    width={80}
                                    strokeColor={movie.vote_average > 7 ? "#4CAF50" : "#FFC107"}
                                    trailColor="rgba(255, 255, 255, 0.1)"
                                    format={(percent) => (
                                        <span className={styles.scoreText}>{percent}%</span>
                                    )}
                                />
                                <div>
                                    <Text strong className={styles.scoreLabel}>
                                        User Score
                                    </Text>
                                </div>
                            </div>

                            <Paragraph className={styles.overview}>
                                {movie.overview}
                            </Paragraph>

                            {movie.genres && (
                                <Space direction="vertical">
                                    <Text strong className={styles.genreTitle}>
                                        Genres
                                    </Text>
                                    <Space wrap>
                                        {movie.genres.map((genre) => (
                                            <Tag
                                                key={genre.id}
                                                className={styles.genreTag}
                                            >
                                                {genre.name}
                                            </Tag>
                                        ))}
                                    </Space>
                                </Space>
                            )}

                            <Button
                                icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                                onClick={handleClick}
                                size="large"
                                className={`${styles.favoriteButton} ${isFavorite ? styles.added : styles.notAdded
                                    }`}
                            >
                                {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                            </Button>
                        </Space>
                    </Col>

                    <Col xs={24} md={8} lg={9}>
                        <div className={styles.trailerSection}>
                            <Title level={3} className={styles.trailerTitle}>
                                Trailer
                            </Title>
                            {videoKey ? (
                                <div className={styles.trailerContainer}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoKey}`}
                                        title="Movie Trailer"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className={styles.trailerIframe}
                                    ></iframe>
                                </div>
                            ) : (
                                <Text className={styles.noTrailer}>No trailer available</Text>
                            )}
                        </div>
                    </Col>

                    {cast.length > 0 && (<>
                        <Title level={3} className={styles.castTitle}>
                            Casts
                        </Title>

                        <Row gutter={[24, 32]} className={styles.castGrid}>
                            {cast
                                .filter((actor) => actor.profile_path)
                                .slice(0, 12)
                                .map((actor) => (
                                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={actor.id}>
                                        <div className={styles.castCard}>
                                            <img
                                                src={`https://www.themoviedb.org/t/p/w276_and_h350_face${actor.profile_path}`}
                                                alt={actor.name}
                                                className={styles.castImage}
                                            />
                                            <div className={styles.castInfo}>
                                                <Text strong className={styles.castName}>
                                                    {actor.name}
                                                </Text>
                                                <Text className={styles.castCharacter}>
                                                    {actor.character}
                                                </Text>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                        </Row>
                    </>
                    )}
                </Row>
            </Card>
        </div>
    );
};

export default MovieDetails;
