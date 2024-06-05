/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { motion } from "framer-motion";

const ArtWorksComponent: React.FC<{ artists: any[] }> = ({ artists }) => {
  const [session, setSession] = useState<Session | null>(null);

  const getSessionOauth = async () => {
    const sessionOauth = await getSession();
    setSession(sessionOauth);
  };

  useEffect(() => {
    getSessionOauth();
  }, []);

  const handleFavorite = async (artist: any) => {
    try {
      if (session) {
        const res = await fetch(`api/users/${session?.user?.email}`);
        const data = await res.json();
        const userId = data.id;

        const favoriteResponse = await fetch("api/artworks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: artist.title,
            artist: artist.principalOrFirstMaker,
            userId: userId,
            rijksUrl: artist.links.web,
            imageUrl: artist.headerImage.url,
          }),
        });
        console.log(favoriteResponse)
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2 overflow-y-auto"
    >
      {artists.map((artist: any) => (
        <motion.figure
          key={artist.id}
          className="relative group overflow-hidden"
          style={{
            width: `${artist.headerImage.width}px`,
            height: `${artist.headerImage.height}px`,
          }}
        >
          <img
            src={artist.headerImage.url}
            alt={artist.title}
            className="w-full h-full  group-hover:opacity-75 transition-opacity duration-300"
          />
          <ContextMenu>
            <ContextMenuTrigger>
              <figcaption className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-bold">{artist.title}</h3>
                <p className="text-sm">{artist.longTitle}</p>
                <p className="text-xs mt-2">{artist.principalOrFirstMaker}</p>
                Link:{" "}
                <a
                  href={artist.links.web}
                  className="text-xs hover:text-md cursor-pointer "
                  target="_blank"
                >
                  {artist.links.web}
                </a>
              </figcaption>
            </ContextMenuTrigger>
            <ContextMenuContent className="flex h-[80px] w-[100px] items-center justify-center rounded bg-opacity-50 border-none bg-black text-sm text-white">
              <ContextMenuItem
                className="
                        text-white
                          hover:bg-white
                          hover:text-black
                          rounded
                          p-2
                          m-1
                          cursor-pointer
                          "
                onClick={handleFavorite(artist)}
              >
                Marcar como favorita
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </motion.figure>
      ))}
    </motion.div>
  );
};

export default ArtWorksComponent;
