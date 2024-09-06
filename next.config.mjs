/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = {
    /* config options here */
};
module.exports = {
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
}

export default {
    ...nextConfig,
    ...withVideos(),
};