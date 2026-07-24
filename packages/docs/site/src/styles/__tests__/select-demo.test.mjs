import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const autoWidthUrl = new URL('../../demos/select/auto-width.tsx', import.meta.url);
const customTagUrl = new URL('../../demos/select/custom-tag.tsx', import.meta.url);

test('select auto-width labels stay aligned on one line', async () => {
  const demo = await readFile(autoWidthUrl, 'utf8');

  assert.match(demo, /whiteSpace:\s*'nowrap'/);
  assert.match(demo, /overflowWrap:\s*'normal'/);
});

test('custom select tags rely on the shared component spacing', async () => {
  const demo = await readFile(customTagUrl, 'utf8');

  assert.doesNotMatch(demo, /margin:\s*['"]/);
});
