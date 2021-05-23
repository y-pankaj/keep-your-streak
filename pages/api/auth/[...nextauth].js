import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dotenv from "dotenv";
dotenv.config();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    redirect: async (url, baseUrl) => {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URI,
});
