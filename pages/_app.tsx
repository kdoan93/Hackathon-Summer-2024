import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './global.css';
import { ClerkProvider, SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default MyApp;
