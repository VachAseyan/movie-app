import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from '../../features/auth/authSlice';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { setUserId } from '../../features/favorites/favoritesSlice';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const onFinish = async (values: LoginFormValues) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        dispatch(login({ user: userCredential.user }));
        dispatch(setUserId(userCredential.user.uid));
        console.log('works')
        messageApi.success('Login Successful').then(() => {
          navigate('/')
        });

      }
    } catch (error: unknown) {
      messageApi.error('User not found');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#141414',
        padding: '20px'
      }}
    >
      {contextHolder}
      <Card
        style={{
          width: '100%',
          maxWidth: '450px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          border: 'none',
          overflow: 'hidden',
          background: '#1f1f1f'
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <Space
          direction="vertical"
          size="large"
          style={{
            width: '100%',
            textAlign: 'center'
          }}
        >
          <div>
            <Title level={2} style={{ color: '#177ddc', marginBottom: '8px' }}>Welcome Back</Title>
            <Text style={{ color: '#8c8c8c', fontSize: '16px' }}>Sign in to continue</Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
              style={{ marginBottom: '24px' }}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#8c8c8c' }} />}
                placeholder="Email"
                size="large"
                className="dark-input"
                style={{
                  backgroundColor: '#141414',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '10px 15px',
                  height: '48px',
                  border: '1px solid #303030'
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              style={{ marginBottom: '24px' }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#8c8c8c' }} />}
                placeholder="Password"
                size="large"
                className="dark-input"
                style={{
                  backgroundColor: '#141414',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '10px 15px',
                  height: '48px',
                  border: '1px solid #303030'
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: '16px' }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{
                  height: '48px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '500',
                  background: '#177ddc',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(23, 125, 220, 0.3)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1890ff'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#177ddc'}
              >
                Log in
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
                Don't have an account?{' '}
                <NavLink
                  to="/register"
                  style={{
                    color: '#177ddc',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1890ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#177ddc'}
                >
                  Register now!
                </NavLink>
              </Text>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;