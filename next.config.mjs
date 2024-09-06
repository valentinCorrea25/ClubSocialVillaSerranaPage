/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = {
  /* config options here */
};

module.exports = {
  ...nextConfig, // fusiona el objeto de configuración de Next.js
  ...withVideos(), // añade la configuración de "next-videos"
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
