import { NavLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/auth/authSlice";

const { Title, Text } = Typography;

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const LoginPage = () => {

    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();


    const onSubmit = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            dispatch(login());
            message.success("Login successful! Redirecting to home...");
            setTimeout(() => navigate("/home"), 1000);
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
            <Card>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <div style={{ textAlign: "center" }}>
                        <Title level={2}>Welcome Back</Title>
                        <Text type="secondary">Please login to your account</Text>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Item
                            validateStatus={errors.email ? "error" : ""}
                            help={errors.email?.message}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        prefix={<UserOutlined />}
                                        placeholder="Email"
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            validateStatus={errors.password ? "error" : ""}
                            help={errors.password?.message}
                        >
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        prefix={<LockOutlined />}
                                        placeholder="Password"
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmitting}
                                block
                            >
                                Log in
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: "center" }}>
                            <Text type="secondary">
                                Don't have an account?{" "}
                                <NavLink to="/register">Register</NavLink>
                            </Text>
                        </div>
                    </form>
                </Space>
            </Card>
        </div>
    );
};

export default LoginPage;