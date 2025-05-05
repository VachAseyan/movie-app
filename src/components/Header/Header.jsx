// src/components/Layout/Header.js
import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme, Avatar } from 'antd';
import { HomeOutlined, HeartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
const { Header: AntHeader } = Layout;

const AppHeader = () => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const avatarLetter = user?.email?.[0]?.toUpperCase();

    return (
        <AntHeader style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backdropFilter: 'blur(10px)'
        }}>
            <div onClick={() => navigate('/page/1')}
                style={{

                    fontSize: '32px',
                    fontWeight: '800',
                    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',

                }}>
                Movie App
            </div>

            <Menu
                mode="horizontal"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    border: 'none',
                    background: 'transparent',
                    margin: '0 24px'
                }}
                items={[
                    {
                        key: 'home',
                        icon: <HomeOutlined style={{ fontSize: '18px' }} />,
                        label: <NavLink
                            to="/"
                            style={({ isActive }) => ({
                                color: isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.85)',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'all 0.3s ease'
                            })}
                        >
                            Home
                        </NavLink>,
                    },
                    {
                        key: 'favorites',
                        icon: <HeartOutlined style={{ fontSize: '18px' }} />,
                        label: <NavLink
                            to="/favorites"
                            style={({ isActive }) => ({
                                color: isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.85)',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'all 0.3s ease'
                            })}
                        >
                            Favorites
                        </NavLink>,
                    },
                ]}
            />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <Avatar
                    style={{
                        backgroundColor: '#FFD700',
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        width: '40px',
                        height: '40px'
                    }}
                >
                    {avatarLetter}
                </Avatar>

                <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                        ':hover': {
                            color: '#FFD700',
                            background: 'rgba(255, 215, 0, 0.1)'
                        }
                    }}
                >
                    Logout
                </Button>
            </div>
        </AntHeader>
    );
};

export default AppHeader;
