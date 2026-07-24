import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const demoDir = new URL('../../demos/tree-select/', import.meta.url);
const docsUrl = new URL(
  '../../content/docs/components/data-entry/tree-select.mdx',
  import.meta.url,
);
const reactOverrideUrl = new URL(
  '../../../../../starbucks-design-react/src/overrides/TreeSelect.less',
  import.meta.url,
);
const reactOverrideIndexUrl = new URL(
  '../../../../../starbucks-design-react/src/overrides/_index.less',
  import.meta.url,
);

test('TreeSelect basic examples use localized tree data without framework-only icons', async () => {
  const [reactDemo, vueDemo, docs] = await Promise.all([
    readFile(new URL('basic.tsx', demoDir), 'utf8'),
    readFile(new URL('basic.vue', demoDir), 'utf8'),
    readFile(docsUrl, 'utf8'),
  ]);

  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /华东区/);
    assert.match(demo, /上海市/);
    assert.match(demo, /placeholder="请选择区域"/);
  }

  assert.match(reactDemo, /treeData=\{treeData\}/);
  assert.doesNotMatch(vueDemo, /starbucks-design-vue\/icon/);
  assert.match(docs, /触发框复用选择器的交互状态/);
});

test('React TreeSelect override composes Select trigger and Tree popup geometry', async () => {
  const [styles, index] = await Promise.all([
    readFile(reactOverrideUrl, 'utf8'),
    readFile(reactOverrideIndexUrl, 'utf8'),
  ]);

  assert.match(index, /@import '\.\/TreeSelect\.less';/);
  assert.match(
    styles,
    /\.arco-tree-select \.arco-tree-select-view\s*\{[^}]*border:\s*1px solid var\(--color-border-component\);/s,
  );
  assert.match(
    styles,
    /\.arco-tree-select-focused[^}]*box-shadow:\s*0 0 0 2px var\(--color-primary-focus\);/s,
  );
  assert.match(styles, /\.arco-tree-select-popup\s*\{[^}]*box-shadow:\s*var\(--shadow-md\);/s);
  assert.match(
    styles,
    /\.arco-tree-select-popup \.arco-tree-node\s*\{[^}]*padding-left:\s*var\(--spacing-4\);/s,
  );
});

test('TreeSelect value and multiple demos stay localized in React and Vue', async () => {
  const files = ['v-model.tsx', 'v-model.vue', 'multiple.tsx', 'multiple.vue'];
  const demos = await Promise.all(
    files.map((file) => readFile(new URL(file, demoDir), 'utf8')),
  );

  for (const demo of demos) {
    assert.match(demo, /请选择区域/);
    assert.match(demo, /华东区/);
    assert.doesNotMatch(demo, /Please select/);
  }

  assert.doesNotMatch(demos[1], /starbucks-design-vue\/icon/);
  assert.doesNotMatch(demos[3], /starbucks-design-vue\/icon/);
});
