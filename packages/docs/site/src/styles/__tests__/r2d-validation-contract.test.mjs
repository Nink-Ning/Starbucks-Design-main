import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const sourceRoot = new URL('../../../../../../skills/starbucks-design/', import.meta.url)

const readSource = (relativePath) => readFile(new URL(relativePath, sourceRoot), 'utf8')

test('R2 validation contract keeps fidelity dimensions independent', async () => {
  const contract = await readSource('references/validation/validation-contract.md')

  for (const dimension of [
    'Capability Selection',
    'Template Selection',
    'Template Usage',
    'Implementation Provenance',
    'Component Fidelity',
    'Brand Fidelity',
    'Theme Fidelity',
    'Structural Anatomy Fidelity',
    'Geometry / Composition Fidelity',
    'Interaction Fidelity',
    'State Coverage',
    'Responsive Fidelity',
    'Accessibility',
    'Visual Fidelity',
    'Release / Package Integrity',
  ]) {
    assert.match(contract, new RegExp(`\\| ${dimension.replaceAll('/', '\\/')} \\|`))
  }

  assert.match(contract, /一个维度的 `PASS` 不得自动升级另一个维度/)
  assert.match(contract, /selectedBusinessExports.*removed as a validation requirement/)
  assert.match(contract, /validation fixture 即可/)
})

test('R2 evidence model requires manual review for Visual Fidelity', async () => {
  const evidence = await readSource('references/validation/evidence-model.md')

  assert.match(evidence, /Visual Fidelity.*Manual Review notes/s)
  assert.match(evidence, /没有人工签收时不得从 Geometry、Theme 或 Structural 结果推导 Visual `PASS`/)
  assert.match(evidence, /State Coverage.*deterministic fixture evidence/s)
  assert.match(evidence, /证据源冲突时使用 `CONFLICTED`/)
})
