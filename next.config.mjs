/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'img.freepik.com',
              port: '',
              pathname: '/**',
            },
            {
              protocol: 'https',
              hostname: 'zsukhnfunulzsncvnqmj.supabase.co',
              port: '',
              pathname: '/**',
            },
          ],
    }
};

export default nextConfig;
