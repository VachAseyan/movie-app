import { Pagination, Row, Col, Typography, message, Empty } from "antd";
import { useAppSelector } from "../../app/hooks";
import FilmCard from "../FilmCard/FilmCard";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeartOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Favorites = ({ onMovieClick = () => { } }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const { pageId } = useParams();
    const navigate = useNavigate();

    const pageSize = 20;
    const currentPage = Number(pageId) || 1;
    const totalPages = Math.ceil(favorites.length / pageSize);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            navigate(`/favorites/page/${totalPages}`, { replace: true });
        } else if (currentPage > 1 && favorites.length === 0) {
            navigate("/favorites", { replace: true });
        }
    }, [favorites.length, currentPage, totalPages, navigate]);

    const handlePageChange = (page: number) => {
        navigate(`/favorites/page/${page}`);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentFavorites = favorites.slice(startIndex, endIndex);

    return (
        <div>
            {contextHolder}

            {favorites.length === 0 ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <div style={{
                            color: '#fff',
                            textAlign: 'center',
                            animation: 'fadeIn 0.5s ease-in'
                        }}>
                            <Title level={3} style={{ color: '#8c8c8c' }}>
                                No Favorites Yet
                            </Title>
                            <Typography.Text style={{
                                fontSize: '18px',
                                color: '#6c6c6c'
                            }}>
                                Start exploring and add movies to your favorites!
                            </Typography.Text>
                        </div>
                    }
                    style={{
                        margin: '80px 0',
                        padding: '40px',
                        borderRadius: '16px',

                    }}
                />
            ) : (
                <>
                    <div style={{
                        marginBottom: '32px',
                        textAlign: 'center',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        <Title level={2} style={{
                            color: '#fff',
                            marginBottom: '16px',
                            fontSize: '36px',
                            fontWeight: '600',
                            letterSpacing: '1px'
                        }}>
                            <HeartOutlined style={{
                                color: '#ff4d4f',
                                marginRight: '12px',
                                fontSize: '32px'
                            }} />
                            My Favorite Movies
                        </Title>
                        <Typography.Text style={{
                            color: '#8c8c8c',
                            fontSize: '18px'
                        }}>
                            {favorites.length} movies
                        </Typography.Text>
                    </div>
                    <Row
                        gutter={[32, 32]}
                        style={{
                            animation: 'fadeInUp 0.5s ease-in',
                            marginBottom: '40px'
                        }}
                    >
                        {currentFavorites.map((movie, index) => (
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                key={movie.id}
                                style={{
                                    animation: `fadeInUp ${0.2 + index * 0.1}s ease-in`
                                }}
                            >
                                <FilmCard
                                    movie={movie}
                                    onMovieClick={onMovieClick}
                                    messageApi={messageApi}
                                />
                            </Col>
                        ))}
                    </Row>

                    <div style={{
                        textAlign: 'center',
                        padding: '24px 0',
                        borderTop: '1px solid #303030',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        <Pagination
                            current={currentPage}
                            total={favorites.length}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            style={{ display: 'inline-block' }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Favorites;