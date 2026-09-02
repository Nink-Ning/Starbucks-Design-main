import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import test from 'node:test'

const repoRoot = new URL('../../../../', new URL('../../', import.meta.url))
const r1Zip = new URL('distribution/releases/designkit-starter-v1-r1.zip', repoRoot)
const r2Zip = new URL('distribution/releases/designkit-starter-v1-r2.zip', repoRoot)
const docsR2Zip = new URL('packages/docs/site/public/downloads/designkit-starter-v1-r2.zip', repoRoot)
const r2Release = new URL('distribution/releases/designkit-starter-v1-r2-release.json', repoRoot)
const archiveRoot = 'designkit-starter-v1/'

function unzip(args) {
  return execFileSync('unzip', args, { maxBuffer: 12 * 1024 * 1024 })
}

function archiveText(archive, member) {
  return unzip(['-p', fileURLToPath(archive), `${archiveRoot}${member}`]).toString('utf8')
}

test('R2 projection is self-contained, boundary-safe, and lifecycle-separated', async () => {
  const [r2, docs, releaseSource] = await Promise.all([
    readFile(r2Zip),
    readFile(docsR2Zip),
    readFile(r2Release, 'utf8'),
  ])
  const release = JSON.parse(releaseSource)
  const manifest = JSON.parse(archiveText(r2Zip, 'manifest.json'))
  const members = unzip(['-Z1', fileURLToPath(r2Zip)]).toString('utf8').trim().split('\n')

  assert.deepEqual(docs, r2)
  assert.equal(createHash('sha256').update(r2).digest('hex'), release.zipSha256)
  assert.equal(r2.byteLength, release.zipSize)
  assert.equal(manifest.releaseRevision, 2)
  assert.equal(manifest.releaseId, 'designkit-starter-v1-r2')
  assert.equal(manifest.status, 'internal-trial')
  assert.ok(members.includes(`${archiveRoot}references/template-usage-contract.md`))
  assert.ok(members.includes(`${archiveRoot}references/implementation-binding-contract.md`))
  assert.ok(members.includes(`${archiveRoot}references/validation/r2-validation-matrix.md`))
  assert.ok(!members.some((member) => member.includes('ProductCrud') || member.includes('r2c3')))

  const references = members.filter((member) => member.endsWith('.md'))
  for (const member of references) {
    const content = unzip(['-p', fileURLToPath(r2Zip), member]).toString('utf8')
    assert.doesNotMatch(content, /(?:skills\/starbucks-design|packages\/docs|\/Users\/|selectedBusinessExports.*required)/i, member)
  }

  const registry = archiveText(r2Zip, 'references/capability-registry.md')
  assert.match(registry, /starter\.template\.basic-list/)
  assert.match(registry, /starter\.template\.card-list/)
  assert.doesNotMatch(registry, /Starter Export.*READY/i)
  assert.match(registry, /real export|真实导出|Export/i)

  const usage = archiveText(r2Zip, 'references/template-usage-contract.md')
  assert.match(usage, /implementation baseline/i)
  assert.match(usage, /Continuous Data Region/)
  assert.match(usage, /Basic Form.*Create.*Edit/s)
  assert.match(usage, /focused read-only/i)

  const binding = archiveText(r2Zip, 'references/implementation-binding-contract.md')
  assert.match(binding, /Runtime `Checkbox`/)
  assert.match(binding, /native select\/checkbox\/dialog/i)
  assert.match(binding, /Example Specific \/ non-Starter/i)

  const validation = archiveText(r2Zip, 'references/validation/validation-contract.md')
  assert.match(validation, /selectedBusinessExports.*(?:removed|移除)/i)
  assert.match(validation, /Implementation Provenance/)
  assert.match(validation, /Visual Fidelity/)
  assert.match(validation, /frozen pre-projection drift/i)

  const checklist = archiveText(r2Zip, 'references/quality-checklist.md')
  assert.doesNotMatch(checklist, /Manifest.*selectedBusinessExports.*登记|selectedBusinessExports.*required/i)

  const r1Bytes = await readFile(r1Zip)
  assert.equal(createHash('sha256').update(r1Bytes).digest('hex'), '6287895a54ebc0828f9e8250cb05d132ff7712c38fddceb891cfb0126a7302cf')
})
