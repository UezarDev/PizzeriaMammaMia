import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// Use root during development so dev server runs at http://localhost:5173
	// and use the repo subpath when building for GitHub Pages.
	base: process.env.NODE_ENV === 'production' ? '/PizzeriaMammaMia/' : '/',
});
