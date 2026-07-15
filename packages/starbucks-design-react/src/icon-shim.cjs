// CJS shim — re-exports icons from @arco-design/web-react/icon.
// Using CJS (not ESM) to avoid webpack's "fully specified" ESM resolution rule
// which would require an explicit .js extension in the import path.
// This file is referenced directly from package.json "exports" field.
const icon = require('@arco-design/web-react/icon');

for (const key of Object.keys(icon)) {
  if (key !== 'default' && !Object.prototype.hasOwnProperty.call(exports, key)) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: () => icon[key],
    });
  }
}
