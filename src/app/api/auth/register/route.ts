import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import db from '@/lib/prisma';


export async function POST(request: Request) {
    try {
        const data = await request.json()
        const userFound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (userFound) {
            return NextResponse.json({
                message: "Email already exist",
            }, {
                status: 400
            })
        }
        data.password = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({
            data
        })
        const { password: _, ...user } = newUser
        return NextResponse.json({
            data: user,
            message: "The user was created successfully",
        }, {
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })

    }
}