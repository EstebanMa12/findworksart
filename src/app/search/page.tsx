/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from "next/navigation";
import AsyncComponent from "@/components/asyncSelect";




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
      <div>
        <AsyncComponent dataArtist={dataArtist}/>
      </div>
    );
  }
