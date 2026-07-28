import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const demoUrl = new URL('../../demos/form/', import.meta.url);

const readDemo = (name) => readFile(new URL(name, demoUrl), 'utf8');

test('basic form uses a multiline field in both frameworks', async () => {
  const [reactDemo, vueDemo] = await Promise.all([
    readDemo('basic.tsx'),
    readDemo('basic.vue'),
  ]);

  assert.match(reactDemo, /<Form\.Item label="文本域">\s*<Input\.TextArea/);
  assert.match(reactDemo, /autoSize=\{\{ minRows: 3 \}\}/);
  assert.match(vueDemo, /<FormItem field="post" label="文本域">\s*<Textarea/);
  assert.match(vueDemo, /:auto-size="\{ minRows: 3 \}"/);
});

test('controlled form uses a compact label column and component-specific widths', async () => {
  const demo = await readDemo('controlled.tsx');

  assert.match(demo, /width: 96, maxWidth: 96, flex: '0 0 96px'/);
  assert.doesNotMatch(demo, /labelCol:\s*\{\s*span:/);
  assert.match(demo, /<Input placeholder="请输入\.\.\." style=\{\{ width: 350 \}\}/);
  assert.match(demo, /<InputNumber placeholder="请输入" style=\{\{ width: 160 \}\}/);
  assert.match(demo, /<DatePicker showTime style=\{\{ width: 240 \}\}/);
  assert.match(demo, /<Slider style=\{\{ width: 280 \}\}/);
  assert.match(demo, /onPreview=\{\(file\) =>/);
  assert.doesNotMatch(demo, /on预览附件/);
});

test('form method actions have a single 16px spacing source', async () => {
  const demo = await readDemo('form-methods.tsx');

  assert.match(demo, /<div style=\{\{ display: 'flex', gap: 16 \}\}>/);
  assert.doesNotMatch(demo, /\bSpace\b/);
  assert.doesNotMatch(demo, /marginRight/);
});
