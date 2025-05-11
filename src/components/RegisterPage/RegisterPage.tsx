import { NavLink, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import background from "../../assets/movie-background-collage.jpg"

const { Title, Text } = Typography;

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthState {
    isLoggedIn: boolean;
}

interface RootState {
    auth: AuthState;
}

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
});

const RegisterPage: React.FC = () => {
    const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<RegisterFormData> = async ({ email, password }) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            messageApi.success("Successfully registered!");
            reset();
            setTimeout(() => navigate("/login"), 1000);
        } catch (error: unknown) {
            messageApi.error("User already exists!");
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.8) contrast(1) saturate(1)',
            }}
        >
            {contextHolder}
            <Card
                style={{ width: "100%", maxWidth: "450px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)", border: "none", overflow: "hidden", background: "#1f1f1f" }}
                bodyStyle={{ padding: "40px" }}
            >
                <Space direction="vertical" size="large" style={{ width: "100%", textAlign: "center" }}>
                    <div>
                        <Title level={2} style={{ color: "#177ddc", marginBottom: "8px" }}>Create Account</Title>
                        <Text style={{ color: "#8c8c8c", fontSize: "16px" }}>Join our community</Text>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <Form.Item validateStatus={errors.email ? "error" : ""} help={errors.email?.message} style={{ marginBottom: "24px" }}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        prefix={<MailOutlined style={{ color: "#8c8c8c" }} />}
                                        placeholder="Email"
                                        size="large"
                                        style={{
                                            backgroundColor: "#141414",
                                            color: "#ffffff",
                                            borderRadius: "15px",
                                            padding: "10px 15px",
                                            height: "48px",
                                            border: "1px solid #303030"
                                        }}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item validateStatus={errors.password ? "error" : ""} help={errors.password?.message} style={{ marginBottom: "24px" }}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        prefix={<LockOutlined style={{ color: "#8c8c8c" }} />}
                                        placeholder="Password"
                                        size="large"
                                        style={{
                                            backgroundColor: "#141414",
                                            color: "#ffffff",
                                            borderRadius: "15px",
                                            padding: "10px 15px",
                                            height: "48px",
                                            border: "1px solid #303030"
                                        }}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item validateStatus={errors.confirmPassword ? "error" : ""} help={errors.confirmPassword?.message} style={{ marginBottom: "24px" }}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        prefix={<LockOutlined style={{ color: "#8c8c8c" }} />}
                                        placeholder="Confirm Password"
                                        size="large"
                                        style={{
                                            backgroundColor: "#141414",
                                            color: "#ffffff",
                                            borderRadius: "15px",
                                            padding: "10px 15px",
                                            height: "48px",
                                            border: "1px solid #303030"
                                        }}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: "16px" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmitting}
                                block
                                size="large"
                                style={{
                                    height: "48px",
                                    borderRadius: "6px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    background: "#177ddc",
                                    border: "none",
                                    boxShadow: "0 4px 12px rgba(23, 125, 220, 0.3)",
                                    transition: "all 0.3s",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#1890ff"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "#177ddc"}
                            >
                                Register
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: "center", marginTop: "24px" }}>
                            <Text style={{ color: "#8c8c8c", fontSize: "14px" }}>
                                Already have an account?{" "}
                                <NavLink
                                    to="/"
                                    style={{ color: "#177ddc", fontWeight: "500", textDecoration: "none", transition: "color 0.3s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "#1890ff"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "#177ddc"}
                                >
                                    Login
                                </NavLink>
                            </Text>
                        </div>
                    </form>
                </Space>
            </Card>
        </div>
    );
};

export default RegisterPage;
