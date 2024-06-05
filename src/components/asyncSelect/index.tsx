"use client";
import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

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
  const [sessionOauth, setSessionOauth] = useState<Session | null>(null);

  const [artists, setArtists] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const session: Session | null = await getSession();
        setSessionOauth(session);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

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
    <section className="flex flex-col w-full  border gap-y-4 justify-center h-[calc(100vh-4rem)] items-center">
      <Card className="rounded w-2/3 sm:w-1/2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Search Page</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-row justify-between items-center"
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
    </section>
  );
};

export default AsyncComponent;
