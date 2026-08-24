#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(packageRoot, '../..')
const runtimeDir = resolve(repoRoot, 'distribution/designkit-starter-v1/runtime')
const buildConfig = resolve(packageRoot, 'vite.config.starter-runtime.ts')
const temporaryBuildDir = mkdtempSync(join(tmpdir(), 'designkit-starter-runtime-'))

const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8'))
const reactVersion = JSON.parse(
  readFileSync(resolve(packageRoot, 'node_modules/react/package.json'), 'utf8'),
).version
const reactDomVersion = JSON.parse(
  readFileSync(resolve(packageRoot, 'node_modules/react-dom/package.json'), 'utf8'),
).version
const arcoVersion = JSON.parse(
  readFileSync(resolve(packageRoot, 'node_modules/@arco-design/web-react/package.json'), 'utf8'),
).version

function runGit(args) {
  const result = spawnSync('git', args, { cwd: repoRoot, encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(result.stderr || `git ${args.join(' ')} failed`)
  }
  return result.stdout.trim()
}

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex')
}

function fail(message) {
  throw new Error(`[starter-runtime] ${message}`)
}

// Capture provenance before the build writes generated Runtime assets.
// Release builds must start from a clean worktree so generated files do not
// incorrectly mark the source workspace as dirty.
const sourceCommit = runGit(['rev-parse', 'HEAD'])
const workspaceDirty = Boolean(runGit(['status', '--porcelain', '--untracked-files=all']))

try {
  const buildResult = spawnSync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['exec', 'vite', 'build', '--config', buildConfig],
    {
      cwd: packageRoot,
      env: { ...process.env, STARTER_RUNTIME_TEMP: temporaryBuildDir },
      stdio: 'inherit',
    },
  )

  if (buildResult.status !== 0) {
    fail(`Vite build failed with exit code ${buildResult.status ?? 'unknown'}`)
  }

  const jsPath = join(temporaryBuildDir, 'starbucks-react.umd.js')
  const cssPath = join(temporaryBuildDir, 'starbucks-react.css')
  if (!existsSync(jsPath) || !existsSync(cssPath)) {
    fail('Expected starbucks-react.umd.js and starbucks-react.css were not emitted')
  }

  const js = readFileSync(jsPath, 'utf8')
  const css = readFileSync(cssPath, 'utf8')

  if (!js.trim()) fail('UMD JS is empty')
  if (!css.trim()) fail('CSS is empty')

  const requiredCssMarkers = [
    '--color-primary',
    'rgb(0, 117, 74)',
    '.arco-btn',
    'font-family:var(--font-family)',
    '.arco-input',
    '.arco-select',
    '.arco-table',
    '.arco-pagination',
    '.arco-tag',
    '.arco-empty',
    '.arco-message',
    '.sbux-filter-bar',
    '.sbux-tag-group-management',
    '.sbux-table-toolbar',
    '.sbux-table-row-actions',
    '.sbux-pro-form-page-layout',
    '.sbux-pro-form-grid',
    '.sbux-pro-form-grid-item',
    '.sbux-pro-form-control-area',
    '.sbux-pro-form-actions',
    '.sbux-pro-detail-page-layout',
    '.sbux-pro-detail-section',
    '.sbux-pro-detail-descriptions',
  ]
  const missingCssMarkers = requiredCssMarkers.filter((marker) => !css.includes(marker))
  if (missingCssMarkers.length) {
    fail(`CSS is missing required markers: ${missingCssMarkers.join(', ')}`)
  }

  const embeddedCssMarkers = [
    'document.createTextNode(',
    '--color-primary',
    'font-family:var(--font-family)',
  ]
  const embeddedCssMarkersFound = embeddedCssMarkers.filter((marker) => js.includes(marker))
  if (embeddedCssMarkersFound.length) {
    fail(`UMD JS contains CSS markers: ${embeddedCssMarkersFound.join(', ')}`)
  }
  if (js.includes('process.env.NODE_ENV')) {
    fail('UMD JS still contains process.env.NODE_ENV and is not browser-safe')
  }

  const selectedProExports = [
    'FormPageLayout',
    'FormGrid',
    'FormGridItem',
    'FormControlArea',
    'FormActions',
    'DetailPageLayout',
    'DetailSection',
    'DetailDescriptions',
  ]
  const missingProExports = selectedProExports.filter((exportName) => !js.includes(exportName))
  if (missingProExports.length) {
    fail(`UMD JS is missing selected Pro exports: ${missingProExports.join(', ')}`)
  }

  const selectedBusinessExports = ['TableToolbar']
  const missingBusinessExports = selectedBusinessExports.filter((exportName) => !js.includes(exportName))
  if (missingBusinessExports.length) {
    fail(`UMD JS is missing selected business exports: ${missingBusinessExports.join(', ')}`)
  }

  const missingExternalMarkers = ['React', 'ReactDOM', 'arco', 'arcoicon'].filter(
    (marker) => !js.includes(marker),
  )
  if (missingExternalMarkers.length) {
    fail(`UMD JS is missing external global markers: ${missingExternalMarkers.join(', ')}`)
  }

  mkdirSync(runtimeDir, { recursive: true })
  const runtimeJs = resolve(runtimeDir, 'starbucks-react.umd.js')
  const runtimeCss = resolve(runtimeDir, 'starbucks-react.css')
  copyFileSync(jsPath, runtimeJs)
  copyFileSync(cssPath, runtimeCss)

  const buildTime = new Date().toISOString()
  const manifest = {
    packageName: packageJson.name,
    packageVersion: packageJson.version,
    sourceCommit,
    workspaceDirty,
    buildTime,
    reactVersion,
    reactDomVersion,
    arcoVersion,
    jsFile: 'starbucks-react.umd.js',
    jsSize: statSync(runtimeJs).size,
    jsSha256: sha256(runtimeJs),
    cssFile: 'starbucks-react.css',
    cssSize: statSync(runtimeCss).size,
    cssSha256: sha256(runtimeCss),
    cssSources: [
      'packages/starbucks-design-react/src/starter-runtime.ts',
      'packages/starbucks-design-react/src/components.less',
      'packages/starbucks-design-react/src/theme.css',
      'packages/starbucks-design-react/src/figma-overrides.less',
      'packages/starbucks-design-react/src/overrides/_index.less',
      'packages/starbucks-design-react/src/pro/form-layout/style.less',
      'packages/starbucks-design-react/src/pro/detail-layout/style.less',
      'packages/starbucks-design-react/src/pro/style/variables.less',
      '@arco-design/web-react/es/style/theme/global.less',
      '@arco-design/web-react/es/style/index.less',
      '@arco-design/web-react/es/*/style/index.less',
    ],
    buildConfig: 'packages/starbucks-design-react/vite.config.starter-runtime.ts',
    selectedBusinessExports,
    selectedProExports,
    verificationStatus: 'STATIC_CONFIRMED_BROWSER_PENDING',
    verificationNotes: 'TableToolbar and selected Pro Form/Basic Detail Layout exports are statically confirmed; browser smoke for all Golden Examples is pending.',
  }
  writeFileSync(resolve(runtimeDir, 'runtime-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)

  console.log(JSON.stringify(manifest, null, 2))
} finally {
  rmSync(temporaryBuildDir, { recursive: true, force: true })
}
