"use client";

import { createContext, useState } from "react";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/libs/supabase";
import { getBase64 } from "@/components/utils/ControlPublicaciones";
import { message } from "antd";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState(null);
  const [username, setUsername] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [update, setUpdateData] = useState(() => () => {});

  async function getTipoDeServicios() {
    const res = await fetch(`/api/tipoServicio`);
    const data = await res.json();
    let responseData = [];

    for (const element in data){
      responseData.push(element);
    };
    
    return responseData;
  } 

  async function crearPublicacion(datos, tipoPubliacacion) {
    datos.fecha_publicacion = new Date();
    const res = await fetch(`/api/${tipoPubliacacion}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    const data = await res.json();
    setMensaje(data);
    return data;
  }

  async function eliminarPublicacion(id, tipoPublicacion) {
    try {
      const res = await fetch(`/api/${tipoPublicacion}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Error al eliminar la publicación: ${res.statusText}`);
      }

      const data = await res.json();
      setMensaje(data.message);
    } catch (error) {
      console.error("Hubo un error al eliminar la publicación:", error);
      setMensaje("Error al eliminar la publicación. Inténtalo nuevamente.");
    }
  }

  async function modificarPublicaciones(id, datos, tipoPubliacacion) {
    console.log(datos);

    const res = await fetch(`/api/${tipoPubliacacion}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datos,
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

  const sanitizeFileName = (fileName) => {
    return fileName
      .replace(/\s+/g, '')
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9.-]/g, '');
  };
  

  async function subirImagenesSupabase(fileList, tipoDePublicacion, titulo) {
    try {
      console.log(fileList);

      // Convertimos cada archivo en base64
      const imagenes = await Promise.all(
        fileList.map(async (file) => {
          if (file.originFileObj) {
            const base64Data = await getBase64(file.originFileObj);
            return {
              fileName: file.name,
              base64Data: base64Data.split(",")[1], // Solo la parte base64 del DataURL
              contentType: file.type,
            };
          }
          return null;
        })
      );

      // Filtramos los archivos válidos
      const imagenesValidas = imagenes.filter((img) => img !== null);

      const uploadPromises = imagenesValidas.map(async (imagen) => {
        const { fileName, base64Data, contentType } = imagen;
        const filePath = `posts/${new Date().getTime()}_${sanitizeFileName(fileName)}`;

        const { data, error } = await supabase.storage
          .from("posts")
          .upload(filePath, decode(base64Data), {
            contentType: contentType,
          });

        if (error) {
          console.error(`Error uploading ${fileName}:`, error);
          throw error;
        }
        console.log(data);

        return filePath;
      });

      // Esperar a que todas las imágenes se suban
      const filePaths = await Promise.all(uploadPromises);

      // Obtener URLs públicas para todas las imágenes
      const urlPromises = filePaths.map(async (filePath) => {
        const { data, error } = await supabase.storage
          .from("posts")
          .getPublicUrl(filePath);

        if (error) {
          console.error(`Error getting URL for ${filePath}:`, error);
          throw error;
        }
        console.log(data);

        return data.publicUrl;
      });

      const publicUrls = await Promise.all(urlPromises);
      console.log(publicUrls);
      return publicUrls;
    } catch (err) {
      console.error("Error uploading images:", err);
      return null;
    }
  }

  async function eliminarImagenesSupabase(files) {
    if (!Array.isArray(files)) {
      files = [files];
    }
    const filePaths = [];
    files.forEach((file) =>filePaths.push(file.split("/").slice(8).join("/").replace(/%20/g, " ")));

    if (filePaths) {
      const { data, error } = await supabase.storage
        .from("posts")
        .remove(filePaths);

      if (error) {
        console.error(`Error uploading ${filePaths}:`, error);
        throw error;
      }
    }
  }

  async function eliminarUsuario(id) {
    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Error al eliminar el usuario: ${res.statusText}`);
      }

      const data = await res.json();
      setMensaje(data.message);
      return data;
    } catch (error) {
      console.error("Hubo un error al eliminar el usuario:", error);
    }
  }

  async function crearUsuario(datos){
    const res = await fetch(`/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    const data = await res.json();
    setMensaje(data.message);
    return data;
  }

  function mostrarCargarToast() {
    messageApi.open({
      type: "loading",
      content: "Cargando",
      duration: 2,
      className: "scale-110 md:scale-150 mt-5",
    });
  }

  function mostrarExitoToast(texto) {
    messageApi.open({
      type: "success",
      content: texto,
      className: "scale-110 md:scale-150 mt-5",
    });
  }

  function mostrarFalloToast(texto) {
    messageApi.open({
      type: "error",
      content: texto,
      className: "scale-110 md:scale-150 mt-5",
    });
  }


  return (
    <AdminContext.Provider
      value={{
        messageApi,
        contextHolder,
        mostrarCargarToast,
        mostrarExitoToast,
        mostrarFalloToast,
        getTipoDeServicios,
        crearPublicacion,
        modificarPublicaciones,
        eliminarPublicacion,
        subirImagenesSupabase,
        eliminarImagenesSupabase,
        eliminarUsuario,
        crearUsuario,
        mensaje,
        setUsername,
        username,
        setUpdateData,
        update
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
