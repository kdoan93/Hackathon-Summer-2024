import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // Providers.Google({
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Add more providers here
  ],
  // Add any additional NextAuth configuration here
});
