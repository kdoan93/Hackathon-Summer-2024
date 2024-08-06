import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "./global.css"; // Import global styles if any

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;