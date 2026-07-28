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

test('disabled form mirrors the controlled form layout', async () => {
  const demo = await readDemo('global-disabled.tsx');

  assert.match(demo, /width: 96, maxWidth: 96, flex: '0 0 96px'/);
  assert.doesNotMatch(demo, /labelCol:\s*\{\s*span:/);
  assert.match(demo, /<Input placeholder="请输入\.\.\." style=\{\{ width: 350 \}\}/);
  assert.match(demo, /<InputNumber placeholder="请输入" style=\{\{ width: 160 \}\}/);
  assert.match(demo, /<DatePicker showTime style=\{\{ width: 240 \}\}/);
  assert.match(demo, /<Slider style=\{\{ width: 280 \}\}/);
  assert.match(demo, /onPreview=\{\(file\) =>/);
  assert.match(demo, /<div style=\{\{ display: 'flex', gap: 16 \}\}>/);
  assert.doesNotMatch(demo, /on预览附件|marginRight/);
});

test('normalized fields use their component demo widths', async () => {
  const demo = await readDemo('normalize.tsx');

  assert.match(demo, /<Input placeholder="请输入\.\.\." style=\{\{ width: 350 \}\}/);
  assert.match(
    demo,
    /<DatePicker\.RangePicker placeholder="请输入\.\.\." style=\{\{ width: 360 \}\}/,
  );
});

test('dynamic form actions and nested data actions use a single 16px gap', async () => {
  const [dynamicForm, nestedData] = await Promise.all([
    readDemo('dynamic-form.tsx'),
    readDemo('nested-data.tsx'),
  ]);

  assert.match(dynamicForm, /<div style=\{\{ display: 'flex', gap: 16 \}\}>/);
  assert.match(nestedData, /<div style=\{\{ display: 'flex', gap: 16 \}\}>/);
});

test('nested data rows have 24px separation without nested margins', async () => {
  const demo = await readDemo('nested-data.tsx');

  assert.match(demo, /label="门店信息" required style=\{\{ marginBottom: 24 \}\}/);
  assert.equal((demo.match(/style=\{\{ marginBottom: 0 \}\}/g) || []).length, 2);
});

test('dynamic nested delete action is a transparent icon button', async () => {
  const demo = await readDemo('dynamic-nested.tsx');

  assert.match(
    demo,
    /aria-label="删除门店人员"[\s\S]*?icon=\{<IconDelete \/>\}[\s\S]*?shape="circle"[\s\S]*?status="danger"[\s\S]*?type="text"/,
  );
});
