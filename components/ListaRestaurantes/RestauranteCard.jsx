"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Card, Tag, Button } from "antd";
import {
    EnvironmentOutlined,
    UsergroupDeleteOutlined,
    HistoryOutlined
} from "@ant-design/icons";


const { Meta } = Card;


const RestauranteCard = ({ restaurante }) => {
    const {
        titulo,
        descripcion,
        fotos,
        ubicacion_calles,
        capacidad,
        diasSemana,
        horario_semanal,
        horario_finde
    } = restaurante;

    const router = useRouter();
    const handleViewDetails = (id) => {
        router.push(`/ListaRestaurantes/DetalleRestaurante?id=${id}`);
    };

    return (
        <Card onClick={() => handleViewDetails(restaurante.id_Restaurant)}
            hoverable
            cover={
                <div
                    className="m-auto"
                    style={{
                        overflow: "hidden",
                        borderRadius: "12px",
                        position: "relative",
                    }}
                >
                    <img
                        alt={titulo}
                        src={fotos[0] ? fotos[0] : 'https://res.cloudinary.com/dvzf7szuo/image/upload/v1730236113/not-found_td14yf.png'}
                        style={{
                            width: "100%",
                            height: "100%",
                            maxHeight: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />
                </div>
            }
            style={{
                width: "100%",
                maxWidth: "500px",
                margin: "0 auto",
                marginBottom: "24px",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "12px",
            }}
        >
            <Meta
                title={
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>{titulo}</div>
                }
                description={
                    <>
                        <div style={{ display: "flex", alignItems: "center", color: "#0367A6" }}>
                            <EnvironmentOutlined style={{ marginRight: "8px" }} />
                            <span>Ubicación: {ubicacion_calles}</span>
                        </div>
                        {horario_semanal && (
                            <div style={{ display: "flex", alignItems: "center", color: "#0367A6" }}>
                                <HistoryOutlined style={{ marginRight: "8px" }} />
                                <span>Horario semana: {horario_semanal}</span>
                            </div>
                        )}
                        {horario_finde && (
                            <div style={{ display: "flex", alignItems: "center", color: "#0367A6" }}>
                                <HistoryOutlined style={{ marginRight: "8px" }} />
                                <span>Horario fin de semana: {horario_finde}</span>
                            </div>
                        )}



                        <div style={{ marginTop: "8px" }}>
                            {diasSemana.map((dia, index) => (
                                <Tag key={index} style={{ marginRight: "4px" }}>
                                    {dia}
                                </Tag>
                            ))}
                        </div>
                        <p
                            style={{
                                marginTop: "16px",
                                height: "auto",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            <span dangerouslySetInnerHTML={{ __html: descripcion.substring(0, 150) }} />
                            {descripcion.length > 150 && "...."}

                        </p>
                        <Button
                            type="primary"
                            onClick={() => handleViewDetails(alojamiento.id_Actividad)}
                            className="mt-7  "
                        >
                            Ver Detalles
                        </Button>
                    </>
                }
            />
        </Card>
    );
};

export default RestauranteCard;
