import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    const isExpo = mode === 'expo'

    // const backendTarget = 'https://217.182.192.79'
    //    const backendTarget = 'http://127.0.0.1:8084'

    return {
        plugins: [react()],

        base: './',

        build: {
            outDir: isExpo
                ? 'docs-expo'
                : 'docs-site',

            emptyOutDir: true,

            // rollupOptions: {
            //     output: {
            //         entryFileNames: 'assets/index.js',

            //         chunkFileNames:
            //             'assets/[name].js',

            //         assetFileNames:
            //             'assets/[name][extname]',
            //     },
            // },
        },

        // server: {
        //     proxy: {
        //         '/api': {
        //             target: backendTarget,
        //             changeOrigin: true,
        //             secure: false,
        //             // headers: {
        //             //     Host: 'testwww.roth-france.fr',
        //             // },

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
        //             secure: false,
        //             // headers: {
        //             //     Host: 'testwww.roth-france.fr',
        //             // },
        //         },
        //           '/catalogue': {
        //             target: backendTarget,
        //              changeOrigin: true,
        //             secure: false,
        //             cookieDomainRewrite: '',
        //             //  headers: {
        //             //     Host: 'testwww.roth-france.fr',
        //             // },
        //         },
        //     },
        // },
    }
})