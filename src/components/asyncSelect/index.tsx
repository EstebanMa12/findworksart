"use client";
import React from "react";
import AsyncSelect from "react-select/async";

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
  return (
    <section className="flex flex-col w-full  border gap-y-4 justify-center h-[calc(100vh-4rem)] items-center">
      <Card className="rounded w-2/3 md:w-1/2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
          Search Page
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Search by title"
            className="border p-2"
          />
          <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
          <Button variant="secondary" className=" py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >Search</Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default AsyncComponent;
