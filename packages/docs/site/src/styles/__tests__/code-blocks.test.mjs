import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const legacyCss = await readFile(new URL('../legacy-docs.css', import.meta.url), 'utf8');
const demoAstro = await readFile(new URL('../../components/Demo.astro', import.meta.url), 'utf8');

test('code frames and component previews share the module radius', () => {
  assert.match(legacyCss, /--sb-docs-module-radius:\s*8px;/);
  assert.match(
    legacyCss,
    /\.sl-markdown-content \.expressive-code figure\.frame\s*\{[\s\S]*?border-radius:\s*var\(--sb-docs-module-radius\);/,
  );
  assert.match(
    legacyCss,
    /\.sb-demo\s*\{[\s\S]*?border-radius:\s*var\(--sb-docs-module-radius\);/,
  );
});

test('terminal frames hide their decorative titlebar', () => {
  assert.match(
    legacyCss,
    /figure\.frame\.is-terminal > figcaption\.header\s*\{\s*display:\s*none;/,
  );
});

test('titled code frames use a full-width module header', () => {
  assert.match(
    legacyCss,
    /figure\.frame\.has-title:not\(\.is-terminal\) > figcaption\.header\s*\{[\s\S]*?min-height:\s*48px;[\s\S]*?border-bottom:\s*1px solid var\(--sb-docs-border\);/,
  );
});

test('code frame copy actions match hidden mini outline icon buttons', () => {
  assert.match(
    legacyCss,
    /figure\.frame \.copy button\s*\{[\s\S]*?width:\s*24px;[\s\S]*?height:\s*24px;[\s\S]*?border:\s*1px solid var\(--color-border-component\);[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?opacity:\s*0;/,
  );
  assert.match(
    legacyCss,
    /figure\.frame:hover \.copy button,[\s\S]*?figure\.frame:focus-within \.copy button\s*\{\s*opacity:\s*1;/,
  );
  assert.match(
    legacyCss,
    /figure\.frame \.copy button:hover\s*\{[\s\S]*?border-color:\s*var\(--color-primary-hover\);[\s\S]*?background:\s*var\(--bg-color-container-hover\);/,
  );
});

test('code scrollbars stay hidden until interaction', () => {
  assert.match(
    legacyCss,
    /figure\.frame pre\s*\{[\s\S]*?scrollbar-color:\s*transparent transparent;/,
  );
  assert.match(
    legacyCss,
    /figure\.frame:hover pre,[\s\S]*?figure\.frame:focus-within pre\s*\{[\s\S]*?scrollbar-color:\s*var\(--ec-sbThumbCol\) transparent;/,
  );
});

test('component demo code uses named TSX and Vue grammars with light and dark themes', () => {
  assert.match(demoAstro, /import githubLight from '@shikijs\/themes\/github-light-high-contrast';/);
  assert.match(demoAstro, /import githubDark from '@shikijs\/themes\/github-dark-high-contrast';/);
  assert.match(demoAstro, /const tsxLanguage = tsxLang\.find\(\(language\) => language\.name === 'tsx'\);/);
  assert.match(demoAstro, /const vueLanguage = Object\.assign\(\[\.\.\.vueLang\], \{ name: 'vue' \}\)/);
  assert.match(demoAstro, /lang=\{tsxLanguage\} themes=\{codeThemes\} defaultColor=\{false\}/);
  assert.match(demoAstro, /lang=\{vueLanguage\} themes=\{codeThemes\} defaultColor=\{false\}/);
});

test('component demo tokens follow the active Shiki theme instead of inheriting one color', () => {
  assert.match(
    legacyCss,
    /\.sb-demo-code code,[\s\S]*?color:\s*var\(--shiki-light, var\(--sb-docs-code-text, var\(--sb-docs-text-1\)\)\);/,
  );
  assert.match(
    legacyCss,
    /:root\[data-theme='dark'\] \.sb-demo-code code,[\s\S]*?color:\s*var\(--shiki-dark, var\(--sb-docs-code-text, var\(--sb-docs-text-1\)\)\);/,
  );
  assert.doesNotMatch(legacyCss, /\.sb-demo-code code span,[\s\S]{0,180}?color:\s*inherit\s*!important;/);
});

test('requirements lists use the shared module container', () => {
  assert.match(
    legacyCss,
    /\.sl-markdown-content > h2#要求 \+ ul\s*\{[\s\S]*?border:\s*1px solid var\(--sb-docs-border\);[\s\S]*?border-radius:\s*var\(--sb-docs-module-radius\);[\s\S]*?background:\s*var\(--sb-docs-demo-code-bg\);/,
  );
});
