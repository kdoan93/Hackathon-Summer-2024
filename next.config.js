module.exports = {
  env: {
    // Auth0
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_POST_LOGOUT_REDIRECT_URI: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
    AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,

    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    // MongoDB
    MONGODB_URI: process.env.MONGODB_URI,

    // Gemini (or other API keys)
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,

    // Google Auth
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // Session Cookie Secret
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
  },
};
