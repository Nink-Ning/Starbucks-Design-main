#!/usr/bin/env node
/**
 * Build CJS shims, ESM shims, and .d.ts files for icon and locale subpath exports,
 * and fix the main CJS build for webpack 5 compatibility.
 *
 * Called from `npm run build` after vite build.
 *
 * Webpack 5 cannot statically analyze dynamic re-exports like:
 *   Object.keys(t).forEach(e => Object.defineProperty(exports, e, { get: () => t[e] }))
 *
 * All CJS files must use static `module.exports = require(...)` instead.
 */
import { writeFileSync, readFileSync, copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, '..', 'dist');

// ---- index.cjs.js (fix) ----
// Vite outputs a dynamic re-export pattern that webpack 5 can't tree-shake.
// Replace the tail (after the CSS-injection IIFE) with a static re-export.
const cjsFile = resolve(dist, 'index.cjs.js');
let cjs = readFileSync(cjsFile, 'utf8');

const RE_EXPORT_MARKER = '\n"use strict";Object.defineProperty(exports,Symbol.toStringTag';
const markerIdx = cjs.indexOf(RE_EXPORT_MARKER);

if (markerIdx !== -1) {
  cjs = cjs.substring(0, markerIdx) + '\nmodule.exports = require("@arco-design/web-react");\n';
  writeFileSync(cjsFile, cjs);
  console.log('✅ Fixed index.cjs.js for webpack 5 compatibility');
} else {
  console.warn('⚠️  Could not find dynamic re-export marker in index.cjs.js');
}

// ---- icon ----
// CJS shim: static module.exports (webpack 5 compatible)
writeFileSync(
  resolve(dist, 'icon.cjs'),
  'module.exports = require("@arco-design/web-react/icon");\n',
);

// ESM shim: use fully-specified path with .js extension for webpack 5
writeFileSync(
  resolve(dist, 'icon.es.js'),
  'export * from "@arco-design/web-react/icon/index.es.js";\n',
);

// .d.ts: re-export types
writeFileSync(resolve(dist, 'icon.d.ts'), 'export * from "@arco-design/web-react/icon";\n');

// ---- locale ----
// arco web-react lang file names (Pascal-kebab-case)
const langFiles = [
  'ar-EG', 'de-DE', 'en-US', 'es-ES', 'fr-FR', 'id-ID', 'it-IT',
  'ja-JP', 'ko-KR', 'ms-MY', 'pt-BR', 'pt-PT', 'ru-RU', 'th-TH',
  'tr-TR', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-TW',
];

// Convert Pascal-kebab-case to PascalCase: "zh-CN" → "zhCN", "ar-EG" → "arEG"
function kebabToPascal(kebab) {
  return kebab
    .split('-')
    .map((part, i) => (i === 0 ? part.toLowerCase() : part.toUpperCase()))
    .join('');
}

// .d.ts: named re-exports (each lang file uses `export default`)
const dtsLines = langFiles.map((name) => {
  const pascal = kebabToPascal(name);
  return `export { default as ${pascal} } from "@arco-design/web-react/es/locale/${name}";`;
});
writeFileSync(resolve(dist, 'locale.d.ts'), dtsLines.join('\n') + '\n');

// CJS shim: static exports (webpack 5 compatible)
// Each lang file uses `export default`, so we pull `.default` from the CJS interop.
const cjsLocaleLines = [
  '// CJS shim — static re-exports for webpack 5 compatibility.',
  '// Each lang file uses `export default`, so we pull `.default` from the CJS interop.',
  '',
];
for (const name of langFiles) {
  const pascal = kebabToPascal(name);
  cjsLocaleLines.push(
    `exports.${pascal} = require("@arco-design/web-react/es/locale/${name}").default;`,
  );
}
cjsLocaleLines.push('');
writeFileSync(resolve(dist, 'locale.cjs'), cjsLocaleLines.join('\n'));

// ESM shim: fully-specified paths with .js extension for webpack 5
const esmLines = langFiles.map((name) => {
  const pascal = kebabToPascal(name);
  return `export { default as ${pascal} } from "@arco-design/web-react/es/locale/${name}.js";`;
});
writeFileSync(resolve(dist, 'locale.es.js'), esmLines.join('\n') + '\n');

console.log('✅ Built icon + locale shims (CJS + ESM)');
