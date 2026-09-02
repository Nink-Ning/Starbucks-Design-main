import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import test from 'node:test'

const repoRoot = new URL('../../../../', new URL('../../', import.meta.url))
const frozenR1Zip = new URL('distribution/releases/designkit-starter-v1-r1.zip', repoRoot)
const docsFrozenR1Zip = new URL('packages/docs/site/public/downloads/designkit-starter-v1-r1.zip', repoRoot)
const canonicalZip = new URL('distribution/releases/designkit-starter-v1.zip', repoRoot)
const docsZip = new URL('packages/docs/site/public/downloads/designkit-starter-v1.zip', repoRoot)
const releaseFile = new URL('distribution/releases/designkit-starter-v1-release.json', repoRoot)
const archiveRoot = 'designkit-starter-v1/'
const goldenExamples = ['list.html', 'multi-select-card-list.html', 'form.html', 'detail.html']

function sha256(content) {
  return createHash('sha256').update(content).digest('hex')
}

function unzip(args) {
  return execFileSync('unzip', args, { maxBuffer: 8 * 1024 * 1024 })
}

test('frozen R1 archives remain synchronized and self-describing', async () => {
  const [canonical, docs] = await Promise.all([
    readFile(frozenR1Zip),
    readFile(docsFrozenR1Zip),
  ])
  const manifest = JSON.parse(unzip(['-p', fileURLToPath(frozenR1Zip), `${archiveRoot}manifest.json`]).toString('utf8'))

  assert.deepEqual(docs, canonical)
  assert.equal(sha256(canonical), '6287895a54ebc0828f9e8250cb05d132ff7712c38fddceb891cfb0126a7302cf')
  assert.equal(manifest.releaseRevision, 1)
  assert.equal(manifest.releaseId, 'designkit-starter-v1-r1')
  assert.equal(manifest.status, 'internal-trial')
})

test('R2-preparation archive is lifecycle-separated from frozen R1', async () => {
  const [canonical, docs, releaseSource] = await Promise.all([
    readFile(canonicalZip),
    readFile(docsZip),
    readFile(releaseFile, 'utf8'),
  ])
  const release = JSON.parse(releaseSource)
  const archiveManifest = JSON.parse(unzip(['-p', fileURLToPath(canonicalZip), `${archiveRoot}manifest.json`]).toString('utf8'))

  assert.deepEqual(docs, canonical)
  assert.equal(canonical.byteLength, release.zipSize)
  assert.equal(sha256(canonical), release.zipSha256)
  assert.equal(release.status, 'internal-trial')
  assert.equal(archiveManifest.releaseRevision, 2)
  assert.equal(archiveManifest.releaseId, 'designkit-starter-v1-r2')
})

test('frozen R1 archive contains all Golden examples and local runtime assets', () => {
  const archivePath = fileURLToPath(frozenR1Zip)
  const members = new Set(
    unzip(['-Z1', archivePath])
      .toString('utf8')
      .trim()
      .split('\n')
  )

  for (const example of goldenExamples) {
    const entry = `${archiveRoot}examples/${example}`
    assert.ok(members.has(entry), `${example} is missing from the frozen R1 archive`)

    const html = unzip(['-p', archivePath, entry]).toString('utf8')
    const localReferences = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
      .map((match) => match[1])
      .filter((reference) => !/^(?:https?:|data:|#)/.test(reference))

    assert.ok(localReferences.length > 0, `${example} has no local runtime references`)
    for (const reference of localReferences) {
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(entry), reference))
      assert.ok(members.has(resolved), `${example} references missing archive member ${resolved}`)
    }
  }
})
