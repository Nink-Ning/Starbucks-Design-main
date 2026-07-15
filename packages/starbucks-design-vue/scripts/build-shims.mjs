#!/usr/bin/env node
/**
 * Build CJS shims and .d.ts files for icon and locale subpath exports.
 * Called from `npm run build` after vite build.
 */
import { writeFileSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, '..', 'dist');

// ---- icon ----
copyFileSync(resolve(__dirname, '..', 'src', 'icon-shim.cjs'), resolve(dist, 'icon.cjs'));
writeFileSync(resolve(dist, 'icon.d.ts'), 'export * from "@arco-design/web-vue/es/icon";\n');

// ---- locale ----
// arco web-vue lang file names (kebab-case)
const langFiles = [
  'ar-eg', 'de-de', 'en-us', 'es-es', 'fr-fr', 'id-id', 'it-it',
  'ja-jp', 'km-kh', 'ko-kr', 'ms-my', 'nl-nl', 'pt-pt',
  'ru-ru', 'th-th', 'vi-vn', 'zh-cn', 'zh-tw',
];

// Convert kebab-case to camelCase: "zh-cn" → "zhCN", "ar-eg" → "arEG"
function kebabToPascal(kebab) {
  return kebab
    .split('-')
    .map((part, i) => (i === 0 ? part : part.toUpperCase()))
    .join('');
}

// .d.ts: named re-exports (each lang file uses `export default`)
const dtsLines = langFiles.map((name) => {
  const pascal = kebabToPascal(name);
  return `export { default as ${pascal} } from "@arco-design/web-vue/es/locale/lang/${name}";`;
});
writeFileSync(resolve(dist, 'locale.d.ts'), dtsLines.join('\n') + '\n');

// Copy CJS shim
copyFileSync(resolve(__dirname, '..', 'src', 'locale-shim.cjs'), resolve(dist, 'locale.cjs'));

console.log('✅ Built icon + locale shims');
