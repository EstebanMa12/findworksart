/* eslint-disable @next/next/no-img-element */
import React from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { motion } from "framer-motion";


const ArtWorksComponent: React.FC= ({ artists }) =>{
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
            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
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
            <ContextMenuContent className="flex h-[100px] w-[200px] items-center justify-center rounded bg-opacity-50 border-none bg-black text-sm text-white">
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
              >
                Marcar como favorita
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </motion.figure>
      ))}
    </motion.div>
  );
}

export default ArtWorksComponent;
