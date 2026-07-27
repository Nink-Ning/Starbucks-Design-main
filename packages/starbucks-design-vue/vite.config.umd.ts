import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'

// UMD 单独构建:lib 多入口不支持 umd,聚合入口见 src/umd.ts
export default defineConfig({
  plugins: [vue(), cssInjectedByJs()],
  build: {
    emptyOutDir: false, // 不清掉主构建产物
    lib: {
      entry: 'src/umd.ts',
      formats: ['umd'],
      name: 'StarbucksVue',
      fileName: () => 'index.umd.js', // 保持原产物路径,unpkg/jsdelivr 字段不用动
    },
    rollupOptions: {
      external: ['vue', '@arco-design/web-vue', /^@arco-design\/web-vue\//],
      output: {
        globals: (id: string) => {
          if (id === 'vue') return 'Vue';
          if (id.startsWith('@arco-design/web-vue/es/icon')) return 'ArcoVueIcon';
          if (id.startsWith('@arco-design/web-vue')) return 'ArcoVue';
          return id;
        },
      },
    },
  },
})
