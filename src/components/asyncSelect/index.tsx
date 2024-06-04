"use client"
import React from 'react';
import AsyncSelect from 'react-select/async';

interface Artist {
  id: string;
  name: string;
}
interface AsyncComponentProps {
  dataArtist: Artist[];
}

interface ArtistOption{
  label:string;
  value:string;
}

const AsyncComponent:React.FC<AsyncComponentProps> = ({dataArtist})=> {

  const options = dataArtist.map(artist => ({
    label: artist.name,
    value: artist.id,
  }));

    const filterArtist = (inputValue: string) => {
        return options.filter((i) =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      };
      const promiseOptions = (inputValue: string) =>
        new Promise<ArtistOption[]>((resolve)=>{
          setTimeout(()=>{
            resolve(filterArtist(inputValue));
          }, 1000);
        })
  return (
   <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} /> 
  )
}

export default AsyncComponent