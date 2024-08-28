import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    console.log(data);

    try {
        const restaurant = await prisma.restaurant.create({data});
        return NextResponse.json({
            message: `Restaurant creada con exito\nid: ${restaurant.id_Restaurant}`
        })
    } 
    catch (error) {
        return NextResponse.json({
            message: 'Hubo un error al crear el Restaurant, contactar con desarollador',
            code: 500
        })
    }
}