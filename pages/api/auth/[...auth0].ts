// import { handleAuth } from '@auth0/nextjs-auth0';

// export default handleAuth();
export default (req, res) => {
  res.status(200).json({ message: "Auth route placeholder" });
};
