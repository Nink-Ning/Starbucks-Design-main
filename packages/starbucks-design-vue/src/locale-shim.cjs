// CJS shim — re-exports locale language objects from @arco-design/web-vue/es/locale/lang.
// Each lang file uses `export default`, so we pull `.default` from the CJS interop.
// This file is referenced directly from package.json "exports" field.
const locales = [
  'ar-eg', 'de-de', 'en-us', 'es-es', 'fr-fr', 'id-id', 'it-it',
  'ja-jp', 'km-kh', 'ko-kr', 'ms-my', 'nl-nl', 'pt-pt',
  'ru-ru', 'th-th', 'vi-vn', 'zh-cn', 'zh-tw',
];

const toCamel = (s) =>
  s.replace(/-([a-z]+)/g, (_, c) => c.toUpperCase());

for (const name of locales) {
  const mod = require('@arco-design/web-vue/es/locale/lang/' + name);
  Object.defineProperty(exports, toCamel(name), {
    enumerable: true,
    get: () => mod.default || mod,
  });
}
