import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite"
import laravel from "laravel-vite-plugin"
import { wordpressPlugin } from '@roots/vite-plugin'

export default defineConfig({
    base: "/wp-content/plugins/test-plugin/public/build",
    plugins: [
        laravel({
            input: [
                "src/index.tsx",
            ],
            refresh: true,
        }),
        wordpressPlugin()
    ],
    publicDir: "public/build",
    build: {
        sourcemap: true,
        assetsInlineLimit: 0,
        rollupOptions: {
            external: [/^@wordpress\//],
            onwarn(warning, warn) {
                if (warning.message.includes('.svg')) return
                warn(warning)
            },
        },
    },
    server: {
        host: true,
        https: {
            key: "./ssl/localhost.key",
            cert: "./ssl/localhost.crt",
        },
        hmr: {
            host: "localhost",
        },
    },
    resolve: {
        alias: {
            "@src": fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
