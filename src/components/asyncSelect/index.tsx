/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { motion, AnimatePresence } from "framer-motion";
import {Image} from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface Artist {
  id: string;
  name: string;
}
interface AsyncComponentProps {
  dataArtist: Artist[];
}

interface ArtistOption {
  label: string;
  value: string;
}

const AsyncComponent: React.FC<AsyncComponentProps> = ({ dataArtist }) => {
  const [selectedOption, setSelectedOption] = useState<any | null>(null);

  const [artists, setArtists] = useState([]);

  const options = dataArtist.map((artist) => ({
    label: artist.name,
    value: artist.id,
  }));

  const filterArtist = (inputValue: string) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<ArtistOption[]>((resolve) => {
      setTimeout(() => {
        resolve(filterArtist(inputValue));
      }, 1000);
    });

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const searchTitle = await event.target.elements[0].value;
      const searchArtist = selectedOption?.value || null;

      let url =
        "https://www.rijksmuseum.nl/api/nl/collection?key=KHn4xrLx&format=json";

      if (searchTitle) {
        url += `&q=${searchTitle}`;
      }

      if (searchArtist) {
        url += `&artist=${searchArtist}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setArtists(data.artObjects);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <section className="flex flex-col w-full py-2  gap-y-4 justify-center h-[calc(100vh-5rem)] items-center">
      <Card className="rounded w-2/3 sm:w-1/2 shadow-lg">
        <AnimatePresence>
          {artists.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CardHeader>
                <CardTitle className="text-center">Search Page</CardTitle>
              </CardHeader>
            </motion.div>
          )}
        </AnimatePresence>
        <CardContent>
          <form
            className="flex flex-row justify-between items-center mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search by title"
              className="border p-2"
            />
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
              onChange={(selectedOption) => {
                setSelectedOption(selectedOption);
              }}
            />
            <Button
              variant="secondary"
              className=" py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
            >
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
      <AnimatePresence>
        {artists.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 w-full overflow-y-auto"
          >
            {artists.map((artist: any) => (
              <motion.figure
                key={artist.id}
                className="relative group overflow-hidden"
                style={{ width: `${artist.headerImage.width}px`, height: `${artist.headerImage.height}px` }}
              >
                <img
                  src={artist.headerImage.url}
                  alt={artist.title}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
                />
                <figcaption className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                  <h3 className="text-lg font-bold">{artist.title}</h3>
                  <p className="text-sm">{artist.longTitle}</p>
                  <p className="text-xs mt-2">{artist.principalOrFirstMaker}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AsyncComponent;
