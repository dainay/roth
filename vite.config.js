import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendTarget = 'http://127.0.0.1:8084'

export default defineConfig({
    plugins: [react()],
    base: './',

    build: {
        outDir: 'docs',
        emptyOutDir: true,
    },

    server: {
        proxy: {
            '/api': {
                target: backendTarget,
                changeOrigin: true,

                configure(proxy) {
                    proxy.on('proxyReq', (proxyReq, req) => {
                        console.log(
                            `[api proxy] ${req.method} ${req.url} -> ${proxyReq.path}`
                        )
                    })

                    proxy.on('proxyRes', (proxyRes, req) => {
                        console.log(
                            `[api proxy] ${req.method} ${req.url} <- ${proxyRes.statusCode}`
                        )
                    })

                    proxy.on('error', (error, req) => {
                        console.error(
                            `[api proxy error] ${req.method} ${req.url}`,
                            error
                        )
                    })
                },
            },

            '/photos': {
                target: backendTarget,
                changeOrigin: true,
            },
        },
    },
})