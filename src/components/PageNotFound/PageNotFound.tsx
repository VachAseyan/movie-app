import { Button, Result, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/home'); // Navigate to home page
    };

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page in history
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '24px'
        }}>
            <Result
                status="404"
                title={
                    <Text style={{
                        fontSize: '48px',
                        fontWeight: 600,
                        color: '#1a1b2d'
                    }}>
                        404
                    </Text>
                }
                subTitle={
                    <Text style={{
                        fontSize: '20px',
                        color: '#2d3250'
                    }}>
                        Oops! The page you're looking for doesn't exist.
                    </Text>
                }
                extra={
                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleGoHome}
                            style={{
                                height: '48px',
                                padding: '0 32px',
                                borderRadius: '8px',
                                fontWeight: 500,
                                background: '#1890ff',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#40a9ff'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#1890ff'}
                        >
                            Return Home
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            onClick={handleGoBack}
                            style={{
                                height: '48px',
                                padding: '0 32px',
                                borderRadius: '8px',
                                fontWeight: 500,
                                transition: 'all 0.3s'
                            }}
                        >
                            Go Back
                        </Button>
                    </Space>
                }
                style={{
                    padding: '40px',
                    borderRadius: '12px',
                    background: '#fff',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
                }}
            />
        </div>
    );
};

export default NotFoundPage;