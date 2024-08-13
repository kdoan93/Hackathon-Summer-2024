import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";

const NavBar = () => {
  const router = useRouter();

  // Function to check if the current route matches the link's href
  const isActive = (href: string) => router.pathname === href;

  return (
    <div className="nav-container fixed top-0 left-0 right-0 bg-base-100 p h-16">
      <Link href="/">
        <img
          src="/images/sustainlogo-peach.png"
          className="h-24 w-24 fixed top-5 left-5 transition-all duration-300 ease-in-out transform hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.8)] hover:rounded-full active:scale-95"
          alt="Sustain Logo"
        />
      </Link>
      <div className="navbar h-12 pl-24">
        <div className="flex-1"></div>
        <SignedIn>
          <div className="text-logo-orange flex items-center space-x-3">
            <UserButton />
            <Link
              className={`pl-3 btn btn-ghost text-xl ${
                isActive("/dashboard") ? "text-logo-orange" : "text-gray-600"
              }`}
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className={`pl-3 btn btn-ghost text-xl ${
                isActive("/meal-input") ? "text-logo-orange" : "text-gray-600"
              }`}
              href="/meal-input"
            >
              Meal Input
            </Link>
            <Link
              className={`pl-3 btn btn-ghost text-xl ${
                isActive("/prompt-tips") ? "text-logo-orange" : "text-gray-600"
              }`}
              href="/prompt-tips"
            >
              Prompt Tips
            </Link>
            <Link
              className={`pl-3 btn btn-ghost text-xl ${
                isActive("/about") ? "text-logo-orange" : "text-gray-600"
              }`}
              href="/about"
            >
              About
            </Link>
          </div>
          <div>
            <a className="text-dark-brown pl-3 flex float-end btn btn-ghost text-xl">
              <SignOutButton />
            </a>
          </div>
        </SignedIn>
        <SignedOut>
          <div>
            <Link
              className={`pl-3 btn btn-ghost text-xl text-black bg-logo-orange hover:text-white animate-pulse`}
              href="/meal-input"
            >
              Try Now!
            </Link>
            <Link
              className={`pl-3 btn btn-ghost text-xl ${
                isActive("/about") ? "text-logo-orange" : "text-gray-600"
              }`}
              href="/about"
            >
              About Us
            </Link>
            <a className="pl-3 btn btn-ghost text-xl text-logo-orange">
              <SignInButton />
            </a>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default NavBar;
