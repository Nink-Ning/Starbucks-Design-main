import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const legacyCss = await readFile(new URL('../legacy-docs.css', import.meta.url), 'utf8');

test('demo code toggle stays anchored to the preview when code is expanded', () => {
  assert.match(
    legacyCss,
    /\.sb-demo-code\s*\{[\s\S]*?position:\s*relative;/,
  );
  assert.match(
    legacyCss,
    /\.sb-demo-code summary\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?top:\s*-32px;[\s\S]*?bottom:\s*auto;/,
  );
});
