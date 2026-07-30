import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'

// UMD 单独构建:lib 多入口不支持 umd,聚合入口见 src/umd.ts
export default defineConfig({
  plugins: [react(), cssInjectedByJs()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/umd.ts',
      formats: ['umd'],
      name: 'StarbucksReact',
      fileName: () => 'index.umd.js',
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
