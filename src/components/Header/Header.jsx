import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Input, Dropdown, Space } from 'antd';
import { HomeOutlined, HeartOutlined, LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import styles from './Header.module.css';
import { useState } from "react";
import { message } from "antd";

const { Header: AntHeader } = Layout;

const AppHeader = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const handleSearch = (value) => {
        if (!value.trim()) {
            messageApi.error('Please enter a search query');
            return;
        }
        setSearchQuery(value);
        navigate(`/search/${value}/page/1`);
        setSearchQuery('');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const avatarLetter = user?.email?.[0]?.toUpperCase();

    const items = [
        {
            key: '1',
            label: (
                <div className={styles.userInfo}>
                    <Avatar className={styles.avatarDropdown}>
                        {avatarLetter}
                    </Avatar>
                    <span>{user?.email}</span>
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: (
                <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className={styles.dropdownButton}
                >
                    Logout
                </Button>
            ),
        }
    ];

    return (
        <AntHeader className={styles.header}>
            {contextHolder}
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

            <div className={styles.searchContainer}>
                <Input
                    value={searchQuery}
                    placeholder="Search movies..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onPressEnter={() => handleSearch(searchQuery)}
                    className={styles.searchInput}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(searchQuery)}
                    className={styles.searchButton}
                >
                    Search
                </Button>
            </div>

            <div className={styles.actions}>
                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={['hover']}
                    overlayClassName={styles.dropdownMenu}
                >
                    <Space>
                        <Avatar className={styles.avatar}>
                            {avatarLetter}
                        </Avatar>
                    </Space>
                </Dropdown>
            </div>
        </AntHeader>
    );
};

export default AppHeader;