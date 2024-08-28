'use client'
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import image from '@/public/images/loginScreen.jpg';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';

const Admin = () => {
  const router = useRouter();
  const  onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const resp = await signIn('username-login', {
      userName: values.username,
      password: values.password,
      redirect: false
    })
    if(resp.error){
      alert(resp.error);
    }
    else{
      router.push('/admin/paneldecontrol')
    }
  };



  return (
    <>
      <div className='flex gap-5 justify-between items-center'>
        
        <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
        className='m-auto'
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
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
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        {/* <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item> */}

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
        </Form>

        <div className="w-3/4 h-[100vh] overflow-hidden">
          <img 
            src="https://www.dronestagr.am/wp-content/uploads/2017/08/DJI_0029-4-scaled.jpg"
            className="w-full h-full object-cover"
          />
          </div>
      </div>
    </>
  );
};
export default Admin;