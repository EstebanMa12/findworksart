"use client";
import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { useSession, getSession } from "next-auth/react";

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
  const [selectedOption, setSelectedOption] = useState(null);
  const [sessionOauth, setSessionOauth] = useState(null);
  useEffect(() => {
    (async () => {
      const session = await getSession();
      console.log(session);
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

  // const searchArtworks = async () => {
  //   const res = await fetch(
  //     `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.API_KEY}&q=${title}&involvedMaker=${artist}`,
  //     { cache: "force-cache" }
  //   );
  //   const data = await res.json();
  //   return data;
  // };
  const promiseOptions = (inputValue: string) =>
    new Promise<ArtistOption[]>((resolve) => {
      setTimeout(() => {
        resolve(filterArtist(inputValue));
      }, 1000);
    });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const searchTitle = event.target.elements[0].value;
    const searchArtist = selectedOption;

    let url = "https://www.rijksmuseum.nl/api/en/collection?key=KHn4xrLx";

    if (searchTitle) {
      url += `&q=${searchTitle}`;
    }

    if (searchArtist) {
      url += `&involvedMaker=${searchArtist}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
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
