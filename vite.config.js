import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    const isExpo = mode === 'expo'

    return {
        plugins: [react()],

        base: './',

        build: {
            outDir: isExpo
                ? 'docs-expo'
                : 'docs-site',

            emptyOutDir: true,
        },

    // server: {
    //     proxy: {
    //         '/api': {
    //             target: backendTarget,
    //             changeOrigin: true,

    //             configure(proxy) {
    //                 proxy.on('proxyReq', (proxyReq, req) => {
    //                     console.log(
    //                         `[api proxy] ${req.method} ${req.url} -> ${proxyReq.path}`
    //                     )
    //                 })

    //                 proxy.on('proxyRes', (proxyRes, req) => {
    //                     console.log(
    //                         `[api proxy] ${req.method} ${req.url} <- ${proxyRes.statusCode}`
    //                     )
    //                 })

    //                 proxy.on('error', (error, req) => {
    //                     console.error(
    //                         `[api proxy error] ${req.method} ${req.url}`,
    //                         error
    //                     )
    //                 })
    //             },
    //         },

    //         '/photos': {
    //             target: backendTarget,
    //             changeOrigin: true,
    //         },
    //     },
    // },
    }
})