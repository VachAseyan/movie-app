// src/components/Layout/Header.js
import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Input } from 'antd';
import { HomeOutlined, HeartOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import styles from './Header.module.css';

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
        <AntHeader className={styles.header}>
            <div onClick={() => navigate('/page/1')} className={styles.logo}>
                Movie App
            </div>

            <Menu
                mode="horizontal"
                className={styles.menu}
                items={[
                    {
                        key: 'home',
                        icon: <HomeOutlined style={{ fontSize: '18px' }} />,
                        label: (
                            <NavLink
                                to="/"
                                style={({ isActive }) => ({
                                    color: isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.85)',
                                    fontWeight: isActive ? '600' : '400',
                                    transition: 'all 0.3s ease'
                                })}
                            >
                                Home
                            </NavLink>
                        ),
                    },
                    {
                        key: 'favorites',
                        icon: <HeartOutlined style={{ fontSize: '18px' }} />,
                        label: (
                            <NavLink
                                to="/favorites"
                                style={({ isActive }) => ({
                                    color: isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.85)',
                                    fontWeight: isActive ? '600' : '400',
                                    transition: 'all 0.3s ease'
                                })}
                            >
                                Favorites
                            </NavLink>
                        ),
                    },
                ]}
            />

            <Input placeholder="Search" style={{ width: '200px', marginRight: '40px' }} />

            <div className={styles.actions}>
                <Avatar className={styles.avatar}>
                    {avatarLetter}
                </Avatar>

                <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className={styles.logoutButton}
                >
                    Logout
                </Button>
            </div>
        </AntHeader>
    );
};

export default AppHeader;
