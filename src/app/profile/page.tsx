/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect, Suspense } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { MoreHorizontal, Trash } from "lucide-react";
import Swal from "sweetalert2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function profilePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [artWorks, setArtWorks] = useState<any[] | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();

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
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    getSessionOauth();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`api/artworks/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.message === "Artworks deleted successfully") {
            setArtWorks(artWorks?.filter(artwork => artwork.id !== id)|| null);
            Swal.fire({
              position: "top-end",
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  const user = session?.user || null;

  const handleMenuToggle = (id: string) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };
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
      {artWorks !== null && artWorks.length > 0 && (
        <Suspense fallback={<p>Loading your favorites</p>}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 grid-flow-row lg:grid-cols-2 w-full h-full overflow-y-auto p-6 gap-6"
          >
            {artWorks.map((artist: any) => (
              <motion.figure
                key={artist.id}
                className="relative group overflow-hidden flex items-center bg-slate-200 min-h-48  rounded shadow-md"
              >
                <img
                  src={artist.imageUrl}
                  alt={artist.title}
                  className="object-cover group-hover:opacity-75 transition-opacity duration-300"
                />
                <figcaption className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center overflow-y-auto items-center text-white p-4">
                  <div className="flex justify-end w-full">
                    <DropdownMenu
                      open={openMenuId === artist.id}
                      onOpenChange={() => handleMenuToggle(artist.id)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-[200px] rounded bg-black bg-opacity-80 border-none text-white"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 font-bold"
                          onClick={() => {
                            handleDelete(artist.id);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
        </Suspense>
      )}
      {artWorks?.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold italic">
            You have not added any favorites yet
          </h1>
        </div>
      )}
      {artWorks === null && (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-2xl font-bold italic ">
            Loading your favorites ...
          </h1>
        </div>
      )}
    </div>
  );
}
