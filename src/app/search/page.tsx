"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function searchPage() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const { data: artists } = useSWR(
    "https://www.rijksmuseum.nl/en/search/advanced/terms?field=involvedMaker&q=",
    fetcher
  );
  const [results, setResults] = useState([]);
  return (
    <div className="container h-[calc(100vh - 4rem)]  flex border justify-center items-center">
      <h1>Search Page</h1>
    </div>
  );
}
