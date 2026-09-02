import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const repoRoot = new URL('../../../../', new URL('../../', import.meta.url))
const r3Zip = new URL('distribution/releases/designkit-starter-v1-r3.zip', repoRoot)
const docsR3Zip = new URL('packages/docs/site/public/downloads/designkit-starter-v1-r3.zip', repoRoot)
const r3Release = new URL('distribution/releases/designkit-starter-v1-r3-release.json', repoRoot)
const archiveRoot = 'designkit-starter-v1/'

function unzip(args) {
  return execFileSync('unzip', args, { maxBuffer: 12 * 1024 * 1024 })
}

function archiveText(member) {
  return unzip(['-p', fileURLToPath(r3Zip), `${archiveRoot}${member}`]).toString('utf8')
}

test('V1-r3 production projection is canonical, byte-synchronized, and package-complete', async () => {
  const [canonical, docs, releaseSource] = await Promise.all([
    readFile(r3Zip),
    readFile(docsR3Zip),
    readFile(r3Release, 'utf8'),
  ])
  const release = JSON.parse(releaseSource)
  const manifest = JSON.parse(archiveText('manifest.json'))
  const members = new Set(unzip(['-Z1', fileURLToPath(r3Zip)]).toString('utf8').trim().split('\n'))
  const runtimeManifest = JSON.parse(archiveText('runtime/runtime-manifest.json'))

  assert.deepEqual(docs, canonical)
  assert.equal(createHash('sha256').update(canonical).digest('hex'), 'bfa3af81fc96d82fac9c5dc45eb48183d9454691b2f5ba0c4d0878ab3ffb7d77')
  assert.equal(canonical.byteLength, 343088)
  assert.equal(release.zipSha256, 'bfa3af81fc96d82fac9c5dc45eb48183d9454691b2f5ba0c4d0878ab3ffb7d77')
  assert.equal(release.zipSize, 343088)
  assert.equal(manifest.releaseRevision, 3)
  assert.equal(manifest.releaseId, 'designkit-starter-v1-r3')
  assert.equal(manifest.status, 'internal-trial')
  assert.equal(release.status, 'internal-trial')
  assert.equal(runtimeManifest.jsSha256, 'b9bdcb4185b796a430144841de030959c5730c2a912cc58557134bca3448bddd')
  assert.equal(runtimeManifest.cssSha256, 'f96f234dfb0768ffdcca74b7764ecc24a926fd078a5db74255e8d9780e9564a7')

  for (const member of [
    'patterns/default-application-shell.html',
    'patterns/basic-list.html',
    'patterns/card-list.html',
    'patterns/step-form.html',
    'patterns/drawer-form.html',
  ]) {
    assert.ok(members.has(`${archiveRoot}${member}`), `${member} is missing from the production archive`)
  }

  const packageText = [...members]
    .filter((member) => member.endsWith('.md') || member.endsWith('.html') || member.endsWith('.json'))
    .map((member) => unzip(['-p', fileURLToPath(r3Zip), member]).toString('utf8'))
    .join('\n')
  assert.doesNotMatch(packageText, /(?:\/Users\/|\.codex-artifacts)/i)
  assert.doesNotMatch(packageText, /designkit-starter-v1-r2/)
})
