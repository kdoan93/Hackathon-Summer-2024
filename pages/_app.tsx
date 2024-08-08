import { AppProps } from 'next/app';
import { useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <UserProvider>
      <Component {...pageProps} isLoggedIn={isLoggedIn} />
    </UserProvider>
  );
};

export default MyApp;
