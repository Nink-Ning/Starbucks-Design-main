// ARCHIVE NOTE: 旧站(packages/docs/react、packages/docs/vue)已于 Task 13 删除,
// 本脚本无法再次运行(依赖的源目录已不存在)。migration-map.json 仍作为后续批量
// 迁移的输入保留;如需重跑本脚本,从最后一次包含旧站的提交
// ce368c7bf8619adf79d027a527b5043a3164bc4c 找回源文件。
import { readdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const REACT_DOCS = join(ROOT, 'packages/docs/react/docs/components');
const VUE_DOCS = join(ROOT, 'packages/docs/vue/components');

// 归一化:两站分歧的裁决表(slug → 归属分类;别名合并)
const CATEGORY_OVERRIDE = {
  avatar: 'data-display',      // react 站 general/data-display 重复,归 data-display
  tabs: 'data-display',        // react 站 data-display/navigation 重复,归 data-display
  'config-provider': 'other',  // react: other / vue: general,归 other
  watermark: 'feedback',       // react: feedback / vue: other,归 feedback
};
const SLUG_ALIAS = { mention: 'mentions' }; // vue 的 mention 并入 mentions 页

function scan(dir) {
  const out = {}; // slug → { category, file }
  for (const cat of readdirSync(dir)) {
    const catDir = join(dir, cat);
    for (const f of readdirSync(catDir)) {
      if (!f.endsWith('.md') || f === 'index.md') continue;
      let slug = f.replace(/\.md$/, '');
      slug = SLUG_ALIAS[slug] ?? slug;
      const category = CATEGORY_OVERRIDE[slug] ?? cat;
      // 重复条目(avatar/tabs):始终以裁决分类所在目录下的那份为准,与 readdirSync
      // 的遍历顺序无关——cat === category 时强制覆盖,否则仅在首次出现时暂填。
      if (!out[slug] || cat === category) out[slug] = { category, file: join(catDir, f) };
    }
  }
  return out;
}

const react = scan(REACT_DOCS);
const vue = scan(VUE_DOCS);
const slugs = [...new Set([...Object.keys(react), ...Object.keys(vue)])].sort();

// vue demos 目录命名不规则的特例:slug → 实际 demos 目录名(相对 vue 原始 slug)。
// 目前经人工核对(见 task-6-report.md),vue 站的 demos 子目录均与 md 文件原始 slug
// (即别名转换前的 slug)完全一致,故此表暂为空,保留作为未来分歧的兜底扩展点。
const VUE_DEMOS_DIR_OVERRIDE = {};

const entries = slugs.map((slug) => {
  const r = react[slug];
  const v = vue[slug];
  const category = r?.category ?? v?.category;
  const src = r?.file ?? v?.file;
  const title = readFileSync(src, 'utf8').match(/^# (.+)$/m)?.[1] ?? slug;
  // vue demos 目录按 vue 站原始 slug 命名(mention 而非 mentions),
  // 若命名不规则(经人工核对后发现的特例)则查表覆盖。
  const vueOrigSlug =
    VUE_DEMOS_DIR_OVERRIDE[slug] ??
    Object.entries(SLUG_ALIAS).find(([, to]) => to === slug)?.[0] ??
    slug;
  const vueDemosDir = v ? join(dirname(v.file), 'demos', vueOrigSlug) : null;
  return {
    slug,
    category,
    title,
    reactSrc: r ? r.file.replace(ROOT + '/', '') : null,
    vueSrc: v ? v.file.replace(ROOT + '/', '') : null,
    vueDemosDir: vueDemosDir && existsSync(vueDemosDir) ? vueDemosDir.replace(ROOT + '/', '') : null,
    frameworks: [r && 'react', v && 'vue'].filter(Boolean),
  };
});

writeFileSync(
  join(ROOT, 'scripts/docs-migration/migration-map.json'),
  JSON.stringify(entries, null, 2),
);
console.log(`total: ${entries.length}`);
console.log(`react-only: ${entries.filter((e) => e.frameworks.length === 1 && e.frameworks[0] === 'react').map((e) => e.slug).join(', ')}`);
console.log(`vue-only: ${entries.filter((e) => e.frameworks.length === 1 && e.frameworks[0] === 'vue').map((e) => e.slug).join(', ')}`);
console.log(`missing vueDemosDir: ${entries.filter((e) => e.vueSrc && !e.vueDemosDir).map((e) => e.slug).join(', ') || '(none)'}`);
