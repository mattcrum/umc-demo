/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure styled-components for React 19 compatibility
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
      meaninglessFileNames: ['index', 'styles'],
    },
  },
  // Suppress styled-components hydration warnings
  // experimental: {
  //   forceSwcTransforms: true,
  // },
}

module.exports = nextConfig