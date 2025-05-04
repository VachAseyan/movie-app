import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme } from 'antd';
import { HomeOutlined, HeartOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const MainLayout = () => {
    const navigate = useNavigate();
    const { token } = theme.useToken();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Layout style={{ minHeight: '100vh', background: token.colorBgContainer }}>
            <Header style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0 24px',
                background: token.colorBgElevated,
                borderBottom: `1px solid ${token.colorBorderSecondary}`
            }}>
                <div style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    color: token.colorText
                }}>
                    Movie App
                </div>
                <Menu
                    mode="horizontal"
                    style={{ 
                        flex: 1, 
                        justifyContent: 'center', 
                        border: 'none',
                        background: 'transparent'
                    }}
                    items={[
                        {
                            key: 'home',
                            icon: <HomeOutlined />,
                            label: <NavLink to="/home">Home</NavLink>,
                        },
                        {
                            key: 'favorites',
                            icon: <HeartOutlined />,
                            label: <NavLink to="/favorites">Favorites</NavLink>,
                        },
                    ]}
                />
                <Button 
                    type="text" 
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    style={{ color: token.colorText }}
                >
                    Logout
                </Button>
            </Header>
            <Content style={{ 
                margin: '24px 16px', 
                padding: 24, 
                background: token.colorBgElevated,
                borderRadius: token.borderRadiusLG,
                minHeight: 280 
            }}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default MainLayout;