import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt'
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "************" }
            },
            async authorize(credentials, req): Promise<{ id: string; name: string; email: string } | null> {
                if (!credentials) throw new Error('No credentials provided');
                
                const userFound = await prisma.user.findUnique({
                    where:{
                        email: credentials?.email
                    }
                })
                if (!userFound) throw new Error('No user found')

                const matchPassword = await bcrypt.compare(credentials?.password, userFound.password)

                if (!matchPassword) throw new Error('Wrong password')
                
                return {
                    id: userFound.id.toString(),
                    name: userFound.name,
                    email: userFound.email
                }
            }
        })
    ],
    pages:{
        signIn: '/auth/login'
    }
}
