/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from "next/navigation";
import AsyncComponent from "@/components/asyncSelect";


const searchArtworks = async () => {
  const res = await fetch(
    `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.API_KEY}&q=${title}&involvedMaker=${artist}`,
    { cache: "force-cache" }
  );
  const data = await res.json();
  return data;
};

  const getArtists = async () => {
    const res = await fetch(
      `https://www.rijksmuseum.nl/en/search/advanced/terms?field=involvedMaker&q=`
    );
    const data = await res.json();
    return data;
  };


  export default async function searchPage() {
    const dataArtist = await getArtists();

    return (
      <div className="container h-screen flex flex-row border justify-center items-center gap-x-4">
        <h1>Search Page</h1>
        <input 
        type="text" 
        placeholder="Search by title" 
        className="border p-2"
      />
        <AsyncComponent dataArtist={dataArtist}/>
      </div>
    );
  }
