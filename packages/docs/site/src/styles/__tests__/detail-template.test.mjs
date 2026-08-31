import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const site = new URL('../../../', import.meta.url);
const docs = new URL('src/content/docs/templates/detail/', site);
const demos = new URL('src/demos/template-pages/', site);
const styles = new URL('src/styles/demo.css', site);

test('Basic Detail has real React and Vue demos with shared coupon data', async () => {
  const [doc, reactDemo, vueDemo, shared] = await Promise.all([
    readFile(new URL('basic-detail.mdx', docs), 'utf8'),
    readFile(new URL('basic-detail.tsx', demos), 'utf8'),
    readFile(new URL('basic-detail.vue', demos), 'utf8'),
    readFile(new URL('detail.shared.ts', demos), 'utf8'),
  ]);

  assert.match(doc, /<Demo name="template-pages\/basic-detail" \/>/);
  assert.match(doc, /focused read-only object page template/);
  assert.doesNotMatch(doc, /TemplatePagePlaceholder/);
  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /PageHeader/);
    assert.match(source, /DetailPageLayout/);
    assert.match(source, /DetailSection/);
    assert.match(source, /DetailDescriptions/);
    assert.match(source, /couponBasicInfo/);
  }
  assert.match(shared, /PO20250605180337094976/);
  assert.match(shared, /2025-06-06 00:00:00～2026-08-30 23:59:59/);
  assert.doesNotMatch(reactDemo, /couponUsageRules|couponActivityTimeline|Timeline/);
  assert.doesNotMatch(vueDemo, /couponUsageRules|couponActivityTimeline|Timeline/);
  assert.match(reactDemo, /<DetailSection>/);
  assert.match(vueDemo, /<DetailSection>/);
  assert.doesNotMatch(reactDemo, /title="基本信息"/);
  assert.doesNotMatch(vueDemo, /title="基本信息"/);
  assert.match(reactDemo, /PageHeader[\s\S]*helpText/);
  assert.match(vueDemo, /PageHeader[\s\S]*help-text/);
  assert.match(reactDemo, /couponBasicInfoColumns\.map/);
  assert.match(vueDemo, /v-for="\(column, index\) in couponBasicInfoColumns"/);
  for (const source of [reactDemo, vueDemo]) {
    assert.match(source, /tableLayout="auto"|table-layout="auto"/);
    assert.match(source, /labelStyle|label-style/);
    assert.match(source, /DETAIL_LABEL_VALUE_GAP/);
  }
  assert.match(shared, /export const DETAIL_LABEL_VALUE_GAP = 24/);
  assert.match(shared, /couponBasicInfo\.filter\(\(_, index\) => index % 2 === 0\)/);
  assert.match(shared, /couponBasicInfo\.filter\(\(_, index\) => index % 2 === 1\)/);
});

test('Basic Detail uses one content container and scoped responsive styles', async () => {
  const source = await readFile(styles, 'utf8');

  assert.match(source, /\.sb-demo\[data-demo='template-pages\/basic-detail'\]/);
  assert.match(source, /\.sb-basic-detail-page__content\s*\{/);
  assert.match(source, /\.sb-basic-detail-page \.sbux-pro-detail-descriptions/);
  assert.match(source, /\.sb-basic-detail-page\s*\{[\s\S]*?background:\s*var\(--bg-color-container\);[\s\S]*?border-radius:/);
  assert.match(source, /\.sb-basic-detail-page\s*\{[\s\S]*?padding:\s*32px;/);
  assert.match(source, /\.sb-basic-detail-page > \.sbux-pro-detail-page-layout\s*\{[\s\S]*?margin:\s*0;/);
  assert.match(source, /\.sb-basic-detail-page \.sbux-pro-detail-descriptions\s*\{[\s\S]*?text-align:\s*left;/);
  assert.match(source, /\.sb-basic-detail-page__wide-descriptions\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(source, /\.sb-basic-detail-page__label-probe\s*\{[\s\S]*?visibility:\s*hidden;/);
  assert.match(source, /@media \(min-width: 1024px\)[\s\S]*?\.sb-template-page-surface\s*\{[\s\S]*?min-height:\s*calc\(100dvh - var\(--sb-docs-nav-height, 64px\) - 48px\);/);
  assert.match(source, /\.sb-basic-detail-page__content\s*\{[\s\S]*?padding:\s*0;/);
});

test('DetailDescriptions keeps labels intrinsic so multilingual fields stay aligned', async () => {
  const [reactLayoutStyle, vueLayoutStyle] = await Promise.all([
    readFile(new URL('../../starbucks-design-react/src/pro/detail-layout/style.less', site), 'utf8'),
    readFile(new URL('../../starbucks-design-vue/src/pro/detail-layout/style.less', site), 'utf8'),
  ]);

  for (const source of [reactLayoutStyle, vueLayoutStyle]) {
    assert.match(source, /\.arco-descriptions-item-label[\s\S]*?white-space:\s*nowrap;/);
    assert.match(source, /\.arco-descriptions-item-label[\s\S]*?word-break:\s*keep-all;/);
    assert.match(source, /\.arco-descriptions-item-value[\s\S]*?overflow-wrap:\s*anywhere;/);
  }
});

test('Card Detail uses independent cards for mixed content modules', async () => {
  const [doc, reactDemo, vueDemo, shared, source] = await Promise.all([
    readFile(new URL('card-detail.mdx', docs), 'utf8'),
    readFile(new URL('card-detail.tsx', demos), 'utf8'),
    readFile(new URL('card-detail.vue', demos), 'utf8'),
    readFile(new URL('detail.shared.ts', demos), 'utf8'),
    readFile(styles, 'utf8'),
  ]);

  assert.match(doc, /<Demo name="template-pages\/card-detail" \/>/);
  assert.doesNotMatch(doc, /TemplatePagePlaceholder/);
  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /DetailPageLayout/);
    assert.match(demo, /PageHeader/);
    assert.match(demo, /backable/);
    assert.match(demo, /DetailDescriptions/);
    assert.match(demo, /Card/);
    assert.match(demo, /Table/);
    assert.match(demo, /Timeline/);
    assert.match(demo, /couponStoreScope/);
    assert.match(demo, /title="卡券详情"/);
    assert.doesNotMatch(demo, /data-template-action-host/);
    assert.match(demo, /sb-card-detail-page__card sb-card-detail-page__card--wide[^"]*" title="基本信息"/);
    assert.doesNotMatch(demo, /couponUsageRules|title="使用规则"/);
  }
    assert.match(reactDemo, /DetailDescriptions data=\{couponBasicInfo\} column=\{2\}/);
  assert.match(vueDemo, /DetailDescriptions :data="couponBasicInfo" :column="2"/);
  assert.match(reactDemo, /<Button type="outline">更多<\/Button>/);
  assert.match(vueDemo, /<Button type="outline">更多<\/Button>/);
  const basicInfoBlock = shared.match(/export const couponBasicInfo:[\s\S]*?(?=\n\nexport const couponUsageRules)/)?.[0] ?? '';
  assert.doesNotMatch(basicInfoBlock, /span:\s*3/);
  assert.match(shared, /全国常规门店/);
  assert.match(source, /\.sb-demo\[data-demo='template-pages\/card-detail'\]/);
  assert.match(source, /\.sb-card-detail-page__cards\s*\{/);
  assert.match(source, /\.sb-card-detail-page\s*\{[\s\S]*?min-height:\s*0;[\s\S]*?padding:\s*0;/);
  assert.match(source, /\.sb-card-detail-page__table\s*\{[\s\S]*?overflow-x:\s*auto;/);
  assert.match(source, /\.sb-card-detail-page \.sb-card-detail-page__table \.arco-table-th,[\s\S]*?\.sb-card-detail-page \.sb-card-detail-page__table \.arco-table-td\s*\{[\s\S]*?border-left:\s*0;/);
  assert.match(source, /\.sb-card-detail-page__card\s*\{[\s\S]*?align-self:\s*start;[\s\S]*?height:\s*auto;/);
  assert.match(source, /\.sb-card-detail-page \.sb-card-detail-page__card\.arco-card > \.arco-card-body,[\s\S]*?\.sb-card-detail-page \.sb-card-detail-page__card\.arco-v-card > \.arco-v-card-body\s*\{[\s\S]*?padding:\s*24px 32px;[\s\S]*?text-align:\s*left;/);
  assert.match(source, /\.sb-card-detail-page \.sb-card-detail-page__card\.arco-card > \.arco-card-header,[\s\S]*?\.sb-card-detail-page \.sb-card-detail-page__card\.arco-v-card > \.arco-v-card-header\s*\{[\s\S]*?padding-left:\s*24px;/);
});

test('Data Detail keeps analysis context, lightweight charts, and detail states local to Docs', async () => {
  const [doc, reactDemo, vueDemo, shared, source] = await Promise.all([
    readFile(new URL('data-detail.mdx', docs), 'utf8'),
    readFile(new URL('data-detail.tsx', demos), 'utf8'),
    readFile(new URL('data-detail.vue', demos), 'utf8'),
    readFile(new URL('data-detail.shared.ts', demos), 'utf8'),
    readFile(styles, 'utf8'),
  ]);

  assert.match(doc, /<Demo name="template-pages\/data-detail" \/>/);
  assert.doesNotMatch(doc, /TemplatePagePlaceholder/);
  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /DetailPageLayout/);
    assert.match(demo, /PageHeader/);
    assert.match(demo, /backable/);
    assert.match(demo, /DetailDescriptions/);
    assert.match(demo, /Statistic/);
    assert.match(demo, /Table/);
    assert.match(demo, /Empty/);
    assert.match(demo, /Spin/);
    assert.match(demo, /svg|<polyline/);
    assert.match(demo, /progressbar/);
    assert.doesNotMatch(demo, /(?:from\s+['"][^'"]*Chart|<Chart\b)/);
  }
  assert.match(reactDemo, /title="卡券数据详情"/);
  assert.match(vueDemo, /title="卡券数据详情"/);
  assert.doesNotMatch(reactDemo, /data-template-action-host/);
  assert.doesNotMatch(vueDemo, /data-template-action-host/);
  assert.match(reactDemo, /<Button type="outline">更多<\/Button>/);
  assert.match(reactDemo, /<Button type="outline" onClick=\{onRefresh\}>刷新数据<\/Button>/);
  assert.match(vueDemo, /<Button type="outline">更多<\/Button>/);
  assert.match(vueDemo, /<Button type="outline" @click="refreshData">刷新数据<\/Button>/);
  assert.match(shared, /126840/);
  assert.match(shared, /dataDetailWeeklyTrend/);
  assert.match(shared, /dataDetailRedemptionRows/);
  assert.match(source, /\.sb-demo\[data-demo='template-pages\/data-detail'\]/);
  assert.match(source, /\.sb-data-detail-page\s*\{[\s\S]*?padding:\s*0;/);
  assert.match(source, /\.sb-data-detail-page__metrics\s*\{/);
  assert.match(source, /\.sb-data-detail-page__table\s*\{[\s\S]*?overflow-x:\s*auto;/);
});

test('Secondary Detail keeps parent context and same-level Tabs local to Docs', async () => {
  const [doc, reactDemo, vueDemo, shared, source] = await Promise.all([
    readFile(new URL('secondary-detail.mdx', docs), 'utf8'),
    readFile(new URL('secondary-detail.tsx', demos), 'utf8'),
    readFile(new URL('secondary-detail.vue', demos), 'utf8'),
    readFile(new URL('secondary-detail.shared.ts', demos), 'utf8'),
    readFile(styles, 'utf8'),
  ]);

  assert.match(doc, /<Demo name="template-pages\/secondary-detail" \/>/);
  assert.doesNotMatch(doc, /TemplatePagePlaceholder/);
  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /DetailPageLayout/);
    assert.match(demo, /PageHeader/);
    assert.match(demo, /backable/);
    assert.match(demo, /DetailDescriptions/);
    assert.match(demo, /Tabs|TabPane/);
    assert.match(demo, /Table/);
    assert.match(demo, /Timeline/);
    assert.match(demo, /secondaryParentSummary/);
    assert.match(demo, /sb-secondary-detail-page__parent-summary/);
    assert.doesNotMatch(demo, /sb-secondary-detail-page__context|title="父级对象摘要"/);
    assert.doesNotMatch(demo, /title="二级内容"/);
  }
  assert.match(reactDemo, /title="卡券核销记录"/);
  assert.match(vueDemo, /title="卡券核销记录"/);
  assert.doesNotMatch(reactDemo, /data-template-action-host/);
  assert.doesNotMatch(vueDemo, /data-template-action-host/);
  assert.match(reactDemo, /<Button type="outline">更多<\/Button>/);
  assert.match(vueDemo, /<Button type="outline">更多<\/Button>/);
  assert.match(shared, /全场满50减6元券/);
  assert.match(shared, /secondaryRedemptionRows/);
  assert.match(shared, /secondaryTabLabels/);
  assert.match(source, /\.sb-demo\[data-demo='template-pages\/secondary-detail'\]/);
  assert.match(source, /\.sb-secondary-detail-page\s*\{[\s\S]*?padding:\s*0;/);
  assert.match(source, /\.sb-secondary-detail-page \.sb-secondary-detail-page__content\.arco-card > \.arco-card-body,[\s\S]*?\.sb-secondary-detail-page \.sb-secondary-detail-page__content\.arco-v-card > \.arco-v-card-body\s*\{[\s\S]*?padding:\s*24px 32px 32px;[\s\S]*?text-align:\s*left;/);
  assert.match(source, /@media \(min-width: 1024px\)[\s\S]*?\.sb-secondary-detail-page__content\s*\{[\s\S]*?min-height:\s*calc\(100dvh - var\(--sb-docs-nav-height, 64px\) - 48px\);/);
  assert.match(source, /@media \(max-width: 1023px\)[\s\S]*?\.sb-secondary-detail-page__content\s*\{[\s\S]*?min-height:\s*0;/);
  const parentSummaryStyles = source.match(/\.sb-secondary-detail-page__parent-summary\s*\{[^}]*\}/)?.[0] ?? '';
  assert.match(parentSummaryStyles, /padding:\s*16px;/);
  assert.match(parentSummaryStyles, /background:\s*var\(--bg-color-secondarycontainer\);/);
  assert.match(parentSummaryStyles, /border-radius:\s*6px;/);
  assert.match(parentSummaryStyles, /margin-bottom:\s*16px;/);
  assert.doesNotMatch(parentSummaryStyles, /border-bottom:/);
  assert.match(reactDemo, /<DetailDescriptions data=\{secondaryParentSummary\} emptyValue="—" \/>/);
  assert.match(vueDemo, /<DetailDescriptions :data="secondaryParentSummary" empty-value="—" \/>/);
  assert.doesNotMatch(reactDemo, /DetailDescriptions data=\{secondaryParentSummary\} column=\{3\}/);
  assert.doesNotMatch(vueDemo, /DetailDescriptions :data="secondaryParentSummary" :column="3"/);
  assert.match(source, /\.sb-secondary-detail-page__table\s*\{[\s\S]*?overflow-x:\s*auto;/);
  assert.match(source, /\.sb-secondary-detail-page \.sb-secondary-detail-page__table \.arco-table-th,[\s\S]*?\.sb-secondary-detail-page \.sb-secondary-detail-page__table \.arco-table-td\s*\{[\s\S]*?border-left:\s*0;/);
});

test('Data Detail metrics follow the confirmed container breakpoints', async () => {
  const source = await readFile(styles, 'utf8');

  assert.match(source, /@container \(min-width: 1201px\)[\s\S]*?\.sb-data-detail-page__metrics[\s\S]*?repeat\(4/);
  assert.match(source, /@container \(min-width: 481px\) and \(max-width: 1200px\)[\s\S]*?\.sb-data-detail-page__metrics[\s\S]*?repeat\(2/);
  assert.match(source, /@container \(max-width: 480px\)[\s\S]*?\.sb-data-detail-page__metrics[\s\S]*?minmax\(0, 1fr\)/);
});

test('all completed Detail docs use the shared template information card', async () => {
  const docsToCheck = await Promise.all([
    readFile(new URL('basic-detail.mdx', docs), 'utf8'),
    readFile(new URL('card-detail.mdx', docs), 'utf8'),
    readFile(new URL('data-detail.mdx', docs), 'utf8'),
    readFile(new URL('secondary-detail.mdx', docs), 'utf8'),
  ]);

  for (const doc of docsToCheck) {
    assert.match(doc, /<Demo name="template-pages\//);
    assert.match(doc, /<p>预览可切换 React \/ Vue；/);
    assert.match(doc, /<section class="sb-template-docs-card">/);
    assert.match(doc, /<section class="sb-template-docs-section">/);
    assert.match(doc, /<h2>模板定义<\/h2>/);
    assert.match(doc, /<h2>使用组件<\/h2>/);
    assert.match(doc, /<h2>使用注意事项<\/h2>/);
  }
});

test('completed Detail Cards use scoped surface tokens and content-sized layout', async () => {
  const source = await readFile(styles, 'utf8');

  assert.match(source, /\.sb-card-detail-page \.arco-card,[\s\S]*?border:\s*0;[\s\S]*?border-radius:\s*var\(--border-radius-md\);[\s\S]*?box-shadow:\s*none;/);
  assert.match(source, /\.sb-data-detail-page \.arco-card,[\s\S]*?border:\s*0;[\s\S]*?border-radius:\s*var\(--border-radius-md\);/);
  assert.match(source, /\.sb-secondary-detail-page \.arco-card,[\s\S]*?border:\s*0;/);
  assert.match(source, /\.sb-card-detail-page \.arco-card-header,[\s\S]*?min-height:\s*48px;[\s\S]*?border-bottom:/);
  assert.doesNotMatch(source, /\.sb-card-detail-page__card\s*\{[^}]*height:\s*100%;/);
});
