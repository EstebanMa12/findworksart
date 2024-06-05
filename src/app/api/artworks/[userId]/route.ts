import { NextResponse } from "next/server";
import db from '@/lib/prisma';

interface Params {
    params: {
        userId: number;
    }
}
export async function GET(request:Request, { params: { userId } }: Params) {
    try {
        const artFound = await db.artwork.findMany({
            where:{
                userId: parseInt(userId, 10)
            }
        })

        return NextResponse.json({
            data: artFound,
            message: "Artworks retrieved successfully",
        }, {
            status: 200
        })

    } catch (error:any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
        
    }
    
}