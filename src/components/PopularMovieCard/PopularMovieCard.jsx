
import { Card, Typography, Rate, Space, theme } from 'antd';
import { CalendarOutlined, StarOutlined } from '@ant-design/icons';
import { getImageUrl } from '../../api';

const { Text } = Typography;
const { useToken } = theme;

const PopularMovieCard = ({ movie, onMovieClick }) => {
    const { token } = useToken();
    return (
        <div onClick={() => onMovieClick(movie.id)} style={{ cursor: "pointer" }}>
            <Card
                hoverable
                cover={
                    <img
                        alt={movie.title}
                        src={getImageUrl(movie.poster_path)}
                        style={{
                            height: 'auto'  ,
                            objectFit: 'cover',
                            background: token.colorBgContainer
                        }}
                    />
                }
            >
                <Card.Meta
                    title={
                        <Text style={{
                            color: token.colorTextHeading,
                            fontSize: '25px',
                            fontWeight: 500
                        }}>
                            {movie.title}
                        </Text>
                    }
                    description={
                        <Space direction="vertical" size="small">
                            <Space>
                                <Rate
                                    disabled
                                    defaultValue={movie.vote_average / 2}
                                    allowHalf
                                    style={{ fontSize: '14px' }}
                                />
                                <Text type="secondary">({movie.vote_average.toFixed(1)})</Text>
                            </Space>
                            <Space>
                                <CalendarOutlined style={{ color: token.colorTextSecondary }} />
                                <Text type="secondary">{movie.release_date}</Text>
                            </Space>
                        </Space>
                    }
                />
            </Card>
        </div>
    )
}

export default PopularMovieCard;
