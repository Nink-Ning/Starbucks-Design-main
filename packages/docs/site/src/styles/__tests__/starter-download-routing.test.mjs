import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const sourceRoot = new URL('../../', import.meta.url)
const siteRoot = new URL('../../../', import.meta.url)

async function read(relativePath) {
  return readFile(new URL(relativePath, sourceRoot), 'utf8')
}

async function readSite(relativePath) {
  return readFile(new URL(relativePath, siteRoot))
}

test('generic Starter download surfaces target the latest V1-r2 artifact', async () => {
  const [landing, renderer, overview, starterOverview, releaseHistory, releaseTable] = await Promise.all([
    read('landing/designkit-landing.html'),
    read('landing/renderLandingPage.ts'),
    read('content/docs/guide/ai-skills-guide.mdx'),
    read('content/docs/guide/ai-skills-starters.mdx'),
    read('content/docs/guide/ai-skills-releases.mdx'),
    read('components/StarterReleaseTable.tsx'),
  ])

  for (const source of [landing, renderer, starterOverview, releaseHistory, releaseTable]) {
    assert.match(source, /designkit-starter-v1-r2\.zip/)
  }
  assert.doesNotMatch(landing, /designkit-starter-v1-r1\.zip/)
  assert.doesNotMatch(renderer, /designkit-starter-v1-r1\.zip/)
  assert.match(overview, /href="\.\.\/ai-skills-releases\/">查看产品经理启动包<\/a>/)
  assert.doesNotMatch(overview, /downloads\/designkit-starter-v1-r2\.zip/)
  assert.match(releaseHistory, /## 当前版本[\s\S]*?designkit-starter-v1-r2\.zip/)
  assert.match(releaseHistory, /### DesignKit Starter V1-r2[\s\S]*?designkit-starter-v1-r2\.zip/)
  assert.match(releaseHistory, /### DesignKit Starter V1-r1[\s\S]*?designkit-starter-v1-r1\.zip/)
  assert.ok(releaseHistory.indexOf('### DesignKit Starter V1-r2') < releaseHistory.indexOf('### DesignKit Starter V1-r1'))
})

test('historical V1-r1 release entry keeps its exact frozen artifact', async () => {
  const [releaseHistory, r1Zip, r2Zip] = await Promise.all([
    read('content/docs/guide/ai-skills-releases.mdx'),
    readSite('public/downloads/designkit-starter-v1-r1.zip'),
    readSite('public/downloads/designkit-starter-v1-r2.zip'),
  ])

  assert.match(releaseHistory, /### DesignKit Starter V1-r1[\s\S]*?href="\.\.\/\.\.\/downloads\/designkit-starter-v1-r1\.zip" download="designkit-starter-v1-r1\.zip"/)
  assert.match(releaseHistory, /### DesignKit Starter V1-r2[\s\S]*?href="\.\.\/\.\.\/downloads\/designkit-starter-v1-r2\.zip" download="designkit-starter-v1-r2\.zip"/)
  assert.notEqual(r1Zip.length, 0)
  assert.notEqual(r2Zip.length, 0)
})
