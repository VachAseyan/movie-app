import { Outlet } from "react-router-dom";
import { Layout, theme } from 'antd';  
import AppHeader from "../Header/Header";

const { Content } = Layout;

const MainLayout = () => {
    const { token } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh', background: token.colorBgContainer }}> 
            <AppHeader />
            <Content style={{
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
