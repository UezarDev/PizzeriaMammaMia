import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// Always use the repo subpath so both dev and production serve under /PizzeriaMammaMia/
	base: '/PizzeriaMammaMia/',
});
