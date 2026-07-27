import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sidebar = await readFile(new URL('../../components/Sidebar.astro', import.meta.url), 'utf8');

test('desktop navigation keeps the selected sidebar item inside the visible scroll area', () => {
  assert.match(sidebar, /function keepCurrentSidebarItemVisible\(\)/);
  assert.match(sidebar, /querySelector\('a\[aria-current="page"\]'\)/);
  assert.match(sidebar, /document\.addEventListener\('astro:page-load', keepCurrentSidebarItemVisible\)/);
  assert.match(sidebar, /currentRect\.top < visibleTop/);
  assert.match(sidebar, /currentRect\.bottom > visibleBottom/);
  assert.match(sidebar, /scroller\.scrollTop -= visibleTop - currentRect\.top/);
  assert.match(sidebar, /scroller\.scrollTop \+= currentRect\.bottom - visibleBottom/);
  assert.doesNotMatch(sidebar, /current\.scrollIntoView|window\.scrollTo/);
});
