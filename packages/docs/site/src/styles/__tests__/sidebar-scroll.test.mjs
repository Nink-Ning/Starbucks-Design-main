import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sidebar = await readFile(new URL('../../components/Sidebar.astro', import.meta.url), 'utf8');

test('desktop navigation preserves the user-controlled sidebar scroll position', () => {
  assert.match(sidebar, /document\.addEventListener\('astro:before-swap'/);
  assert.match(sidebar, /savedScrollTop = scroller\.scrollTop/);
  assert.match(sidebar, /savedSection = document\.documentElement\.dataset\.docsSection \|\| getSidebarSection\(\)/);
  assert.match(sidebar, /document\.addEventListener\('astro:after-swap'/);
  assert.match(sidebar, /document\.addEventListener\('astro:page-load'/);
  assert.match(sidebar, /savedSection === getSidebarSection\(\)/);
  assert.match(sidebar, /scroller\.scrollTop = savedScrollTop/);
  assert.match(sidebar, /savedScrollTop = undefined/);
  assert.doesNotMatch(sidebar, /aria-current|scrollIntoView|currentRect|visibleTop|visibleBottom/);
});
