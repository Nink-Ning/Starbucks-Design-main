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

// ESM shim: the `import` export condition must resolve to real ESM, not CJS —
// Vite dev serves linked workspace packages without prebundling, so a CJS file
// referenced from the `import` condition breaks named-export interop
// (Object.defineProperty getters in icon-shim.cjs aren't statically analyzable).
// Use a fully-specified path (with /index.js) since `@arco-design/web-vue/es/icon`
// is a directory with no package.json — bare directory imports are not supported
// by Node/Vite's ESM resolver.
writeFileSync(resolve(dist, 'icon.mjs'), 'export * from "@arco-design/web-vue/es/icon/index.js";\n');

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

// ESM shim: fully-specified paths (with .js extension) for each lang file —
// same rationale as icon.mjs above.
const esmLocaleLines = langFiles.map((name) => {
  const pascal = kebabToPascal(name);
  return `export { default as ${pascal} } from "@arco-design/web-vue/es/locale/lang/${name}.js";`;
});
writeFileSync(resolve(dist, 'locale.mjs'), esmLocaleLines.join('\n') + '\n');

console.log('✅ Built icon + locale shims');
