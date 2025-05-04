import { Card, Typography, Rate, Space, theme } from 'antd';
import { CalendarOutlined, StarOutlined } from '@ant-design/icons';
import { getImageUrl } from '../../api';

const { Text } = Typography;
const { useToken } = theme;

const FilmCard = ({ movie }) => {
    const { token } = useToken();

    return (
        <Card
            hoverable
            cover={
                <img
                    alt={movie.title}
                    src={getImageUrl(movie.poster_path)}
                    style={{ 
                        height: '400px', 
                        objectFit: 'cover',
                        background: token.colorBgContainer
                    }}
                />
            }
            style={{
                background: token.colorBgElevated,
                borderColor: token.colorBorderSecondary
            }}
        >
            <Card.Meta
                title={
                    <Text style={{ 
                        color: token.colorTextHeading,
                        fontSize: '16px',
                        fontWeight: 500
                    }}>
                        {movie.title}
                    </Text>
                }
                description={
                    <Space direction="vertical" size="small">
                        <Space>
                            <StarOutlined style={{ color: token.colorWarning }} />
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
    );
};

export default FilmCard;
