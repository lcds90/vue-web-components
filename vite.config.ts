/// <reference types="histoire" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],

    histoire: {
        // Histoire config can also go here
    },
    build: {
        lib: {
            entry: './src/main.ce.ts',
            name: 'web-component-sample',
            // the proper extensions will be added
            fileName: 'web-component-sample'
        }
    },
    define: {
        'process.env': process.env
    }
})
