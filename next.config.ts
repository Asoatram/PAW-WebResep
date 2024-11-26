import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        // Add a rule to ignore `.html` files
        config.module.rules.push({
            test: /\.html$/,
            use: "ignore-loader", // This loader ignores `.html` files
        });

        // Exclude problematic package on the client-side
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "@mapbox/node-pre-gyp": false, // Prevent Webpack from including this package
            };
        }

        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true, // Allows deployment even with TypeScript errors
    },

};

export default nextConfig;
