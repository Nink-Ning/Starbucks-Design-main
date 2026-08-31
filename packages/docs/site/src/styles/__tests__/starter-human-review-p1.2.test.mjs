import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const repo = new URL('../../../../../../', import.meta.url);
const patterns = new URL('distribution/designkit-starter-v1/patterns/', repo);

const depthTwoTemplates = [
  'basic-form',
  'basic-detail',
  'grouped-form',
  'step-form',
];

test('P1.2.1 full-page Form and Detail references bind to the shared depth-2 header contract', async () => {
  const [pageHeader, ...templateSources] = await Promise.all([
    readFile(new URL('page-header.html', patterns), 'utf8'),
    ...depthTwoTemplates.map((name) => readFile(new URL(`${name}.html`, patterns), 'utf8')),
  ]);

  assert.match(pageHeader, /data-reference-structure="shared"/);
  assert.match(pageHeader, /data-title-font-size="20px"/);
  assert.match(pageHeader, /data-level-2="icon-back\+title\+context-help"/);
  assert.match(pageHeader, /data-depth-2-breadcrumb="absent"/);
  assert.match(pageHeader, /data-depth-2-text-back="absent"/);
  assert.match(pageHeader, /data-depth-2-icon-back="present"/);
  assert.match(pageHeader, /data-back-icon="IconLeft"/);
  assert.match(pageHeader, /data-context-help-icon="IconQuestionCircle"/);
  assert.match(pageHeader, /data-context-help-trigger="Tooltip\[position=bottom\]"/);

  for (const source of templateSources) {
    assert.match(source, /data-reference-structure="shared-page-header/);
    assert.match(source, /data-template-slot="BACK_ICON"|aria-label="返回上一级"/);
    assert.match(source, /data-title-font-size="20px"|font-size: var\(--fs-20, 20px\)/);
    assert.match(source, /IconLeft/);
    assert.match(source, /IconQuestionCircle/);
    assert.match(source, /data-trigger="Tooltip\[position=bottom\]"|data-context-help-trigger="Tooltip\[position=bottom\]"|position="bottom"/);
  }

  for (const name of depthTwoTemplates) {
    const source = templateSources[depthTwoTemplates.indexOf(name)];
    assert.match(source, /data-text-back="absent"|data-depth-2-text-back="absent"/);
    assert.match(source, /data-breadcrumb="absent"|data-depth-2-breadcrumb="absent"/);
    assert.match(source, /data-outer-border="absent"|data-outer-border=['"]?absent/);
  }
});

test('P1.2.1 Card List is Level 1 and preserves the approved Card-specific structure', async () => {
  const card = await readFile(new URL('card-list.html', patterns), 'utf8');

  assert.match(card, /data-header-level="1"/);
  assert.match(card, /data-back-icon="absent"/);
  assert.doesNotMatch(card, /data-template-slot="BACK_ICON"|aria-label="返回上一级"/);
  assert.match(card, /data-title-font-size="20px"/);
  assert.match(card, /data-breadcrumb="absent"/);
  assert.match(card, /data-docs-authority="pages\/golden-examples\/card-list\.html\.ts"/);
  assert.match(card, /data-reference-dom-reused="true"/);
  assert.match(card, /data-frozen-regions="toolbar;container;card;selection;media;footer-action"/);
  assert.match(card, /data-selection-summary-policy="exactly-one-canonical-summary"/);
  assert.match(card, /data-card-node="dk-card"/);
  assert.match(card, /data-media-shape="circle"/);
});

test('P1.2.1 references preserve the Detail alignment and full-surface Step divider rules', async () => {
  const [card, step] = await Promise.all([
    readFile(new URL('card-list.html', patterns), 'utf8'),
    readFile(new URL('step-form.html', patterns), 'utf8'),
  ]);
  void card;

  const detail = await readFile(new URL('basic-detail.html', patterns), 'utf8');
  assert.match(detail, /data-description-layout="2-equal-columns"/);
  assert.match(detail, /data-description-table-layout="auto"/);
  assert.match(detail, /data-description-label-width="longest-label-in-group"/);
  assert.match(detail, /data-description-label-value-gap="24px"/);
  assert.match(detail, /data-surface-padding="32px"/);
  assert.match(detail, /data-surface-radius="6px"/);

  assert.match(step, /data-reference-structure="shared-page-header\+steps-divider\+/);
  assert.match(step, /data-approved-divider="after-steps"/);
  assert.match(step, /<Steps current=\{step \+ 1\}>/);
  assert.match(step, /\.p11-steps\s*\{[^}]*position:\s*relative;[^}]*margin:\s*0 0 8px;[^}]*padding-bottom:\s*24px;/);
  assert.match(step, /\.p11-steps::after\s*\{[^}]*left:\s*-32px;[^}]*width:\s*calc\(100% \+ 64px\);[^}]*border-bottom:\s*1px solid/);
  assert.match(step, /\.p11-surface\s*\{[^}]*display:flex;[^}]*min-height:calc\(100vh - 152px\);[^}]*flex-direction:column;/);
  assert.match(step, /\.p11-surface > \.sbux-pro-form-page-layout\s*\{[^}]*display:flex;[^}]*flex:1 1 auto;[^}]*flex-direction:column;/);
  assert.match(step, /\.p11-content\s*\{[^}]*display:flex;[^}]*flex:1 1 auto;[^}]*flex-direction:column;/);
  assert.match(step, /\.p11-content > form\s*\{[^}]*display:flex;[^}]*flex:1 1 auto;[^}]*flex-direction:column;/);
  assert.match(step, /\.p11-content > form > \.sbux-pro-form-actions\s*\{[^}]*position:sticky;[^}]*bottom:0;[^}]*width:100cqw;[^}]*margin-top:auto;[^}]*margin-right:0;[^}]*margin-left:calc\(50% - 50cqw\);/);
  assert.match(step, /\.p11-surface\s*\{[^}]*container-type:inline-size;/);
  assert.match(step, /\.p11-content > form > \.sbux-pro-form-actions\s*\{[^}]*width:100cqw;[^}]*margin-right:0;[^}]*margin-left:calc\(50% - 50cqw\);/);
});

test('P1.2.1 full-page Form and Detail references keep the 6px surface radius baseline', async () => {
  const sources = await Promise.all(
    ['basic-form', 'basic-detail', 'grouped-form', 'step-form'].map((name) => readFile(new URL(`${name}.html`, patterns), 'utf8')),
  );

  for (const source of sources) {
    assert.match(source, /(?:border-radius:\s*6px|data-surface-radius="6px")/);
  }
});

test('P1.2.1 full-page Form shell references keep 260px expanded and 56px collapsed geometry', async () => {
  const sources = await Promise.all(
    ['basic-form', 'grouped-form', 'step-form'].map((name) => readFile(new URL(`${name}.html`, patterns), 'utf8')),
  );

  for (const source of sources) {
    assert.match(source, /(?:p11-shell-side|p11-side)[^{]*\{[^}]*width:\s*260px;[^}]*flex:\s*0 0 260px;/);
    assert.match(source, /@media \(max-width:\s*1023px\)[\s\S]*?(?:p11-shell-side|p11-side)[^{]*\{[^}]*width:\s*56px;[^}]*flex-basis:\s*56px;/);
    assert.match(source, /(?:p11-shell-main|p11-main)[^{]*\{[^}]*padding:\s*24px;/);
  }
});

test('P1.2 leaves the locked Drawer Form contract without a page Back or Breadcrumb', async () => {
  const drawer = await readFile(new URL('drawer-form.html', patterns), 'utf8');

  assert.match(drawer, /title="新建门店"/);
  assert.match(drawer, /data-drawer-body-inset="24px"/);
  assert.doesNotMatch(drawer, /data-back-icon|data-template-slot="BACK_ICON"|aria-label="返回上一级"/);
  assert.doesNotMatch(drawer, /Breadcrumb|面包屑/);
});
