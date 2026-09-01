import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const repoRoot = path.resolve(import.meta.dirname, '../../../../../../')
const starterRoot = path.join(repoRoot, 'distribution/designkit-starter-v1')
const readStarter = (relativePath) => readFile(path.join(starterRoot, relativePath), 'utf8')

test('P1.4.7 Shell owns the viewport and keeps Side collapse visible', async () => {
  const [shellCss, shellContract] = await Promise.all([
    readStarter('assets/default-application-shell.css'),
    readStarter('references/application-shell.md'),
  ])

  assert.match(shellCss, /\.dk-shell-reference\s*\{[^}]*display:\s*flex;[^}]*height:\s*100dvh;[^}]*min-width:\s*0;[^}]*min-height:\s*0;[^}]*flex-direction:\s*column;/)
  assert.match(shellCss, /\.dk-shell-reference__top\s*\{[^}]*height:\s*54px;[^}]*[^}]*flex:\s*0 0 auto;/)
  assert.match(shellCss, /\.dk-shell-reference__body\s*\{[^}]*display:\s*flex;[^}]*height:\s*auto;[^}]*flex:\s*1 1 auto;[^}]*min-width:\s*0;[^}]*min-height:\s*0;[^}]*overflow:\s*hidden;/)
  assert.match(shellCss, /\.dk-shell-reference__side\s*\{[^}]*display:\s*flex;[^}]*width:\s*260px;[^}]*height:\s*100%;[^}]*min-width:\s*0;[^}]*min-height:\s*0;[^}]*flex:\s*0 0 260px;[^}]*flex-direction:\s*column;[^}]*overflow:\s*hidden;/)
  assert.match(shellCss, /\.sb-top-nav-demo__side-menu\.arco-menu\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*min-height:\s*0;[^}]*flex:\s*1 1 auto;/)
  assert.match(shellCss, /\.dk-shell-reference__main\[data-shell-region='main'\]\s*\{[^}]*flex:\s*1 1 auto;[^}]*min-width:\s*0;[^}]*min-height:\s*0;[^}]*height:\s*auto;[^}]*overflow:\s*auto;/)
  assert.match(shellCss, /\.dk-shell-reference__side\[data-collapsed='true'\][\s\S]*?width:\s*56px[\s\S]*?flex-basis:\s*56px/)
  assert.doesNotMatch(shellCss, /\.dk-shell-reference__(?:side|body)[^{]*\{[^}]*100vh/)
  assert.doesNotMatch(shellCss, /position:\s*fixed/)
  assert.match(shellContract, /`height: 100dvh`/)
  assert.match(shellContract, /Runtime Menu remains the Side Menu Area/)
  assert.match(shellContract, /Main uses `min-height: 0` and `overflow: auto`/)
})
