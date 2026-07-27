import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJs({ relativeCSSInjection: true }), // 多入口:各入口只注入自己的 CSS
    dts({
      outDir: 'dist',
      exclude: ['**/__tests__/**', 'src/umd.ts'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        pro: 'src/pro/index.ts',
      },
      formats: ['es', 'cjs'], // UMD 移至 vite.config.umd.ts(lib 多入口不支持 umd)
      name: 'StarbucksVue',
      fileName: (format, entryName) => {
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
