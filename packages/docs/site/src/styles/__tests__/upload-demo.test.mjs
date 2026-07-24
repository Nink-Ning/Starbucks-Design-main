import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const docsUrl = new URL('../../content/docs/components/data-entry/upload.mdx', import.meta.url);
const demoDir = new URL('../../demos/upload/', import.meta.url);
const reactOverrideUrl = new URL(
  '../../../../../starbucks-design-react/src/overrides/Upload.less',
  import.meta.url,
);
const vueOverrideUrl = new URL(
  '../../../../../starbucks-design-vue/src/overrides/Upload.less',
  import.meta.url,
);
const showcaseStylesUrl = new URL('../../demos/upload/showcase.css', import.meta.url);

test('upload showcases follow the Figma order and reuse design-system primitives', async () => {
  const docs = await readFile(docsUrl, 'utf8');
  const demoNames = [
    'basic-usage',
    'file-input-upload',
    'image-upload',
    'drag-upload',
    'batch-image-upload',
    'batch-file-upload',
  ];

  let previousIndex = -1;
  for (const demoName of demoNames) {
    const marker = `<Demo name="upload/${demoName}" />`;
    const markerIndex = docs.indexOf(marker);

    assert.ok(markerIndex > previousIndex, `${demoName} should follow the Figma showcase order`);
    previousIndex = markerIndex;

    const [reactDemo, vueDemo] = await Promise.all([
      readFile(new URL(`${demoName}.tsx`, demoDir), 'utf8'),
      readFile(new URL(`${demoName}.vue`, demoDir), 'utf8'),
    ]);

    assert.match(reactDemo, /<Upload\b/);
    assert.match(vueDemo, /<Upload\b/);
  }

  const [basicReact, imageReact, dragReact, batchFileReact] = await Promise.all([
    readFile(new URL('basic-usage.tsx', demoDir), 'utf8'),
    readFile(new URL('image-upload.tsx', demoDir), 'utf8'),
    readFile(new URL('drag-upload.tsx', demoDir), 'utf8'),
    readFile(new URL('batch-file-upload.tsx', demoDir), 'utf8'),
  ]);

  assert.match(basicReact, /<Button\b/);
  assert.match(basicReact, /<IconUpload\b/);
  assert.match(imageReact, /<Button\b/);
  assert.match(imageReact, /<IconPlus\b/);
  assert.match(dragReact, /<Link\b/);
  assert.match(batchFileReact, /<Table\b/);
  assert.match(batchFileReact, /border=\{false\}/);
});

test('React and Vue Upload overrides preserve the shared Figma geometry', async () => {
  const [reactStyles, vueStyles] = await Promise.all([
    readFile(reactOverrideUrl, 'utf8'),
    readFile(vueOverrideUrl, 'utf8'),
  ]);

  for (const styles of [reactStyles, vueStyles]) {
    assert.match(styles, /width:\s*120px;/);
    assert.match(styles, /height:\s*120px;/);
    assert.match(styles, /height:\s*144px;/);
    assert.match(styles, /padding:\s*var\(--spacing-6\);/);
    assert.match(styles, /border:\s*1px dashed var\(--color-border-component\);/);
    assert.match(styles, /box-shadow:\s*0 0 0 2px var\(--color-primary-focus\);/);
  }

  assert.match(reactStyles, /\.arco-upload-trigger-with-icon\.arco-btn-primary/);
  assert.match(vueStyles, /\.arco-upload > \.arco-btn-primary/);
});

test('upload showcase matches the file-flow geometry and alignment', async () => {
  const styles = await readFile(showcaseStylesUrl, 'utf8');

  assert.match(
    styles,
    /\.sb-upload-image-trigger\.arco-btn\.arco-btn-dashed\s*\{[^}]*border:\s*1px dashed/s,
  );
  assert.match(
    styles,
    /\.sb-upload-demo\.sb-upload-flow-upload\s*\{[^}]*width:\s*496px/s,
  );
  assert.match(
    styles,
    /\.sb-upload-flow-header \.sb-upload-tip\s*\{[^}]*text-align:\s*left/s,
  );
  assert.match(styles, /\.sb-upload-file-table thead \.arco-table-th\s*\{[^}]*height:\s*46px/s);
  assert.match(
    styles,
    /\.sb-upload-file-table thead \.arco-table-th\s*\{[^}]*border-bottom:\s*0/s,
  );
  assert.match(styles, /\.sb-upload-file-table \.arco-table-th-item\s*\{[^}]*padding:\s*0/s);
  assert.match(styles, /\.sb-upload-table-empty\s*\{[^}]*height:\s*210px/s);
});
