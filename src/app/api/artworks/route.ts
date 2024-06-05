import { NextResponse } from 'next/server';
import db from '@/lib/prisma';

export async function POST(request:Request) {
    try {
        const data = await request.json();
        const artFound = await db.artwork.findFirst({
            where:{
                title: data.title,
                artist: data.artist,
                userId: data.userId,
                rijksUrl: data.rijksUrl,
                imageUrl: data.imageUrl
            }
        })

        if (artFound) {
            return NextResponse.json({
                message: "Artwork already exist in your collection",
            }, {
                status: 400
            })
        }

        const newArtwork = await db.artwork.create({
            data
        })

        return NextResponse.json({
            data: newArtwork,
            message: "The artwork was saved successfully",
        }, {
            status: 201
        })

    } catch (error:any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
        
    }
    
}

