/** @type {import('next').NextConfig} */

import NextPWA from "next-pwa";

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
