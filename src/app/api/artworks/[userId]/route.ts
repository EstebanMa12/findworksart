import { NextResponse } from "next/server";
import db from '@/lib/prisma';

interface Params {
    params: {
        userId: string;
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

export async function DELETE(request:Request, { params: { userId } }: Params) {
    try {
        const artDeleted = await db.artwork.delete({
            where:{
                id: parseInt(userId, 10)
            }
        })
        return NextResponse.json({
            data: artDeleted,
            message: "Artworks deleted successfully",
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