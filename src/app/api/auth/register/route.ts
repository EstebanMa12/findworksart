import { NextResponse } from 'next/server';
import db from '@/lib/prisma';


export async function POST(request: Request) {
    const data = await request.json()
    const userFound = await db.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (userFound) {
        return NextResponse.json({
            message: "Email already exist"
        }, {
            status: 400
        })
    }

    const newUser = await db.user.create({
        data
    })
    return NextResponse.json({
        data: newUser,
        message: "The user was created successfully"
    })
}