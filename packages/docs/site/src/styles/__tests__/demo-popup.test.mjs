import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const legacyCssUrl = new URL('../legacy-docs.css', import.meta.url);

test('demo cards release locally mounted popups from overflow clipping', async () => {
  const css = await readFile(legacyCssUrl, 'utf8');

  assert.match(
    css,
    /\.sb-demo:has\(\.arco-trigger\)\s*\{[\s\S]*?z-index:\s*3;[\s\S]*?overflow:\s*visible;/,
  );
  assert.match(
    css,
    /\.sb-demo\s*\{[\s\S]*?overflow:\s*hidden;/,
  );
});
