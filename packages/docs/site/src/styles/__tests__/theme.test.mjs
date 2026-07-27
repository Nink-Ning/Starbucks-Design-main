import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const themeCss = await readFile(new URL('../theme.css', import.meta.url), 'utf8');
const lightTheme = themeCss.match(
  /:root\[data-theme='light'\],[\s\S]*?\[data-theme='light'\] ::backdrop\s*\{([\s\S]*?)\n\}/,
)?.[1];

test('light theme uses a dark foreground for Starlight headings', () => {
  assert.ok(lightTheme, 'expected to find the light-theme token block');
  assert.match(
    lightTheme,
    /--sl-color-white:\s*var\(--color-text-primary,\s*rgb\(26,\s*26,\s*26\)\);/,
  );
  assert.doesNotMatch(lightTheme, /--sl-color-white:\s*var\(--bg-color-container/);
});
