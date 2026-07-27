import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const demoUrl = new URL('../../demos/input/auto-width.tsx', import.meta.url);

test('input auto-width labels stay on one line', async () => {
  const demo = await readFile(demoUrl, 'utf8');

  assert.match(demo, /whiteSpace:\s*'nowrap'/);
  assert.match(demo, /overflowWrap:\s*'normal'/);
  assert.match(demo, /wordBreak:\s*'normal'/);
  assert.match(demo, /<code style=\{dividerLabelStyle\}>/);
  assert.doesNotMatch(demo, /<Typography\.Text code>/);
});
