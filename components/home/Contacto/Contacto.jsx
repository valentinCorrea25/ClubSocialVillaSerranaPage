// "use client"

// import { useState } from "react";
// import { Button, Input } from "antd";
// import { FacebookOutlined, InstagramOutlined, PhoneOutlined } from "@ant-design/icons";

// export default function ContactoInfo() {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResponseMessage("");

//     try {
//       const res = await fetch("/api/contactoMail", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setResponseMessage(data.message || "Mensaje enviado correctamente.");
//         setFormData({ name: "", email: "", message: "" }); // Limpia el formulario
//       } else {
//         setResponseMessage(data.message || "Error al enviar el mensaje.");
//       }
//     } catch (error) {
//       setResponseMessage("Hubo un error al enviar el mensaje.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[--blanco]">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
//           Contacto - Club Social y Deportivo Villa Serrana
//         </h1>

//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-semibold mb-4 text-green-700">
//               Información de Contacto
//             </h2>
//             <div className="space-y-4 text-xl">
//               <a
//                 href="https://www.instagram.com/club_villa_serrana/"
//                 className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
//               >
//                 <InstagramOutlined className="h-5 w-5" />
//                 <span>@club_villa_serrana</span>
//               </a>
//               <a
//                 href="tel:+59812345678"
//                 className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
//               >
//                 <PhoneOutlined className="h-5 w-5" />
//                 <span>+598 1234 5678</span>
//               </a>
//               <a
//                 href="https://www.facebook.com/ClubVillaSerrana/"
//                 className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
//               >
//                 <FacebookOutlined className="h-5 w-5" />
//                 <span>Villa Serrana Oficial</span>
//               </a>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-semibold mb-4 text-green-700">
//               Envíanos un mensaje
//             </h2>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <Input
//                 type="text"
//                 placeholder="Nombre"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <Input
//                 type="email"
//                 placeholder="Correo electrónico"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <textarea
//                 placeholder="Tu mensaje"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="max-h-16 w-full bg-[#f6ffed] border p-2"
//                 required
//               />
//               <Button
//                 className="w-full bg-green-600 hover:bg-green-700 text-white"
//                 htmlType="submit"
//                 loading={loading}
//               >
//                 Enviar mensaje
//               </Button>
//             </form>
//             {responseMessage && (
//               <p className="text-center mt-4 text-lg">
//                 {responseMessage}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="mt-8">
//           <img
//             src='https://www.dronestagr.am/wp-content/uploads/2017/08/DJI_0029-4-scaled.jpg'
//             alt="Villa Serrana"
//             className="w-full h-64 object-cover rounded-lg shadow-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'

import React from 'react';
import { InstagramOutlined, FacebookOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons';

export default function ContactoInfo() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+598 91776021';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+|\s/g, '')}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[--blanco] flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-12">
          Contacto - Club Social y Deportivo Villa Serrana
        </h1>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Sección de Contacto Social */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
              Nuestras Redes Sociales
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://www.instagram.com/club_villa_serrana/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors"
              >
                <InstagramOutlined className="text-2xl text-pink-600" />
                <span className="font-medium text-gray-700">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/ClubVillaSerrana/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors"
              >
                <FacebookOutlined className="text-2xl text-blue-600" />
                <span className="font-medium text-gray-700">Facebook</span>
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center space-x-3 text-xl"
            >
              <WhatsAppOutlined className="text-3xl" />
              <span>Haz Click Contactar por WhatsApp</span>
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <a href="mailto:csydvillaserrana@gmail.com"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center space-x-3 text-xl"
            >
              <MailOutlined className="text-3xl" />
              <span>Haz Click Contactar por Email</span>
            </a>
          </div>

          <div className="mt-8">
            <img
              src='https://www.dronestagr.am/wp-content/uploads/2017/08/DJI_0029-4-scaled.jpg'
              alt="Villa Serrana"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}