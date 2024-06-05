import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
async function NavigationMenuComponent() {
  const sessionOauth = await getServerSession();

  return (
    <nav className="flex justify-between items-center bg-indigo-400 text-white px-8 py-4 shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-wider hover:text-blue-300 transition-colors duration-300">
          FindWorksArt
        </h1>
      </Link>

      <ul className="flex gap-x-6 items-center">
        {!sessionOauth?.user ? (
          <>
            <li>
              <Link href="/auth/login">
                <p className="hover:text-blue-300 transition-colors duration-300">
                  Login
                </p>
              </Link>
            </li>
            <li>
              <Link href="/auth/register">
                <p className="hover:text-blue-300 transition-colors duration-300">
                  Register
                </p>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/search">
                <p className="hover:text-blue-300 transition-colors duration-300">
                  Search
                </p>
              </Link>
            </li>
            <li>
              <Button variant="outline" className="border rounded">
                <Link href="/api/auth/signout">
                  <p className="hover:text-blue-300 transition-colors duration-300">
                    Logout
                  </p>
                </Link>
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationMenuComponent;
