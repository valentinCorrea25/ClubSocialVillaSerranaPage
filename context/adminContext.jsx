"use client";

import { createContext, useState } from "react";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/libs/supabase";
import { getBase64 } from "@/components/utils/ControlPublicaciones";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState(null);

  async function crearPublicacion(datos, tipoPubliacacion) {
    datos.fecha_publicacion = new Date();
    const res = await fetch(`/api/${tipoPubliacacion}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        datos
      ),
    });
    const data = await res.json();
    setMensaje(data.message);
    return data.message;
  }

  async function eliminarPublicacion(id,tipoPublicacion) {
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
  

  async function modificarPublicaciones(id,datos,tipoPubliacacion) {
    const res = await fetch(`/api/${tipoPubliacacion}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datos
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

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
              base64Data: base64Data.split(',')[1], // Solo la parte base64 del DataURL
              contentType: file.type,
            };
          }
          return null;
        })
      );
      
  
      // Filtramos los archivos válidos
      const imagenesValidas = imagenes.filter(img => img !== null);
  
      const uploadPromises = imagenesValidas.map(async (imagen) => {
        const { fileName, base64Data, contentType } = imagen;
        const filePath = `posts/${tipoDePublicacion}_${titulo}_${fileName}`;
        
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

  async function eliminarImagenesSupabase(file) {
    // const urlObj = new URL(file)
    const filePath = file.split('/').slice(8).join('/').replace(/%20/g, ' ');

    const { data, error } = await supabase
        .storage
        .from('posts')
        .remove(filePath);


        console.log('file -->' + file);
        console.log(filePath);
        

        console.log(data);
        console.log(error);
        
        
          
        if (error) {
          console.error(`Error uploading ${fileName}:`, error);
          throw error;
        }
  }

  return (
    <AdminContext.Provider
      value={{
        crearPublicacion,
        modificarPublicaciones,
        eliminarPublicacion,
        subirImagenesSupabase,
        eliminarImagenesSupabase,
        mensaje
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
