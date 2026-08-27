import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const projectRoot = new URL('../../..', import.meta.url);
const readSource = (path) => readFile(new URL(path, projectRoot), 'utf8');

test('the Docs root renders the standalone V1 landing page', async () => {
  const route = await readSource('src/pages/index.astro');

  assert.match(route, /renderLandingPage\(import\.meta\.env\.BASE_URL\)/);
  assert.match(route, /export const prerender = true/);
  assert.doesNotMatch(route, /Astro\.redirect/);
});

test('the landing snapshot retains all V1 floor anchors', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  for (const id of ['top', 'case', 'capabilities', 'assets', 'roles']) {
    assert.match(landing, new RegExp(`id="${id}"`));
  }
});

test('the desktop navigation uses the shared 1008px content width without inner side gaps', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  assert.match(landing, /\.nav\{[\s\S]*?width:var\(--max\) !important;[\s\S]*?max-width:1008px !important;/);
  assert.match(landing, /\.nav\{[\s\S]*?margin-left:auto !important;[\s\S]*?margin-right:auto !important;/);
  assert.match(landing, /\.nav\{[\s\S]*?padding-left:0 !important;[\s\S]*?padding-right:0 !important;/);
});

test('landing calls to action use real Docs destinations', async () => {
  const [landing, renderer] = await Promise.all([
    readSource('src/landing/designkit-landing.html'),
    readSource('src/landing/renderLandingPage.ts'),
  ]);

  assert.match(landing, /class="case-guide-button" href="\/guide"/);
  assert.match(landing, /class="asset-library-button" href="\/components"/);
  assert.match(landing, /class="nav-docs" href="\/components">基础组件<\/a>/);
  assert.match(renderer, /\['\/guide', 'guide\/ai-skills-guide\/'\]/);
  assert.match(renderer, /\['\/components', 'components\/general\/button\/'\]/);
});

test('AI collaboration landing aliases route to the matching guide or Starter management page', async () => {
  const renderer = await readSource('src/landing/renderLandingPage.ts');

  for (const [source, target] of [
    ['/guide', 'guide/ai-skills-guide/'],
    ['/guide/product-manager', 'guide/ai-skills-releases/'],
    ['/guide/designer', 'guide/ai-skills-starters/'],
    ['/guide/developer', 'guide/ai-skills-developer/'],
    ['/guide/team-leader', 'guide/ai-skills-starters/'],
    ['/skills', 'guide/ai-skills-guide/'],
    ['/download', 'guide/ai-skills-starters/'],
  ]) {
    assert.match(renderer, new RegExp(`\\['${source.replace('/', '\\/')}', '${target.replace('/', '\\/')}'\\]`));
  }
  assert.doesNotMatch(renderer, /\['\/download', 'guide\/ai-skills\/'\]/);
});

test('role headings share the same two-line typography and omit punctuation', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  assert.match(landing, /#roles \.role-showcase-heading\{[\s\S]*?font-size:30px;[\s\S]*?line-height:1\.2;/);
  assert.match(landing, /从真实需求<br>快速进入可评审页面/);
  assert.match(landing, /把个人判断<br>沉淀为团队可复用资产/);
  assert.match(landing, /从统一资产<br>生成可继续开发的代码/);
  assert.match(landing, /建立团队统一<br>可持续复用的交付方式/);
});

test('the landing renderer makes assets and Docs links base-aware', async () => {
  const renderer = await readSource('src/landing/renderLandingPage.ts');

  assert.match(renderer, /landing\/starbucks-wordmark\.svg/);
  assert.match(renderer, /landing\/nink-avatar\.jpg/);
  assert.match(renderer, /guide\/ai-skills-guide\//);
  assert.match(renderer, /templates\/data-list\/basic-list\//);
  assert.match(renderer, /designkit-input-demo\\\.css/);
  assert.match(renderer, /designkit-input-demo\\\.js/);
});

test('the hero download action opens an accessible role starter modal', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  assert.match(landing, /class="btn secondary js-download"[^>]+aria-haspopup="dialog"/);
  assert.match(landing, /id="downloadModal" role="dialog" aria-modal="true"/);
  assert.match(landing, /选择你的 DesignKit 启动包/);
  assert.doesNotMatch(landing, /download-modal-kicker/);
  assert.match(landing, /\.download-modal-head\{[\s\S]*?align-items:center;/);
  assert.match(landing, /data-download-close aria-label="关闭下载弹窗"/);
  assert.match(landing, /event\.key==='Escape'/);
  assert.match(landing, /downloadModalTrigger\?\.focus\(\)/);
});

test('only the product manager starter pack is available for download', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  assert.match(landing, /href="\.\.\/\.\.\/public\/downloads\/designkit-starter-v1-r2\.zip" download="designkit-starter-v1-r2\.zip"/);
  assert.match(landing, /下载产品经理启动包/);
  assert.match(landing, /前端开发启动包/);
  assert.doesNotMatch(landing, /前端研发启动包/);
  assert.match(landing, /角色化工程协作内容仍在建设中/);
  assert.match(landing, /下载解压后，无需复杂开发环境，即可生成并预览 HTML Demo，适合需求验证、评审和沟通。/);
  assert.equal((landing.match(/aria-disabled="true"/g) || []).length, 3);
  assert.match(landing, /当前仅开放产品经理启动包，其他角色内容正在准备中。/);
  assert.match(landing, /\.download-role-card:not\(\.is-available\) \.download-role-copy,[\s\S]*?display:none/);
});

test('the starter modal inner surfaces omit outer borders', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  assert.match(landing, /\.download-modal-intro\{[\s\S]*?border:0;/);
  assert.match(landing, /\.download-role-card\{[\s\S]*?border:0;/);
  assert.doesNotMatch(landing, /\.download-role-card\.is-available\{[^}]*border-color:/);
  assert.match(landing, /\.download-modal-note\{[\s\S]*?border:0;/);
});

test('the starter modal close button stays transparent without hover fill', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  assert.match(landing, /\.download-modal-close\{[\s\S]*?border:0;[\s\S]*?background:transparent;/);
  assert.match(landing, /\.download-modal-close:hover\{transform:rotate\(4deg\);\}/);
  assert.doesNotMatch(landing, /\.download-modal-close:hover\{[^}]*background:/);
});

test('the starter modal backdrop keeps the page visible', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  assert.match(landing, /\.download-modal-backdrop\{[\s\S]*?background:rgba\(8,10,11,\.42\);[\s\S]*?backdrop-filter:blur\(8px\) saturate\(\.95\);/);
});

test('the available starter card keeps neutral icon and status colors', async () => {
  const landing = await readSource('src/landing/designkit-landing.html');

  assert.match(landing, /\.download-role-card\.is-available \.download-role-icon\{[\s\S]*?border-color:rgba\(255,255,255,\.14\);[\s\S]*?color:#DADADC;[\s\S]*?background:rgba\(255,255,255,\.055\);/);
  assert.match(landing, /\.download-role-card\.is-available \.download-role-icon-image\{[\s\S]*?filter:brightness\(0\) invert\(1\);[\s\S]*?opacity:\.82;/);
  assert.match(landing, /\.download-role-card\.is-available \.download-role-status\{color:#85858B;\}/);
});

test('the product manager starter pack URL works from the source file and remains base-aware', async () => {
  const [landing, renderer] = await Promise.all([
    readSource('src/landing/designkit-landing.html'),
    readSource('src/landing/renderLandingPage.ts'),
  ]);

  assert.match(renderer, /\['\.\.\/\.\.\/public\/downloads\/designkit-starter-v1-r2\.zip', 'downloads\/designkit-starter-v1-r2\.zip'\]/);
  await assert.doesNotReject(() => readSource('public/downloads/designkit-starter-v1-r2.zip'));
  assert.match(renderer, /normalizeBaseUrl\(baseUrl \|\| '\/'\)/);
  assert.doesNotMatch(`${landing}\n${renderer}`, /\/Starbucks-Design-main\/|\/kning\/starbucks-design-main\/|nink1992\.github\.io|pages\.scm\.starbucks\.com/);
  assert.doesNotMatch(`${landing}\n${renderer}`, /starbucks-design-react-preview\.zip/);
});

test('starter pack and role floor icons use the supplied role assets', async () => {
  const [landing, renderer] = await Promise.all([
    readSource('src/landing/designkit-landing.html'),
    readSource('src/landing/renderLandingPage.ts'),
  ]);

  for (const icon of [
    'product-manager',
    'designer',
    'frontend-developer',
    'team-lead',
  ]) {
    assert.equal((landing.match(new RegExp(`src="\\./role-icons/${icon}\\.svg"`, 'g')) || []).length, 1);
    assert.match(landing, new RegExp(`class="role-showcase-tab[^>]*"[\\s\\S]*?viewBox="0 0 48 48"`));
    assert.match(renderer, new RegExp(`role-icons/${icon}\\.svg`));
  }
});
