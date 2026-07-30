import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const legacyCss = await readFile(new URL('../legacy-docs.css', import.meta.url), 'utf8');

test('demo code toggle moves below the expanded code', () => {
  assert.match(
    legacyCss,
    /\.sb-demo-code\s*\{[\s\S]*?position:\s*relative;/,
  );
  assert.match(
    legacyCss,
    /\.sb-demo-code summary\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?top:\s*-32px;[\s\S]*?bottom:\s*auto;/,
  );
  assert.match(
    legacyCss,
    /\.sb-demo-code\[open\] summary\s*\{[\s\S]*?position:\s*static;[\s\S]*?order:\s*2;[\s\S]*?align-self:\s*flex-end;/,
  );
  assert.match(
    legacyCss,
    /\.sb-demo-code\[open\]\s*\{[\s\S]*?display:\s*flex;[\s\S]*?flex-direction:\s*column;/,
  );
});
