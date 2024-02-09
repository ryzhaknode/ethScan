/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Додайте конфігурацію для експорту
    exportPathMap: function () {
        return {
            '/': {page: '/'},
            // Додайте інші маршрути за необхідністю
        };
    },
};

export default nextConfig;
