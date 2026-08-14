import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',

  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },

//   server: {
//     proxy: { 
     
//       '/api': {
//         target: 'https://217.182.192.79',
//         changeOrigin: true,
//         secure: false,

//         headers: {
//           Host: 'testwww.roth-france.fr',
//         },

//         configure(proxy) {
//           proxy.on('proxyReq', (proxyReq, req) => {
//             console.log(
//               `[api proxy] ${req.method} ${req.url} -> ${proxyReq.path}`
//             )
//           })

//           proxy.on('proxyRes', (proxyRes, req) => {
//             console.log(
//               `[api proxy] ${req.method} ${req.url} <- ${proxyRes.statusCode}`
//             )
//           })

//           proxy.on('error', (error, req) => {
//             console.error(
//               `[api proxy error] ${req.method} ${req.url}`,
//               error
//             )
//           })
//         },
//       },

 
//     },
//   },
})