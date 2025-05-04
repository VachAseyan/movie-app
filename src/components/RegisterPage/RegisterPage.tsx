import { NavLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const { Title, Text } = Typography;

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

const RegisterPage = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email,data.password);
            message.success("Registration successful! Redirecting to login...");
            reset();
            setTimeout(() => navigate("/"), 1000);
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
            <Card>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <div style={{ textAlign: "center" }}>
                        <Title level={2}>Create Account</Title>
                        <Text type="secondary">Please fill in your details</Text>
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
                                        prefix={<MailOutlined />}
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

                        <Form.Item
                            validateStatus={errors.confirmPassword ? "error" : ""}
                            help={errors.confirmPassword?.message}
                        >
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        prefix={<LockOutlined />}
                                        placeholder="Confirm Password"
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
                                Register
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: "center" }}>
                            <Text type="secondary">
                                Already have an account? <NavLink to="/">Login</NavLink>
                            </Text>
                        </div>
                    </form>
                </Space>
            </Card>
        </div>
    );
};

export default RegisterPage;