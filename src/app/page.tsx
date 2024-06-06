export const dynamic = "force-dynamic";
import Link from "next/link";
export default function Home() {
  return (
    <div className="h-[calc(100vh-7rem)] w-full flex flex-col gap-4 justify-center items-center container">
      <h1 className="text-4xl font-bold text-center">
        Welcome to the Rijksmuseum
      </h1>
      <p className="text-center">
        This is a simple app that uses the Rijksmuseum API to display some art
        works.
      </p>
      <p className="text-center">
        Click on the button below to search the art works.
      </p>
      <div className="flex justify-center items-center">
        <Link href="/search">
          <p className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Search art works
          </p>
        </Link>
      </div>
      <div className="max-w-xl text-start">
        <li className="mt-4">
          On the search page, you can use the inputs to filter artworks by
          artist name and title.
        </li>
        <li className="mt-2">
          Hover over an image to see more details about the artwork.
        </li>
        <li className="mt-2">
          Clicking on the image link will take you to the Rijksmuseum website
          where you can see more details about the artwork.
        </li>
        <li className="mt-2">
          Right-click on an image to add the artwork to your favorites.
        </li>
      </div>
    </div>
  );
}
