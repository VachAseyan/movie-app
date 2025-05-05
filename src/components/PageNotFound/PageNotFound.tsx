import { Button, Result, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: '#0d1117',
                padding: '24px',
            }}
        >
            <Result
                status="404"
                title={
                    <Text
                        style={{
                            fontSize: '48px',
                            fontWeight: 700,
                            color: '#ffffff',
                        }}
                    >
                        404
                    </Text>
                }
                subTitle={
                    <Text
                        style={{
                            fontSize: '20px',
                            color: '#8b949e',
                        }}
                    >
                        Oops! The page you're looking for doesn't exist.
                    </Text>
                }
                extra={
                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate('/')}
                            style={{
                                height: '48px',
                                padding: '0 32px',
                                borderRadius: '8px',
                                fontWeight: 500,
                                background: '#1f6feb',
                                border: 'none',
                                color: '#fff',
                                boxShadow: '0 4px 12px rgba(31, 111, 235, 0.4)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#388bfd')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#1f6feb')}
                        >
                            Return Home
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            onClick={() => navigate(-1)}
                            style={{
                                height: '48px',
                                padding: '0 32px',
                                borderRadius: '8px',
                                fontWeight: 500,
                                background: '#21262d',
                                color: '#c9d1d9',
                                border: '1px solid #30363d',
                            }}
                        >
                            Go Back
                        </Button>
                    </Space>
                }
                style={{
                    padding: '40px',
                    borderRadius: '12px',
                    background: '#161b22', // card background
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                }}
            />
        </div>
    );
};

export default NotFoundPage;
