import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Starbucks Design',
  tagline: '基于 Arco Design 的星巴克主题组件库',
  favicon: 'img/favicon.svg',
  url: 'https://pages.scm.starbucks.com',
  baseUrl: '/china/bopfui-starbucks-ui/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } as any,
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],
  clientModules: ['./src/client/resizeObserverErrorFilter.ts'],

  themeConfig: {
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    navbar: {
      title: 'STARBUCKS | Design',
      logo: undefined,
      items: [
        {
          to: '/docs/guide/getting-started',
          label: '全局配置',
          position: 'right',
          className: 'arco-btn arco-btn-text arco-btn-size-default',
        },
        {
          type: 'docSidebar',
          sidebarId: 'components',
          position: 'right',
          label: '基础组件',
          className: 'arco-btn arco-btn-text arco-btn-size-default',
        },
        {
          to: '/docs/business-components',
          label: '业务组件',
          position: 'right',
          className: 'arco-btn arco-btn-text arco-btn-size-default',
        },
        {
          to: '/docs/page-templates',
          label: '页面模板',
          position: 'right',
          className: 'arco-btn arco-btn-text arco-btn-size-default',
        },
        {
          to: '/docs/skills',
          label: 'Skills',
          position: 'right',
          className: 'arco-btn arco-btn-text arco-btn-size-default',
        },
        {
          type: 'html',
          position: 'right',
          className: 'navbar-github-link',
          value:
            '<a href="https://scm.starbucks.com/china/bopfui-starbucks-ui" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.67 0 8.2c0 3.62 2.29 6.69 5.47 7.77.4.08.55-.18.55-.39 0-.19-.01-.84-.01-1.52-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.96-.82-1.16-.28-.16-.68-.55-.01-.56.63-.01 1.08.59 1.23.84.72 1.24 1.87.89 2.33.68.07-.53.28-.89.51-1.09-1.78-.21-3.64-.91-3.64-4.04 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.4 7.4 0 0 1 8 3.98c.68 0 1.36.09 2 .28 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.3.82 2.19 0 3.14-1.87 3.83-3.65 4.04.29.25.54.75.54 1.52 0 1.1-.01 1.98-.01 2.25 0 .21.15.47.55.39A8.1 8.1 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z"/></svg></a>',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Starbucks. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } as any,
};

export default config;
