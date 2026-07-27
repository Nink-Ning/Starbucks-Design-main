import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8');
}

const demoNames = ['basic', 'with-breadcrumb', 'transparent-bg', 'combined'];

test('PageHeader demos use Starbucks copy in React and Vue', async () => {
  const demos = await Promise.all(
    demoNames.flatMap((name) => [
      read(`demos/page-header/${name}.tsx`),
      read(`demos/page-header/${name}.vue`),
    ]),
  );

  for (const demo of demos) {
    assert.doesNotMatch(demo, /ArcoDesign/);
    assert.match(demo, /Starbucks/);
  }
});

test('PageHeader size controls use the component Radio group at the top left', async () => {
  for (const name of ['basic', 'with-breadcrumb', 'transparent-bg']) {
    const [reactDemo, vueDemo] = await Promise.all([
      read(`demos/page-header/${name}.tsx`),
      read(`demos/page-header/${name}.vue`),
    ]);

    assert.ok(reactDemo.indexOf('<Radio.Group') < reactDemo.indexOf('<PageHeader'));
    assert.ok(vueDemo.indexOf('<RadioGroup') < vueDemo.indexOf('<PageHeader'));
    assert.match(reactDemo, /<Radio\.Group[\s\S]*?style=\{\{ marginBottom: 20 \}\}/);
    assert.match(vueDemo, /<div style="margin-bottom: 20px">[\s\S]*?<RadioGroup/);
    assert.doesNotMatch(reactDemo, /borderRadius/);
    assert.doesNotMatch(vueDemo, /border-radius:\s*4px/);
    assert.doesNotMatch(reactDemo, /extra=\{[\s\S]*?<Radio\.Group/);
    assert.doesNotMatch(vueDemo, /<template #extra>[\s\S]*?<RadioGroup/);
  }
});
