"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const resp = await signIn("username-login", {
      userName: values.username,
      password: values.password,
      redirect: false,
    });
    if (resp.error) {
      alert(resp.error);
    } else {
      router.push("/admin/paneldecontrol");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={onFinish}
          className="mx-auto px-10 mt-10"
        >
          <div className="md:flex w-2/3 overflow-hidden m-auto py-10">
          <img
            src="https://mvulbmjlvpjujjfvffph.supabase.co/storage/v1/object/public/posts/public/logo-csdvs-1.png"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-center text-3xl font-semibold mb-2">Inicio de Sesión</h1>
        <h2 className="text-center text-2xl mb-6">Panel de Control</h2>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Ingresa el usuario para continuar",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Ingresa la clave para continuar",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Entrar
            </Button>
          </Form.Item>
        </Form>

        <div className="hidden md:flex w-3/4 h-[100vh] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dvzf7szuo/image/upload/v1734121540/IMG_0849_iyheqs.webp"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};
export default Admin;
