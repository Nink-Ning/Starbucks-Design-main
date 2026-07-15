import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    vue(),
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
        // resolve directly to @arco-design/web-vue/es/icon (see package.json)
      },
      formats: ['es', 'cjs', 'umd'],
      name: 'StarbucksVue',
      fileName: (format, entryName) => {
        if (format === 'umd') return `${entryName}.umd.js`;
        return `${entryName}.${format === 'es' ? 'es' : 'cjs'}.js`;
      },
    },
    rollupOptions: {
      external: ['vue', '@arco-design/web-vue', /^@arco-design\/web-vue\//],
      output: {
        globals: (id: string) => {
          if (id === 'vue') return 'Vue';
          if (id.startsWith('@arco-design/web-vue')) return 'ArcoVue';
        },
      },
    },
  },
})
