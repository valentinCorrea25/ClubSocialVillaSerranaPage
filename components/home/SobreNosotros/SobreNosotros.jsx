import React from "react";

const SobreNosotros = () => {
    return (
        <div className="flex flex-col items-center p-4 md:p-6 lg:p-8">
            <h1 className="inset-x-0 top-100 text-center text-4xl font-semibold mb-4">UN POCO DE HISTORIA</h1>
            <div
                className="bg-[--blanco]-100 p-6 rounded-xl shadow-inner relative flex items-center justify-center"
                style={{
                    backgroundImage: "url('https://concepto.de/wp-content/uploads/2019/12/paisaje-rural-caracteristicas-e1576119380947.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="bg-opacity-10 p-4 rounded-xl text-center">
                    <p className="text-[--verde]-700 leading-relaxed">
                        En el año 2019 un grupo de vecinos nos comenzamos a juntar con el fin de crear un Club Social y Deportivo.
                        Luego de varias reuniones y eventos, donde participaron una gran cantidad de vecinos, tomamos la decisión
                        de hacerlo realidad. Fue así, que a mediados de 2020 obtuvimos la personería jurídica con más de 30 socios fundadores.
                    </p>
                    <p className="text-[--blanco] leading-relaxed mt-4">
                        Debido al Covid19, nos hemos visto imposibilitados de realizar actividades.
                        Tenemos desde fines de 2019 presentado en la IDL un expediente, solicitando un predio para llevar adelante
                        el sueño de tener un espacio de encuentro y esparcimiento para la comunidad, residente y no residente...
                    </p>
                    <button className="text-[--verde] ml-1 hover:text-[--verder-super-oscuro] mt-4">Leer más</button>
                </div>
            </div>
        </div>
    );
};

export default SobreNosotros;