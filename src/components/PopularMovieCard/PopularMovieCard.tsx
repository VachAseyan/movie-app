import React from 'react';
import { Card, Typography, Rate, Space, theme } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { getImageUrl } from '../../api';

const { Text } = Typography;
const { useToken } = theme;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface PopularMovieCardProps {
  movie: Movie;
  onMovieClick: (id: number) => void;
}

const PopularMovieCard: React.FC<PopularMovieCardProps> = ({ movie, onMovieClick }) => {
  const { token } = useToken();

  return (
    <div
      onClick={() => onMovieClick(movie.id)}
      style={{ cursor: 'pointer', position: 'relative', overflow: 'visible' }}
    >
      <Card
        hoverable
        style={{ overflow: 'visible' }}
        cover={
          <div style={{ position: 'relative' }}>
            <img
              alt={movie.title}
              src={getImageUrl(movie.poster_path)}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                background: token.colorBgContainer,
                borderRadius: '8px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-15px',
                left: '12px',
                background: '#FFD700',
                borderRadius: '70%',
                padding: '6px 10px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#000',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                zIndex: 1,
              }}
            >
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
        }
      >
        <Card.Meta
          title={
            <Text
              style={{
                color: token.colorTextHeading,
                fontSize: '18px',
                fontWeight: 500,
              }}
            >
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
  );
};

export default PopularMovieCard;
