module.exports = {
  env: {
    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    // MongoDB
    MONGODB_URI: process.env.MONGODB_URI,

    // Gemini (or other API keys)
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,

    // Session Cookie Secret
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
  },
};
