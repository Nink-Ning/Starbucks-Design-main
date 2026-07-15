#!/usr/bin/env tsx
/**
 * figma-to-arco: Extract Figma design tokens → Arco Design theme package
 *
 * Usage:
 *   FIGMA_TOKEN=xxx npx tsx scripts/figma-to-arco/index.ts \
 *     --file-key <figmaFileKey> \
 *     --config scripts/figma-to-arco/arco-theme-mapping.yml
 *
 * Output:
 *   arco-theme-output/  (configurable via mapping config)
 */

import { fetchFigmaTokens } from './figma-fetcher';
import { loadMapping } from './mapping-engine';
import { transformTokens } from './token-transformer';
import { generateThemePackage } from './theme-generator';

interface CLIOptions {
  fileKey: string;
  configPath: string;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const opts: CLIOptions = { fileKey: '', configPath: 'scripts/figma-to-arco/arco-theme-mapping.yml' };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file-key' && i + 1 < args.length) {
      opts.fileKey = args[++i];
    } else if (args[i] === '--config' && i + 1 < args.length) {
      opts.configPath = args[++i];
    } else if (args[i] === '--help' || args[i] === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  if (!opts.fileKey) {
    console.error('❌ 缺少 --file-key 参数');
    printHelp();
    process.exit(1);
  }

  return opts;
}

function printHelp(): void {
  console.log(`
figma-to-arco — 从 Figma 提取 Design Token 生成 Arco 主题包

用法:
  FIGMA_TOKEN=xxx npx tsx scripts/figma-to-arco/index.ts \\
    --file-key <figmaFileKey> \\
    [--config <mapping.yml>]

参数:
  --file-key    Figma 文件 Key（从 Figma URL 中提取）
  --config      映射配置文件路径（默认: scripts/figma-to-arco/arco-theme-mapping.yml）

环境变量:
  FIGMA_TOKEN   Figma Personal Access Token
                获取地址: https://www.figma.com/developers/api#access-tokens

示例:
  FIGMA_TOKEN=figd_xxx npx tsx scripts/figma-to-arco/index.ts \\
    --file-key abc123 \\
    --config arco-theme-mapping.yml
`);
}

async function main() {
  const opts = parseArgs();

  // 检查 FIGMA_TOKEN
  const figmaToken = process.env.FIGMA_TOKEN;
  if (!figmaToken) {
    console.error('❌ 缺少 FIGMA_TOKEN 环境变量');
    console.error('   获取 token: https://www.figma.com/developers/api#access-tokens');
    console.error('   用法: FIGMA_TOKEN=figd_xxx npx tsx scripts/figma-to-arco/index.ts ...');
    process.exit(1);
  }

  console.log('🚀 figma-to-arco 开始运行\n');

  try {
    // 1. 加载映射配置
    console.log('1️⃣ 加载映射配置...');
    const config = loadMapping(opts.configPath);
    console.log(`   ✅ 已加载: ${opts.configPath}`);
    console.log(`   输出目录: ${config.output.dir}`);
    console.log(`   主题包名: ${config.output.packageName}`);
    console.log(`   配置的 modes: ${Object.keys(config.modes).join(', ')}`);

    // 2. 拉取 Figma 数据
    console.log(`\n2️⃣ 拉取 Figma 数据 (file: ${opts.fileKey})...`);
    const rawData = await fetchFigmaTokens(opts.fileKey, figmaToken);
    console.log(`   ✅ Variables: ${rawData.variableCount} 个`);
    console.log(`   ✅ Styles: ${rawData.styleCount} 个`);

    // 3. Token 转换
    console.log('\n3️⃣ 转换 tokens...');
    const { resolved, unmapped } = transformTokens(rawData.entries, config);

    // 4. 生成主题包
    console.log('\n4️⃣ 生成主题包...');
    generateThemePackage(resolved, unmapped, config);

    // 5. 最终摘要
    console.log('\n📊 摘要:');
    console.log(`   提取: ${rawData.entries.length} tokens`);
    console.log(`   映射: ${resolved.length} tokens`);
    console.log(`   未映射: ${unmapped.length} tokens`);
    if (unmapped.length > 0) {
      console.log(`   ⚠ 查看未映射 token 报告: ${config.output.dir}/UNMAPPED-TOKENS.md`);
    }
    console.log(`   输出: ${config.output.dir}/`);
  } catch (err) {
    console.error(`\n❌ 错误: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
