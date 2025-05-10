import { Card, Typography, Rate, Space, theme, Button } from 'antd';
import { CalendarOutlined, DeleteOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons';
import { getImageUrl } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addFavorite, removeFavorite } from '../../features/favorites/favoritesSlice';
import type { MessageInstance } from 'antd/es/message/interface';

const { Text } = Typography;
const { useToken } = theme;

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface FilmCardProps {
  movie: Movie;
  onMovieClick: (id: number) => void;
  messageApi: MessageInstance;
}

const FilmCard: React.FC<FilmCardProps> = ({ movie, onMovieClick, messageApi }) => {
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

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
  };

  return (
    <div onClick={() => onMovieClick(movie.id)} style={{ cursor: 'pointer' }}>
      <Card
        hoverable
        cover={
          movie.poster_path ? (
            <img
              alt={movie.title}
              src={getImageUrl(movie.poster_path)}
              style={{
                height: '400px',
                objectFit: 'cover',
                background: token.colorBgContainer,
              }}
            />
          ) : (
            <div
              style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: token.colorBgContainer,
                color: token.colorTextSecondary,
                fontSize: '18px',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              No Image Available
            </div>
          )
        }
        style={{
          background: token.colorBgElevated,
          borderColor: token.colorBorderSecondary,
        }}
      >
        <Card.Meta
          title={
            <Text
              style={{
                color: token.colorTextHeading,
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
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
        <div style={{ textAlign: 'center', marginTop: '16px' }} onClick={(e) => e.stopPropagation()}>
          {isFavorite ? (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleClick}
              size="middle"
              style={{
                borderRadius: '20px',
                padding: '0 20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              Remove from Favorites
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<HeartOutlined />}
              onClick={handleClick}
              size="middle"
              style={{
                borderRadius: '20px',
                padding: '0 20px',
                backgroundColor: token.colorPrimary,
                borderColor: token.colorPrimary,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              Add to Favorites
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FilmCard;
