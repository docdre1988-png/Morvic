import { defineConfig, loadEnv } from 'vite';
import adminApi from './server/vite-plugin.mjs';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => { Object.assign(process.env, loadEnv(mode, process.cwd(), '')); return { plugins: [react(), adminApi()] }; });
