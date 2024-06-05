
import Link from "next/link";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import { getServerSession } from 'next-auth';



async function NavigationMenuComponent() {
  

  const sessionOauth = await getServerSession();


  return (  
    <nav className="flex justify-between items-center bg-blue-600 text-white px-8 py-4 shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-bold">FindWorksArt</h1>
      </Link>

      <ul className="flex gap-x-4">
        {!sessionOauth?.user ? (
          <>
            <li>
              <Link href="/">
                <p className="hover:text-blue-300">Home</p>
              </Link>
            </li>
            <li>
              <Link href="/auth/login">
                <p className="hover:text-blue-300">Login</p>
              </Link>
            </li>
            <li>
              <Link href="/auth/register">
                <p className="hover:text-blue-300">Register</p>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/search">
                <p className="hover:text-blue-300">Search</p>
              </Link>
            </li>
            <li>
              <Link href="/api/auth/signout">
                <p className="hover:text-blue-300">Logout</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavigationMenuComponent;
