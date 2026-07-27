import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const legacyCss = await readFile(new URL('../legacy-docs.css', import.meta.url), 'utf8');

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

test('requirements lists use the shared module container', () => {
  assert.match(
    legacyCss,
    /\.sl-markdown-content > h2#要求 \+ ul\s*\{[\s\S]*?border:\s*1px solid var\(--sb-docs-border\);[\s\S]*?border-radius:\s*var\(--sb-docs-module-radius\);[\s\S]*?background:\s*var\(--sb-docs-demo-code-bg\);/,
  );
});
