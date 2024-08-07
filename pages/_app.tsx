import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
