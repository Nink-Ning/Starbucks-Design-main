import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const demosUrl = new URL('../../demos/switch/', import.meta.url);
const pageUrl = new URL('../../content/docs/components/data-entry/switch.mdx', import.meta.url);

test('Switch docs expose only circle and round variants', async () => {
  const demoFiles = (await readdir(demosUrl)).filter((name) => /\.(tsx|vue)$/.test(name));
  const demoSources = await Promise.all(
    demoFiles.map((name) => readFile(new URL(name, demosUrl), 'utf8')),
  );
  const page = await readFile(pageUrl, 'utf8');

  assert.doesNotMatch(demoSources.join('\n'), /type=(["'])line\1/);
  assert.doesNotMatch(page, /type='line'|\|\s*'line'/);
  assert.match(page, /`circle` - 圆形（默认）、`round` - 圆角两种类型。/);
});
