/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function profilePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [artWorks, setArtWorks] = useState<any[]>([]);

  const getSessionOauth = async () => {
    try {
      const sessionOauth = await getSession();
      if (sessionOauth) {
        setSession(sessionOauth);
        const res = await fetch(`api/users/${sessionOauth?.user?.email}`);
        const data = await res.json();
        const userId = data.id;
        const resArtWorks = await fetch(`api/artworks/${userId}`);
        const dataArtWorks = await resArtWorks.json();
        setArtWorks(dataArtWorks.data);
      }
    } catch (error: any) {
      alert(error.message);
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
          <AvatarFallback className="bg-slate-600  text-white text-2xl font-semibold">
            {user?.name?.[0] ?? ""}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold italic">
          Welcome to your profile{" "}
          <p className="text-2xl text-indigo-600 hover:text-indigo-500 hover:text-3xl mb-6">
            {user?.name ?? ""}
          </p>
        </h1>
        <p className="text-sm italic mt-2">Email: {user?.email ?? ""}</p>
      </div>
      {artWorks && artWorks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 grid-rows-3 lg:grid-cols-2 w-full h-full overflow-y-auto p-6 gap-6"
        >
          {artWorks.map((artist: any) => (
            <motion.figure
              key={artist.id}
              className="relative group overflow-hidden flex items-center bg-slate-200  rounded shadow-md"
            >
              <img
                src={artist.imageUrl}
                alt={artist.title}
                className="object-cover group-hover:opacity-75 transition-opacity duration-300"
              />
              <figcaption className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-bold">{artist.title}</h3>
                <p className="text-sm">{artist.title}</p>
                <p className="text-xs mt-2">{artist.artist}</p>
                Link:{" "}
                <a
                  href={artist.rijksUrl}
                  className="text-xs hover:text-md cursor-pointer "
                  target="_blank"
                >
                  {artist.rijksUrl}
                </a>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      )}
    </div>
  );
}
