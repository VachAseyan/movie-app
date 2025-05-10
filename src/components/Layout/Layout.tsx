import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import AppHeader from "../Header/Header";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
      }}
    >
      <AppHeader />
      <Content
        style={{
          padding: 24,
          borderRadius: token.borderRadiusLG,
          minHeight: 280,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
