import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(request) {
    const data = await request.json();

    try {
        console.log(data);
        return NextResponse.json({
            message: data,
            statusCode: 200,
        });
    }catch(e){
        return NextResponse.json({
            message: 'no salio',
            statusCode: 500,
        });
    }
}