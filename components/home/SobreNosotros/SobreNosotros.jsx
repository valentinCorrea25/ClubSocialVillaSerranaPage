import React from "react";
import { Button } from "antd";
import fotoFondo from "@/public/images/villaSerranaSobreNosotrosHome.jpg"

const SobreNosotros = () => {
    return (
        <div className="flex flex-col items-center mb-4 w-full m-auto relative">
            <h1 className="inset-x-0 text-center text-4xl font-semibold mb-4">UN POCO DE HISTORIA</h1>
            <div
                className="p-6 w-full bg-opacity-10 shadow-inner relative flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1596930211624-0e83b02e3f0a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-15"></div>

                {/* Content */}
                <div className="max-w-screen-xl text-[--blanco] p-4 text-center flex flex-col gap-10 justify-center text-xl leading-relaxed relative z-10">
                    <p>
                        En el año 2019 un grupo de vecinos nos comenzamos a juntar con el fin de crear un Club Social y Deportivo.
                        Luego de varias reuniones y eventos, donde participaron una gran cantidad de vecinos, tomamos la decisión
                        de hacerlo realidad. Fue así, que a mediados de 2020 obtuvimos la personería jurídica con más de 30 socios fundadores.
                    </p>
                    <p>
                        Debido al Covid19, nos hemos visto imposibilitados de realizar actividades.
                        Tenemos desde fines de 2019 presentado en la IDL un expediente, solicitando un predio para llevar adelante
                        el sueño de tener un espacio de encuentro y esparcimiento para la comunidad, residente y no residente...
                    </p>
                    <div>
                        <Button className="max-w-32">Leer más</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SobreNosotros;
