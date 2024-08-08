// import { handleAuth } from '@auth0/nextjs-auth0';

// export default handleAuth();

// Build fails with this code
// export default (req, res) => {
//   res.status(200).json({ message: "Auth route placeholder" });
// };

// Temporary workaround
export default (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  res.status(200).json({ message: "Auth route placeholder" });
};
