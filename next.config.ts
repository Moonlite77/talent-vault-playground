import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    serverActions: { allowedOrigins: ["fucking-VERCEL-RIGHT-HERE.app","congenial-space-disco-q7vr7555p5gwf4jgg-3000.app.github.dev", "localhost:3000"], }
  }
  
};

export default nextConfig;
