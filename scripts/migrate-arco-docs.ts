/**
 * Migrate Arco Design component docs from locally cloned repos.
 *
 * React: /tmp/arco-design-react/components/<Name>/
 * Vue:   /tmp/arco-design-vue/packages/web-vue/components/<name>/
 *
 * Usage: npx tsx scripts/migrate-arco-docs.ts
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')

const CATEGORY_MAP: Record<string, string> = {
  '通用': 'general',
  '布局': 'layout',
  '数据展示': 'data-display',
  '数据输入': 'data-entry',
  '输入': 'data-entry',
  '反馈': 'feedback',
  '导航': 'navigation',
  '其他': 'other',
}

const PKG_REPLACEMENTS: [RegExp, string][] = [
  [/'@arco-design\/web-react\/icon'/g, "'@sbux/starbucks-design-react/icon'"],
  [/"@arco-design\/web-react\/icon"/g, '"@sbux/starbucks-design-react/icon"'],
  [/'@arco-design\/web-react'/g, "'@sbux/starbucks-design-react'"],
  [/"@arco-design\/web-react"/g, '"@sbux/starbucks-design-react"'],
  [/'@arco-design\/web-vue'/g, "'@sbux/starbucks-design-vue'"],
  [/"@arco-design\/web-vue"/g, '"@sbux/starbucks-design-vue"'],
]

// ── Types ──

interface DemoInfo {
  order: number
  title: string
  description: string
  code: string
}

// ── React parsers ──

function parseReactCategory(readme: string): string {
  const m = readme.match(/组件\s*\/\s*(.+)/)
  return m ? m[1].trim() : ''
}

function parseReactTitle(readme: string): string {
  const m = readme.match(/^#\s+(.+)/m)
  return m ? m[1].trim() : ''
}

function parseReactDescription(readme: string): string {
  const titleM = readme.match(/^#\s+.+$/m)
  if (!titleM || titleM.index === undefined) return ''
  const afterTitle = readme.slice(titleM.index + titleM[0].length)
  const contentIdx = afterTitle.indexOf('%%Content%%')
  const endIdx = contentIdx === -1 ? afterTitle.length : contentIdx
  const between = afterTitle.slice(0, endIdx)
  for (const line of between.split('\n')) {
    const t = line.trim()
    if (t && !t.startsWith('`````') && !t.startsWith('#')) return t
  }
  return ''
}

function getApiSection(readme: string): string {
  const apiIdx = readme.indexOf('## API')
  if (apiIdx === -1) return ''
  return readme.slice(apiIdx)
}

/** React demo: --- frontmatter with order + title, ## zh-CN section, ```js/tsx code */
function parseReactDemo(content: string): DemoInfo {
  const orderM = content.match(/order:\s*(\d+)/)
  const order = orderM ? parseInt(orderM[1]) : 99

  const zhcnTitleM = content.match(/zh-CN:\s*(.+)/)
  const title = zhcnTitleM ? zhcnTitleM[1].trim() : ''

  const zhcnIdx = content.indexOf('## zh-CN')
  const enIdx = content.indexOf('## en-US', zhcnIdx)
  let description = ''
  if (zhcnIdx !== -1) {
    const descStart = zhcnIdx + 9
    const descEnd = enIdx > zhcnIdx ? enIdx : content.indexOf('```', zhcnIdx)
    if (descEnd > descStart) description = content.slice(descStart, descEnd).trim()
  }

  let code = ''
  const codeBlocks = [...content.matchAll(/```(jsx?|tsx?)\n([\s\S]*?)```/g)]
  if (codeBlocks.length > 0) {
    code = codeBlocks[codeBlocks.length - 1][2].trim()
  }

  return { order, title, description, code }
}

// ── Vue parsers ──

function parseVueCategory(readme: string): string {
  const m = readme.match(/category:\s*(.+)/)
  return m ? m[1].trim() : ''
}

function parseVueTitle(readme: string): string {
  const m = readme.match(/title:\s*(.+)/)
  return m ? m[1].trim() : ''
}

function parseVueDescription(readme: string): string {
  const m = readme.match(/description:\s*(.+)/)
  return m ? m[1].trim() : ''
}

/** Vue demo: ```yaml title block, ## zh-CN, --- separator, ## en-US, ---, ```vue code */
function parseVueDemo(content: string): DemoInfo {
  let order = 99
  let title = ''

  // Try TOML frontmatter first
  const fmMatch = content.match(/^---\n([\s\S]*?)---/)
  if (fmMatch) {
    const fm = fmMatch[1]
    const orderM = fm.match(/order:\s*(\d+)/)
    if (orderM) order = parseInt(orderM[1])
    const titleM = fm.match(/zh-CN:\s*(.+)/)
    if (titleM) title = titleM[1].trim()
  }

  // Parse yaml code block title
  if (!title) {
    const yamlMatch = content.match(/```yaml\n([\s\S]*?)```/)
    if (yamlMatch) {
      const titleM = yamlMatch[1].match(/zh-CN:\s*(.+)/)
      if (titleM) title = titleM[1].trim()
    }
  }

  // Fallback
  if (!title) {
    const zhcnM = content.match(/zh-CN:\s*(.+)/)
    if (zhcnM) title = zhcnM[1].trim()
  }

  // Find ## zh-CN description
  const zhcnIdx = content.indexOf('## zh-CN')
  let description = ''
  if (zhcnIdx !== -1) {
    const descStart = zhcnIdx + 9
    // End at "---\n" or "## en-US"
    const sepMatch = content.slice(descStart).match(/\n---\n/)
    const enMatch = content.slice(descStart).match(/\n## en-US/)
    let descEnd = content.length
    if (sepMatch && sepMatch.index !== undefined) descEnd = descStart + sepMatch.index
    if (enMatch && enMatch.index !== undefined) descEnd = Math.min(descEnd, descStart + enMatch.index)
    if (descEnd > descStart) description = content.slice(descStart, descEnd).trim()
  }

  // Extract last ```vue code block
  let code = ''
  const allBlocks: { lang: string; code: string; start: number }[] = []
  for (const m of content.matchAll(/```(\w+)\n([\s\S]*?)```/g)) {
    allBlocks.push({ lang: m[1], code: m[2].trim(), start: m.index! })
  }
  allBlocks.sort((a, b) => a.start - b.start)
  const vueBlocks = allBlocks.filter(b => b.lang === 'vue')
  if (vueBlocks.length > 0) {
    code = vueBlocks[vueBlocks.length - 1].code
  } else {
    const nonYaml = allBlocks.filter(b => b.lang !== 'yaml')
    if (nonYaml.length > 0) code = nonYaml[nonYaml.length - 1].code
  }

  return { order, title, description, code }
}

/** Replace Arco Vue component prefix: a-button → Button, a-space → Space, etc. */
function stripAVuePrefix(code: string): string {
  // Replace <a-xxx and </a-xxx tags
  return code
    .replace(/<a-([a-z][\w-]*)/g, (_, name) => {
      // PascalCase the component name: a-button → Button
      const pascal = name.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())
        .replace(/^./, c => c.toUpperCase())
      return `<${pascal}`
    })
    .replace(/<\/a-([a-z][\w-]*)/g, (_, name) => {
      const pascal = name.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())
        .replace(/^./, c => c.toUpperCase())
      return `</${pascal}`
    })
}

// ── Doc builder ──

/** Extract template content between <template> and </template>, dedented */
function extractTemplate(code: string): string {
  const m = code.match(/<template>([\s\S]*?)<\/template>/)
  if (!m) return ''
  // Strip leading whitespace from each line to avoid markdown indented code block issues
  return m[1].split('\n').map(l => l.trimStart()).join('\n').trim()
}

function buildDoc(
  title: string,
  description: string,
  demos: DemoInfo[],
  apiSection: string,
  isReact: boolean
): string {
  const lines: string[] = []
  lines.push('---')
  lines.push('sidebar_position: 1')
  lines.push('---')
  lines.push('')
  lines.push(`# ${title}`)
  lines.push('')
  if (description) {
    lines.push(description)
    lines.push('')
  }

  demos.sort((a, b) => a.order - b.order)

  for (const demo of demos) {
    if (demo.title) {
      lines.push(`## ${demo.title}`)
      lines.push('')
    }
    if (demo.description) {
      lines.push(demo.description)
      lines.push('')
    }
    if (demo.code) {
      let code = demo.code
      for (const [re, replacement] of PKG_REPLACEMENTS) {
        code = code.replace(re, replacement)
      }
      if (!isReact) {
        code = stripAVuePrefix(code)
      }

      if (isReact) {
        lines.push('```jsx live')
        lines.push(code)
        lines.push('```')
      } else {
        lines.push('```vue')
        lines.push(code)
        lines.push('```')
      }
      lines.push('')
    }
  }

  if (apiSection) {
    lines.push(apiSection)
    lines.push('')
  }

  let result = lines.join('\n')

  // Strip all markdown links [text](url) → text outside code blocks
  // (cross-component/faq links won't resolve in our doc structure)
  const codeBlockRegex = /```[\s\S]*?```/g
  const codeBlocks: string[] = []
  result = result.replace(codeBlockRegex, (match) => {
    codeBlocks.push(match)
    return `_CBP_${codeBlocks.length - 1}_`
  })
  result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // For React/Docusaurus: also escape < > and { } in non-code text for MDX compatibility
  if (isReact) {
    result = result.replace(/</g, '&lt;').replace(/{/g, '&#123;')
  }

  // Restore code blocks
  result = result.replace(/_CBP_(\d+)_/g, (_, i) => codeBlocks[parseInt(i)])

  return result
}

// ── Processors ──

function processReactComponent(name: string, compDir: string): boolean {
  const readmePath = join(compDir, 'README.zh-CN.md')
  if (!existsSync(readmePath)) {
    console.warn(`  ⚠ No README.zh-CN.md for ${name}, skipping`)
    return false
  }

  const readme = readFileSync(readmePath, 'utf-8')
  const category = parseReactCategory(readme)
  const title = parseReactTitle(readme)
  const description = parseReactDescription(readme)
  const apiSection = getApiSection(readme)

  if (!category || !title) {
    console.warn(`  ⚠ Missing category (${category}) or title (${title}) for ${name}`)
    return false
  }

  const dirName = CATEGORY_MAP[category]
  if (!dirName) {
    console.warn(`  ⚠ Unknown category: "${category}" for ${name}`)
    return false
  }

  const demoDir = join(compDir, '__demo__')
  const demos: DemoInfo[] = []
  if (existsSync(demoDir)) {
    for (const file of readdirSync(demoDir).filter(f => f.endsWith('.md'))) {
      try {
        const content = readFileSync(join(demoDir, file), 'utf-8')
        demos.push(parseReactDemo(content))
      } catch { console.warn(`  ⚠ Failed to parse demo: ${file}`) }
    }
  }

  const doc = buildDoc(title, description, demos, apiSection, true)

  const targetDir = join(ROOT, 'packages/docs/react/docs/components', dirName)
  mkdirSync(targetDir, { recursive: true })
  const fileName = name.charAt(0).toLowerCase() + name.slice(1).replace(/[A-Z]/g, c => '-' + c.toLowerCase())
  writeFileSync(join(targetDir, `${fileName}.md`), doc, 'utf-8')

  console.log(`  ✅ ${name} → ${dirName}/${fileName}.md (${demos.length} demos)`)
  return true
}

function processVueComponent(name: string, compDir: string): boolean {
  const readmePath = join(compDir, 'README.zh-CN.md')
  if (!existsSync(readmePath)) {
    console.warn(`  ⚠ No README.zh-CN.md for ${name}, skipping`)
    return false
  }

  const readme = readFileSync(readmePath, 'utf-8')
  const category = parseVueCategory(readme)
  const title = parseVueTitle(readme)
  const description = parseVueDescription(readme)
  const apiSection = getApiSection(readme)

  if (!category || !title) {
    console.warn(`  ⚠ Missing category or title for Vue ${name}`)
    return false
  }

  const dirName = CATEGORY_MAP[category]
  if (!dirName) {
    console.warn(`  ⚠ Unknown Vue category: "${category}" for ${name}`)
    return false
  }

  const demoDir = join(compDir, '__demo__')
  const demos: DemoInfo[] = []
  if (existsSync(demoDir)) {
    for (const file of readdirSync(demoDir).filter(f => f.endsWith('.md'))) {
      try {
        const content = readFileSync(join(demoDir, file), 'utf-8')
        demos.push(parseVueDemo(content))
      } catch { /* skip */ }
    }
  }

  const doc = buildDoc(title, description, demos, apiSection, false)

  const targetDir = join(ROOT, 'packages/docs/vue/components', dirName)
  mkdirSync(targetDir, { recursive: true })
  writeFileSync(join(targetDir, `${name}.md`), doc, 'utf-8')

  console.log(`  ✅ ${name} → ${dirName}/${name}.md (${demos.length} demos)`)
  return true
}

// ── Main ──

const SKIP_DIRS = new Set(['_class', '_hooks', '_util', 'locale', 'style', 'icon-component', '_components', '_utils', 'arco-vue.ts'])

function main() {
  // ── React ──
  const reactBase = '/tmp/arco-design-react/components'
  if (!existsSync(reactBase)) {
    console.error('React repo not found. Clone: git clone --depth 1 https://github.com/arco-design/arco-design.git /tmp/arco-design-react')
    process.exit(1)
  }

  const reactDirs = readdirSync(reactBase, { withFileTypes: true })
    .filter(d => d.isDirectory() && !SKIP_DIRS.has(d.name))
  console.log(`📦 Processing ${reactDirs.length} React components...\n`)
  let reactOk = 0, reactFail = 0
  for (const dir of reactDirs) {
    if (processReactComponent(dir.name, join(reactBase, dir.name))) reactOk++; else reactFail++
  }

  // ── Vue ──
  const vueBase = '/tmp/arco-design-vue/packages/web-vue/components'
  let vueOk = 0, vueFail = 0

  if (existsSync(vueBase)) {
    const vueDirs = readdirSync(vueBase, { withFileTypes: true })
      .filter(d => d.isDirectory() && !SKIP_DIRS.has(d.name))
    console.log(`\n📦 Processing ${vueDirs.length} Vue components...\n`)
    for (const dir of vueDirs) {
      if (processVueComponent(dir.name, join(vueBase, dir.name))) vueOk++; else vueFail++
    }
  } else {
    console.error('\nVue repo not found. Clone: git clone --depth 1 https://github.com/arco-design/arco-design-vue.git /tmp/arco-design-vue')
  }

  // ── Summary ──
  console.log('\n' + '='.repeat(50))
  console.log(`React: ${reactOk} OK, ${reactFail} failed (of ${reactDirs.length})`)
  console.log(`Vue:   ${vueOk} OK, ${vueFail} failed`)
  console.log('='.repeat(50))
}

main()
