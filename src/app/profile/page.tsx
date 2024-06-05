/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function profilePage() {
    const [session, setSession] = useState<Session | null>(null);
    const [artWorks, setArtWorks] = useState<any[]>([]);

    const getSessionOauth = async () => {
    const sessionOauth = await getSession();
    if (sessionOauth) {
        setSession(sessionOauth);
        const res = await fetch(`api/users/${sessionOauth?.user?.email}`);
        const data = await res.json();
        const userId = data.id;
        const resArtWorks = await fetch(`api/artworks/${userId}`);
        const dataArtWorks = await resArtWorks.json();
        setArtWorks(dataArtWorks.data);
        console.log(dataArtWorks)
    }
    };
  
    useEffect(() => {
      getSessionOauth();
    }, []);


    const user = session?.user || null;
    return (
    <div className="w-full h-[calc(100vh-5rem)] flex items-center">
        <div className="h-full border-2 w-1/4  flex flex-col p-6 items-center">
            <Avatar className="border w-16 h-16 mb-4">
                <AvatarFallback className="bg-slate-600  text-white text-2xl font-semibold">{user?.name?.[0] ?? ''}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold italic">
                Welcome to your profile <p className="text-2xl text-indigo-600 hover:text-indigo-500 hover:text-3xl mb-6">{user?.name ?? ''}</p>
            </h1>
            <p className="text-sm italic mt-2">Email: {user?.email ?? ''}</p>
        </div>
    </div>
);
}
