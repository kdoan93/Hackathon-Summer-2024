import { AppProps } from 'next/app';
import { useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./global.css";
import { ClerkProvider, SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <ClerkProvider>
      <UserProvider>
        <Component {...pageProps} isLoggedIn={isLoggedIn} />
      </UserProvider>
    </ClerkProvider>
  );
};

export default MyApp;
