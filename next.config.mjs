// Test Logs
// console.log("--- STARTING next.config.mjs ---");
// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
// console.log("--- ENDING next.config.mjs ---");



/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // Image Content
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;