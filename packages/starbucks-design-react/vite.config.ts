import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJs(),
    dts({
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        // icon entry removed — ./icon subpath uses exports map to
        // resolve directly to @arco-design/web-react/icon (see package.json)
      },
      formats: ['es', 'cjs', 'umd'],
      name: 'StarbucksReact',
      fileName: (format, entryName) => {
        if (format === 'umd') return `${entryName}.umd.js`;
        return `${entryName}.${format === 'es' ? 'es' : 'cjs'}.js`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@arco-design/web-react', /^@arco-design\/web-react\//],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@arco-design/web-react': 'arco',
        },
      },
    },
  },
})
