import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://pages.scm.starbucks.com',
  base: '/kning/starbucks-design-main/',
  redirects: {
    '/': '/kning/starbucks-design-main/guide/getting-started/',
  },
  integrations: [
    starlight({
      title: 'Starbucks Design',
      defaultLocale: 'root',
      locales: { root: { label: '简体中文', lang: 'zh-CN' } },
      sidebar: [
        {
          label: '全局配置',
          items: [
            { label: '快速开始', slug: 'guide/getting-started' },
            { label: '主题定制', slug: 'guide/theme' },
            { label: '全局样式', slug: 'guide/global-style' },
            { label: '更新日志', slug: 'guide/changelog' },
          ],
        },
        {
          label: '基础组件',
          items: [
            { label: '通用', autogenerate: { directory: 'components/general' } },
            { label: '布局', autogenerate: { directory: 'components/layout' } },
            { label: '导航', autogenerate: { directory: 'components/navigation' } },
            { label: '数据录入', autogenerate: { directory: 'components/data-entry' } },
            { label: '数据展示', autogenerate: { directory: 'components/data-display' } },
            { label: '反馈', autogenerate: { directory: 'components/feedback' } },
            { label: '其他', autogenerate: { directory: 'components/other' } },
          ],
        },
        {
          label: '业务组件',
          items: [{ label: '业务组件', slug: 'business-components' }],
        },
        {
          label: '页面模板',
          items: [
            {
              label: '列表页',
              items: [{ label: '客户标签页', slug: 'templates/list/tag-list' }],
            },
            { label: '表单页', slug: 'templates/form' },
            { label: '详情页', slug: 'templates/detail' },
            { label: '结果页', slug: 'templates/result' },
          ],
        },
        {
          label: 'Skills',
          items: [{ label: 'Skills', slug: 'guide/ai-skills' }],
        },
      ],
      components: {
        Header: './src/components/Header.astro',
        Sidebar: './src/components/Sidebar.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        // Adds <ClientRouter /> to enable view transitions (SPA-style DOM swap
        // instead of full-page reload). See src/components/Head.astro.
        Head: './src/components/Head.astro',
      },
      customCss: [
        '../../starbucks-design-react/src/theme.css',
        './src/styles/framework.css',
        './src/styles/demo.css',
        './src/styles/arco-isolation.css',
        // Brand theme last so it wins the cascade over the files above.
        './src/styles/theme.css',
        './src/styles/legacy-docs.css',
      ],
      head: [
        {
          tag: 'script',
          // `apply` re-runs on astro:after-swap because the view-transition swap
          // copies <html> attributes from the incoming SSR document, dropping the
          // JS-set data-framework. after-swap fires pre-paint, so the framework
          // blocks never flash the wrong side.
          content: `(function(){function apply(){var p=new URLSearchParams(location.search).get('framework');var s=p||localStorage.getItem('sb-framework')||'react';if(s!=='react'&&s!=='vue')s='react';document.documentElement.dataset.framework=s;if(p)localStorage.setItem('sb-framework',s);}apply();document.addEventListener('astro:after-swap',apply);})();`,
        },
        {
          // Sync Arco component demos' dark-mode hooks with Starlight's theme toggle.
          // Starlight's own inline ThemeProvider/ThemeSelect scripts always resolve
          // 'auto' to a concrete 'light'/'dark' before stamping <html data-theme>,
          // so we only ever need to react to those two concrete values here.
          //
          // Two separate attributes are required because the two Starbucks/Arco
          // packages listen to different hooks for dark-mode CSS:
          //   - Arco's own built-in dark styles key off  body[arco-theme="dark"]
          //   - The Starbucks Figma dark tokens key off  [data-arco-theme="dark"]
          tag: 'script',
          content: `(function () {
  function syncArcoTheme() {
    // <head> scripts run before <body> is parsed; bail until it exists.
    if (!document.body) return;
    var isDark = document.documentElement.dataset.theme === 'dark';
    ['arco-theme', 'data-arco-theme'].forEach(function (attr) {
      if (isDark) document.body.setAttribute(attr, 'dark');
      else document.body.removeAttribute(attr);
    });
  }
  // Resolve the user's theme the same way Starlight does: an explicit stored
  // 'light'/'dark' wins, otherwise fall back to the OS preference.
  function resolveTheme() {
    var s = localStorage.getItem('starlight-theme');
    return s === 'light' || s === 'dark'
      ? s
      : matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  // Initial sync, once <body> exists (respects the theme Starlight already
  // applied to <html> pre-paint from localStorage / prefers-color-scheme).
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncArcoTheme);
  } else {
    syncArcoTheme();
  }
  // View-transition navigation. The built HTML hardcodes <html data-theme="dark">
  // as its SSR default; on a full load Starlight's pre-paint inline script fixes
  // it from localStorage, but that script does NOT re-run on a VT swap, and
  // swapRootAttributes copies the dark SSR value onto the live <html>. Left
  // alone the site flips to dark on every navigation. astro:after-swap fires
  // pre-paint, so re-applying the resolved theme here (and re-syncing the arco
  // body attrs, since <body> was just replaced) keeps the theme stable with no
  // flash. Setting data-theme also triggers the MutationObserver below.
  document.addEventListener('astro:after-swap', function () {
    var t = resolveTheme();
    if (document.documentElement.dataset.theme !== t) {
      document.documentElement.dataset.theme = t;
    }
    syncArcoTheme();
  });
  // Later toggles: Starlight's <starlight-theme-select> updates
  // <html data-theme> directly, so observing that attribute catches every
  // theme change (manual toggle and OS-level 'auto' changes alike).
  new MutationObserver(syncArcoTheme).observe(document.documentElement, {
    attributeFilter: ['data-theme'],
  });
})();`,
        },
        {
          // Preserve runtime-injected component CSS across view-transition swaps.
          //
          // The demo islands are client:only, so Arco's component stylesheets
          // (the ~1MB of `.arco-*` / `.arco-v-*` rules incl. icon sizing) are
          // never server-rendered — they're injected into <head> at runtime when
          // an island mounts (verified: 0 arco-icon rules in the built HTML).
          // Astro's swapHeadElements() keeps only persisted elements and
          // stylesheet <link>s whose href is in the incoming doc; a bare runtime
          // <style> matches neither and is dropped on every navigation. Arco's
          // inject-once guard is module-scoped and survives the swap, so it does
          // NOT re-inject on the next page → components render unstyled (icons
          // balloon to intrinsic size, ~80 per component page).
          //
          // On astro:before-swap we mark each such live <style> (any head style
          // whose content is absent from the incoming document) with a persist
          // id and plant a matching empty marker in the incoming head, so
          // persistedHeadElement() matches by id and keeps our already-parsed
          // element in place — no re-parse, no duplication; the marker is
          // discarded by the swap. Registered once; the listener lives on the
          // persistent document.
          tag: 'script',
          content: `(function () {
  document.addEventListener('astro:before-swap', function (e) {
    var newHead = e.newDocument.head;
    var incoming = {};
    newHead.querySelectorAll('style').forEach(function (s) {
      incoming[s.textContent.length + ':' + s.textContent.slice(0, 120)] = true;
    });
    document.head.querySelectorAll('style').forEach(function (style) {
      var sig = style.textContent.length + ':' + style.textContent.slice(0, 120);
      if (incoming[sig]) return; // incoming SSR document already carries it
      var id = style.getAttribute('data-astro-transition-persist');
      if (!id) {
        window.__sbStyleSeq = (window.__sbStyleSeq || 0) + 1;
        id = 'sb-arco-style-' + window.__sbStyleSeq;
        style.setAttribute('data-astro-transition-persist', id);
      }
      var marker = e.newDocument.createElement('style');
      marker.setAttribute('data-astro-transition-persist', id);
      newHead.appendChild(marker);
    });
  });
})();`,
        },
      ],
    }),
    react({ include: ['**/demos/**/*.tsx'] }),
    vue({ appEntrypoint: '/src/vue-app' }),
  ],
});
