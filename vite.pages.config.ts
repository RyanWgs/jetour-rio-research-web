import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const staticBase = process.env.STATIC_BASE || '/jetour-rio-research-web/';
const outputDirectory = process.env.STATIC_OUT_DIR || 'pages-dist';

export default defineConfig({
  root: path.join(projectRoot, 'github-pages'),
  base: staticBase,
  plugins: [react()],
  resolve: { alias: { '@': projectRoot } },
  publicDir: path.join(projectRoot, 'public'),
  build: { outDir: path.join(projectRoot, outputDirectory), emptyOutDir: true },
});
