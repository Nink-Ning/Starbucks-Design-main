import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8');
}

test('tree extra-node demos use the shared Button component for add actions', async () => {
  const [reactDemo, vueDemo] = await Promise.all([
    read('demos/tree/custom-extra-node.tsx'),
    read('demos/tree/custom-extra-node.vue'),
  ]);

  assert.match(reactDemo, /import \{ Button, Tree \} from '@sbux\/starbucks-design-react'/);
  assert.match(reactDemo, /className="tree-node-add-button"/);
  assert.match(reactDemo, /icon=\{<IconPlus \/>\}/);
  assert.match(reactDemo, /shape="square"/);
  assert.match(reactDemo, /node\.dataRef\.title/);
  assert.doesNotMatch(reactDemo, /node\.props\.title/);
  assert.doesNotMatch(reactDemo, /#3370ff/);

  assert.match(vueDemo, /class="tree-node-add-button"/);
  assert.match(vueDemo, /<Button[\s\S]*?<IconPlus \/>[\s\S]*?<\/Button>/);
  assert.match(vueDemo, /shape="square"/);
  assert.doesNotMatch(vueDemo, /#3370ff/);
});

test('tree add actions appear only while their row is interactive', async () => {
  const css = await read('demos/tree/custom-extra-node.css');

  assert.match(css, /\.tree-extra-demo \.arco-tree-node-title-block/);
  assert.match(css, /width:\s*var\(--spacing-7\)/);
  assert.match(
    css,
    /\.tree-extra-demo \.tree-node-add-button\s*\{[\s\S]*?visibility:\s*hidden;[\s\S]*?opacity:\s*0;[\s\S]*?pointer-events:\s*none;/,
  );
  assert.match(
    css,
    /\.tree-extra-demo \.arco-tree-node:hover \.tree-node-add-button,[\s\S]*?\.tree-extra-demo \.arco-tree-node:focus-within \.tree-node-add-button\s*\{[\s\S]*?visibility:\s*visible;[\s\S]*?opacity:\s*1;[\s\S]*?pointer-events:\s*auto;/,
  );
});
