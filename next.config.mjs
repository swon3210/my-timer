/** @type {import('next').NextConfig} */

import NextPWA from "next-pwa";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const withPWA = NextPWA({
  dest: "public",
  register: true, // 서비스 워커 자동 등록
  skipWaiting: true, // 업데이트 시 즉시 새로운 서비스 워커 적용
  disable: process.env.NODE_ENV === "development", // 개발 환경에서는 비활성화
});

const nextConfig = withPWA({
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 오류 무시
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["firebase-admin"],
  },
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "firebase-admin"];
      // 서버 사이드에서도 Buffer를 제공 (빌드 타임 분석을 위해)
      const bufferPath = require.resolve("buffer");
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: bufferPath,
      };
      config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ];
    } else {
      // 클라이언트 사이드에서 Buffer polyfill 제공
      const bufferPath = require.resolve("buffer");
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: bufferPath,
      };
      config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ];
    }
    return config;
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
});

export default nextConfig;
