import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Internal DesignKit Starter runtime build only.
// This deliberately does not use vite-plugin-css-injected-by-js: CSS must remain
// an independently inspectable asset while JS and CSS are emitted by one build.
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: process.env.STARTER_RUNTIME_TEMP || 'dist-starter-runtime',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/starter-runtime.ts',
      formats: ['umd'],
      name: 'StarbucksReact',
      fileName: () => 'starbucks-react.umd.js',
      cssFileName: 'starbucks-react',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@arco-design/web-react', /^@arco-design\/web-react\//],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@arco-design/web-react': 'arco',
          '@arco-design/web-react/icon': 'arcoicon',
          '@arco-design/web-react/icon/index.js': 'arcoicon',
        },
      },
    },
  },
})
