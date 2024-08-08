
"use client";

import { createContext, useState } from "react";

export const PublicacionContext = createContext();

export const PublicacionesProvider = ({ children }) => {
  const [alquier, setAlquiler] = useState();

  async function crearAlquiler(datos){
    const res = await fetch(`/api/publicaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: String(value),
        limit: true,
      }),
    });
    const data = await res.json();
    setResultFromSearch(data.products);
  }

  <PublicacionContext.Provider
      value={{
        
      }}
    >
      {children}
    </PublicacionContext.Provider>
    }
