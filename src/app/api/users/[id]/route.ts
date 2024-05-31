import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
    params: {
        id: string;
    }
}
export async function GET({ params: { id } }: Params) {
    try {
        console.log(typeof id);
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        });
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json(error.message)

    }
}