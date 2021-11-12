import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';

export default defineConfig({
  plugins: [reactRefresh(), ViteAliases()],
});
