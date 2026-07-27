import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8');
}

test('React button Radio group demo exposes all three shared variants', async () => {
  const [demo, docs] = await Promise.all([
    read('demos/radio/button-radio-group.tsx'),
    read('content/docs/components/data-entry/radio.mdx'),
  ]);

  for (const variant of ['outline', 'primary-filled', 'default-filled']) {
    assert.match(demo, new RegExp(`variant: '${variant}'`));
    assert.match(docs, new RegExp(`variant="${variant}"`));
  }

  assert.match(demo, /<Radio\.Group/);
  assert.match(demo, /variant=\{variant\.variant\}/);
  assert.match(demo, /options=\{options\}/);
  assert.match(demo, /type="button"/);
});
