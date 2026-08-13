import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  ...(mode === 'test'
    ? {
        define: {
          'import.meta.env.VITE_DEMO_DATA_SOURCE': JSON.stringify('fixtures'),
        },
      }
    : {}),
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.spec.ts'],
  },
}));
