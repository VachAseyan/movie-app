import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from 'antd';
import "./App.css";
import "antd/dist/reset.css";
import { router } from "./Router";

const { darkAlgorithm } = theme;

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
        token: {
          colorBgContainer: '#141414',
          colorBgElevated: '#1f1f1f',
          colorText: '#ffffff',
          colorTextSecondary: '#8c8c8c',
          colorBorderSecondary: '#303030',
          colorPrimary: '#177ddc',
          colorWarning: '#faad14',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};