"use client"
import Link from "next/link";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import { getServerSession } from 'next-auth';



function NavigationMenuComponent() {
  const [sessionOauth, setSessionOauth] = useState<Session | null>(null);

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


  return (  
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <Link href="/">
        <h1 className="text-xl font-bold">FindWorksArt</h1>
      </Link>

      <ul className="flex gap-x-4">
        {!sessionOauth?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/search">Search</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}



export default NavigationMenuComponent;
