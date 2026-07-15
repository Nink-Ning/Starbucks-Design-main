import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// All known icon components from @arco-design/web-vue (starts with "Icon")
const ICON_PATTERN = /^Icon[A-Z]/

// Components that are used as function calls (Message.info, Notification.success, etc.)
const FUNCTION_COMPONENTS = new Set(['Message', 'Notification', 'Modal'])

function fixImports(filePath: string): boolean {
  const content = readFileSync(filePath, 'utf-8')
  let modified = false

  // Find all import blocks from @sbux/starbucks-design-vue
  // Matches both:
  //   import { X } from '@sbux/starbucks-design-vue';
  //   import { X, Y } from '@sbux/starbucks-design-vue';
  //   import {
  //     X,
  //     Y,
  //   } from '@sbux/starbucks-design-vue';

  const sbuxImportRegex = /import\s*\{([^}]*)\}\s*from\s*['"]@sbux\/starbucks-design-vue['"];?/gs
  let result = content

  let match
  while ((match = sbuxImportRegex.exec(content)) !== null) {
    const fullMatch = match[0]
    const specifiers = match[1]
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const icons = specifiers.filter(s => ICON_PATTERN.test(s))
    const functions = specifiers.filter(s => FUNCTION_COMPONENTS.has(s))
    const others = specifiers.filter(s => !ICON_PATTERN.test(s) && !FUNCTION_COMPONENTS.has(s))

    // Build replacement imports
    const replacements: string[] = []

    // Icons → @arco-design/web-vue/es/icon
    if (icons.length > 0) {
      if (icons.length === 1) {
        replacements.push(`import { ${icons[0]} } from '@arco-design/web-vue/es/icon';`)
      } else {
        replacements.push(`import {\n  ${icons.join(',\n  ')},\n} from '@arco-design/web-vue/es/icon';`)
      }
    }

    // Functions (Message, Notification, Modal) → keep with arco web-vue
    if (functions.length > 0) {
      if (functions.length === 1) {
        replacements.push(`import { ${functions[0]} } from '@arco-design/web-vue';`)
      } else {
        replacements.push(`import {\n  ${functions.join(',\n  ')},\n} from '@arco-design/web-vue';`)
      }
    }

    // Others — globally registered, remove entirely (don't add replacement)

    result = result.replace(fullMatch, replacements.join('\n'))
    modified = true

    if (others.length > 0) {
      console.log(`  ℹ ${filePath.split('/').pop()}: removed ${others.join(', ')} (globally registered)`)
    }
  }

  if (modified) {
    writeFileSync(filePath, result, 'utf-8')
  }
  return modified
}

function main() {
  const COMPONENTS_DIR = join(__dirname, '..', 'components')
  let total = 0

  function walk(dir: string) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.name.endsWith('.vue')) {
        if (fixImports(fullPath)) total++
      }
    }
  }

  walk(COMPONENTS_DIR)
  console.log(`\n✅ Fixed imports in ${total} files.`)
}

main()
