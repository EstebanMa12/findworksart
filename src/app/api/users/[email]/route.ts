import  prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
    params: {
        email: string;
    }
}
export async function GET(request: Request, { params: { email } }: Params) {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json(error.message)

    }
}