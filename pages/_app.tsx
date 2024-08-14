import { AppProps } from 'next/app';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import "./global.css";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag('config', 'G-HYG8BVZ0CJ', {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ClerkProvider>
      afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard"
      {/* Google Analytics Script */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-HYG8BVZ0CJ`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HYG8BVZ0CJ');
          `
        }}
      />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default MyApp;
