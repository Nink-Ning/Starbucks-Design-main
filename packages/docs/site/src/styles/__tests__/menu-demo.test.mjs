import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = fileURLToPath(new URL('../..', import.meta.url))
const reactDemo = readFileSync(`${root}/demos/menu/top-nav-menu.tsx`, 'utf8')
const vueDemo = readFileSync(`${root}/demos/menu/top-nav-menu.vue`, 'utf8')
const shared = readFileSync(`${root}/demos/menu/top-nav-menu.shared.ts`, 'utf8')
const css = readFileSync(`${root}/demos/menu/top-nav-menu.css`, 'utf8')
const brandReactDemo = readFileSync(`${root}/demos/menu/dark-nav.tsx`, 'utf8')
const brandVueDemo = readFileSync(`${root}/demos/menu/dark-nav.vue`, 'utf8')
const docs = readFileSync(`${root}/content/docs/components/navigation/menu.mdx`, 'utf8')

test('React and Vue top navigation demos share the same system data and styles', () => {
  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /\.\/top-nav-menu\.shared/)
    assert.match(demo, /\.\/top-nav-menu\.css/)
    assert.match(demo, /mode="horizontal"/)
    assert.match(demo, /sb-top-nav-demo__system-trigger/)
    assert.match(demo, /sb-top-nav-system-menu__search/)
    assert.match(demo, /starbucks-system-logo\.svg/)
    assert.match(demo, /Hi！Nink/)
    assert.match(demo, /退出登录/)
  }
  assert.match(reactDemo, /<Cascader/)
  assert.match(vueDemo, /<CascaderPanel/)
  assert.match(reactDemo, /ellipsis=\{false\}/)
  assert.match(vueDemo, /sb-top-nav-demo__menu--vue/)
  assert.match(css, /\.arco-menu-overflow-hidden-menu-item/)
  assert.match(css, /visibility:\s*visible/)
  assert.match(
    css,
    /\.sb-top-nav-demo__menu--vue\.arco-menu-horizontal \.arco-menu-inner,[\s\S]*?\.arco-menu-overflow-wrap \{[\s\S]*?display:\s*flex;[\s\S]*?height:\s*100%;[\s\S]*?align-items:\s*center;/
  )
})

test('the system switcher supports two-level cascading, direct search, and selection', () => {
  assert.match(shared, /systemCascaderOptions/)
  assert.match(shared, /getSystemTriggerLabel/)
  assert.match(shared, /`\$\{system\.shortName\} \$\{group\?\.label/)
  assert.match(shared, /getSystemPath/)
  assert.match(shared, /getSystemSearchResults/)
  assert.match(reactDemo, /showSearch=\{\{/)
  assert.match(reactDemo, /renderOption:/)
  assert.match(reactDemo, /expandTrigger="click"/)
  assert.match(reactDemo, /autoFitPosition: false/)
  assert.match(reactDemo, /filterOption=/)
  assert.match(vueDemo, /expand-trigger="click"/)
  assert.match(vueDemo, /:auto-fit-position="false"/)
  assert.match(vueDemo, /expand-child/)
  assert.match(vueDemo, /searchResults/)
  assert.match(reactDemo, /popupVisible=\{switcherVisible\}/)
  assert.match(vueDemo, /v-model:popup-visible="switcherVisible"/)
  assert.match(reactDemo, /setCurrentSystemId\(systemId\)/)
  assert.match(vueDemo, /currentSystemId\.value = systemId/)
  assert.doesNotMatch(reactDemo, /searchInputRef|requestAnimationFrame/)
  assert.doesNotMatch(vueDemo, /searchInputRef|nextTick|watch\(switcherVisible/)
})

test('the top navigation keeps the logo outside the dropdown and uses compact actions', () => {
  for (const demo of [reactDemo, vueDemo]) {
    const logoIndex = demo.indexOf('sb-top-nav-demo__logo')
    const dropdownIndex = demo.indexOf('<Dropdown')
    const avatarIndex = demo.indexOf('<Avatar')
    const userDropdownIndex = demo.indexOf('<Dropdown', avatarIndex)
    assert.ok(logoIndex > -1 && logoIndex < dropdownIndex)
    assert.ok(avatarIndex > -1 && avatarIndex < userDropdownIndex)
    assert.match(demo, /aria-label="门店切换"/)
    assert.match(demo, /aria-label="消息"/)
    assert.match(demo, /<Avatar/)
    assert.match(demo, /sb-top-nav-demo__user-area/)
  }
  assert.match(reactDemo, /size="default"/)
  assert.match(vueDemo, /size="default"/)
  assert.match(reactDemo, /count=\{15\} offset=\{\[-6, 2\]\}/)
  assert.match(vueDemo, /:count="15" :offset="\[-6, 2\]"/)
  assert.doesNotMatch(reactDemo, /<Menu\.Item key="workspace">\s*<Icon/)
  assert.doesNotMatch(vueDemo, /<MenuItem key="workspace">\s*<template #icon>/)
})

test('the demo follows the measured navigation geometry and existing dropdown tokens', () => {
  for (const demo of [reactDemo, vueDemo]) {
    assert.match(demo, /sb-top-nav-demo__viewport/)
  }
  assert.match(css, /--sb-top-nav-demo-gutter:\s*var\(--spacing-12\)/)
  assert.match(css, /min-width:\s*calc\(760px \+ 2 \* var\(--sb-top-nav-demo-gutter\)\)/)
  assert.match(css, /padding-inline:\s*var\(--sb-top-nav-demo-gutter\)/)
  assert.match(css, /grid-template-columns:\s*280px minmax\(480px, 1fr\)/)
  assert.match(css, /height:\s*54px/)
  assert.match(css, /\.sb-top-nav-demo__system-trigger \{[\s\S]*height:\s*var\(--spacing-10\)/)
  assert.match(css, /\.sb-top-nav-demo__user \{[\s\S]*height:\s*var\(--spacing-10\)/)
  assert.match(css, /border-radius:\s*0;/)
  assert.match(css, /\.sb-top-nav-demo__action\.arco-btn \{[\s\S]*width:\s*var\(--spacing-10\)/)
  assert.match(css, /\.sb-top-nav-system-cascader__content \{[\s\S]*width:\s*472px/)
  assert.match(css, /width:\s*160px/)
  assert.match(css, /width:\s*312px/)
  assert.doesNotMatch(reactDemo, /dropdownMenuColumnStyle/)
  assert.match(css, /--sb-top-nav-system-panel-height:\s*312px/)
  assert.match(css, /height:\s*var\(--sb-top-nav-system-panel-height\)/)
  assert.match(
    css,
    /\.sb-top-nav-system-cascader__popup \.arco-cascader-list-wrapper,[\s\S]*padding:\s*var\(--spacing-2\) var\(--spacing-4\)/
  )
  assert.match(
    css,
    /\.sb-top-nav-system-cascader__popup \.arco-cascader-list-item,[\s\S]*margin:\s*0 0 var\(--spacing-1\)/
  )
  assert.match(
    css,
    /\.sb-top-nav-system-cascader__popup \.arco-cascader-list-item,[\s\S]*border-radius:\s*var\(--border-radius-sm\)/
  )
  assert.match(css, /\.sb-top-nav-system-cascader__group \{[\s\S]*font-weight:\s*var\(--fw-regular\)/)
  assert.match(css, /\.sb-top-nav-system-menu__search\.arco-input-wrapper,[\s\S]*border-color:\s*transparent/)
  assert.match(css, /:focus-within,[\s\S]*\{[\s\S]*box-shadow:\s*none/)
  assert.doesNotMatch(css, /--sb-top-nav-switcher-bg/)
  assert.doesNotMatch(css, /box-shadow:\s*2px 4px 16px/)
  assert.doesNotMatch(css, /!important/)
})

test('the Menu documentation explains the multi-system scenario', () => {
  assert.match(docs, /多个平台系统之间切换/)
  assert.match(docs, /两级级联/)
  assert.match(docs, /按系统名称或描述搜索/)
  assert.match(docs, /品牌 Logo 与系统切换触发区分离/)
  assert.match(docs, /退出入口/)
})

test('the system switcher includes the complete Bizops Portal application inventory', () => {
  assert.match(shared, /label: '用户中心'/)
  assert.match(shared, /label: '财务中心'/)
  assert.match(shared, /label: '店铺中心'/)
  assert.match(shared, /label: '卡券中心'/)
  assert.match(shared, /label: '履约中心'/)
  assert.match(shared, /label: '商品中心'/)
  assert.match(shared, /label: '营销中心'/)
  assert.match(shared, /label: '支付中心'/)
  assert.match(shared, /label: '订单管理'/)
  assert.match(shared, /searchText: 'Customer Center 用户中心'/)
  assert.match(shared, /name: 'SVC & Coupon System \(S4\)'/)
  assert.match(shared, /name: 'Marketing Automation Platform'/)
  assert.match(shared, /name: 'Third Party Platform EC'/)
  assert.match(shared, /group\.searchText/)
})

test('the brand navigation reuses the complete top navigation with only a brand surface treatment', () => {
  assert.match(brandReactDemo, /import TopNavMenu from '\.\/top-nav-menu'/)
  assert.match(brandReactDemo, /<TopNavMenu brand/)
  assert.match(brandVueDemo, /import TopNavMenu from '\.\/top-nav-menu\.vue'/)
  assert.match(brandVueDemo, /<TopNavMenu brand/)
  assert.match(css, /\.sb-top-nav-demo--brand \.sb-top-nav-demo__header \{[\s\S]*background:\s*var\(--color-primary\)/)
  assert.match(
    css,
    /\.sb-top-nav-demo__action\.arco-btn\.arco-btn-text:not\(\.arco-btn-disabled\):not\(\.arco-btn-loading\):hover,[\s\S]*background:\s*rgba\(255, 255, 255, 0\.12\)/
  )
  assert.match(
    css,
    /\.sb-top-nav-demo--brand \.sb-top-nav-demo__notification \.arco-badge-number \{[\s\S]*box-shadow:\s*0 0 0 2px var\(--color-primary\)/
  )
  assert.match(css, /color:\s*var\(--color-white-text-1\)/)
  assert.match(docs, /## 品牌色模式导航/)
  assert.doesNotMatch(docs, /## 深色模式导航/)
})
