import NextAuth, { RequestInternal } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            authorize: async (credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) => {
                return null
            }
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}