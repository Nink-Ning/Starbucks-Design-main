import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../../../../../');
const interactionPattern = fs.readFileSync(
  path.join(repo, 'skills/starbucks-design/references/decisions/interaction-pattern.md'),
  'utf8',
);
const validationContract = fs.readFileSync(
  path.join(repo, 'skills/starbucks-design/references/validation/validation-contract.md'),
  'utf8',
);

test('destructive actions separate persistent visual treatment from behavior', () => {
  assert.match(interactionPattern, /Destructive visual policy/);
  assert.match(interactionPattern, /neutral\/default\/secondary treatment/);
  assert.match(interactionPattern, /explicit target.*Cancel.*Confirm.*result feedback/s);
  assert.match(interactionPattern, /error\/status/);
  assert.match(validationContract, /Destructive action visual policy/);
  assert.match(validationContract, /not inferred from the action verb alone/);
  assert.match(validationContract, /RUNTIME COMPONENT HIERARCHY GAP/);
});
