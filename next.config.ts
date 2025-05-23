import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/app/api/:path*",
      },
      {
        source: "/login",
        destination: "/common/dashboards/Login",
      },
      {
        source: "/profile",
        destination: "/common/dashboards/Profile",
      },
      {
        source: "/catalog",
        destination: "/common/dashboards/Catalog",
      },
      {
        source: "/feedback",
        destination: "/common/dashboards/Feedback",
      },
    ];
  },
};

export default nextConfig;
