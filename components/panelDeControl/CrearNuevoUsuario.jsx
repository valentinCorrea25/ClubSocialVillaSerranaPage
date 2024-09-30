import React from 'react';
import { Form, Input, Button } from 'antd';

const CrearNuevoUsuario = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Form
      name="crear_usuario"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: '0 auto' }} // Estilo para centrar el formulario
    >
      <h1 className='text-center text-xl md:text-2xl pb-4'>Crear Nuevo Usuario</h1>
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="contrasenia"
        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Repetir Contraseña"
        name="repetirContrasenia"
        rules={[
          { required: true, message: 'Por favor repite tu contraseña' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('contrasenia') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Las contraseñas no coinciden'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CrearNuevoUsuario;
