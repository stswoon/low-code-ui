import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {},
    preview: {
        allowedHosts: ["low-code-ui.stswoon.ru"],
        proxy: {
            '/users': {target: 'http://localhost:3201', changeOrigin: true}
        }
    }
})
