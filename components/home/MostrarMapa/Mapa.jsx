import React from "react";

const GoogleMap = () => {
  return (
    <div className="flex flex-col items-center lg:p-8">
      <h1 className="inset-x-0 top-100 text-center text-4xl font-semibold mb-4">DESCUBRE VILLA SERRANA</h1>
      <div className="bg-[--blanco] p-6 rounded-xl shadow-lg mx-auto" style={{ width: '80%', maxWidth: '600px' }}>
        <div style={{ width: '100%', height: '450px' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26361.102821442342!2d-55.01332338701594!3d-34.321508531912485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x950ac56411efb9f3%3A0xb133554bc492315!2s30000%20Villa%20Serrana%2C%20Departamento%20de%20Lavalleja!5e0!3m2!1ses!2suy!4v1723756218611!5m2!1ses!2suy"
          width="100%"
          height="100%"
        ></iframe>
        </div>
        </div>
    </div>
  );
};

export default GoogleMap;