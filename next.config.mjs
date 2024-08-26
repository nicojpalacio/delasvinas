/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https', // Assuming your Cloudinary images use https
                hostname: 'res.cloudinary.com',
            }
        ]
    }
};

export default nextConfig;
