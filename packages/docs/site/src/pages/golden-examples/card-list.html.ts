import goldenExampleHtml from '../../../../../../distribution/designkit-starter-v1/examples/multi-select-card-list.html?raw';

export const prerender = true;

const docsThemeBootstrap = `
  <script id="designkit-docs-card-list-theme-bootstrap">
    (() => {
      let theme = 'light';
      let transitionLayer = null;

      try {
        transitionLayer = window.frameElement?.closest('.sb-theme-transition-layer');
        const transitionTheme = transitionLayer?.getAttribute('data-theme');
        const docsTheme = window.parent.document.documentElement.dataset.theme;
        theme = (transitionTheme || docsTheme) === 'dark' ? 'dark' : 'light';
      } catch {}

      if (transitionLayer) {
        try {
          const sourceFrame = [...window.parent.document.querySelectorAll(
            'iframe[data-golden-example-frame]',
          )].find((frame) => !frame.closest('.sb-theme-transition-layer'));
          const sourceDocument = sourceFrame?.contentDocument;
          const sourceRoot = sourceDocument?.querySelector('#root');
          const css = [...(sourceDocument?.styleSheets || [])]
            .flatMap((styleSheet) => {
              try {
                return [...styleSheet.cssRules];
              } catch {
                return [];
              }
            })
            .filter((rule) => !(rule instanceof CSSFontFaceRule))
            .map((rule) => rule.cssText)
            .join('\\n')
            .replaceAll('</style', '<\\/style');

          if (sourceRoot && css) {
            document.open();
            document.write(
              '<!doctype html><html data-theme="' + theme + '"><head><style>' + css
              + '</style></head><body data-theme="' + theme + '"'
              + (theme === 'dark' ? ' arco-theme="dark" data-arco-theme="dark"' : '')
              + '>' + sourceRoot.outerHTML + '</body></html>',
            );
            document.close();
            window.stop();
            return;
          }
        } catch {}
      }

      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;

      const syncBodyTheme = () => {
        if (!document.body) return false;

        document.body.dataset.theme = theme;
        ['arco-theme', 'data-arco-theme'].forEach((attribute) => {
          if (theme === 'dark') document.body.setAttribute(attribute, 'dark');
          else document.body.removeAttribute(attribute);
        });
        return true;
      };

      if (!syncBodyTheme()) {
        const bodyObserver = new MutationObserver(() => {
          if (!syncBodyTheme()) return;
          bodyObserver.disconnect();
        });
        bodyObserver.observe(document.documentElement, { childList: true });
      }
    })();
  <\/script>
`;

const docsEmbedStyles = `
  <style id="designkit-docs-card-list-embed">
    :root {
      --dk-page-max-width: 100%;
      --dk-card-min-width: 360px;
      --dk-page-gutter: 16px;
      color-scheme: light;
    }

    html,
    body,
    #root {
      min-height: 0;
    }

    body[arco-theme='dark'] {
      color-scheme: dark;
    }

    .dk-card-grid {
      align-content: start;
      align-items: start;
      grid-auto-rows: max-content;
      grid-template-columns: repeat(
        auto-fill,
        minmax(min(100%, var(--dk-card-min-width)), 1fr)
      );
    }

    .dk-page__section {
      align-content: start;
      min-height: var(--dk-docs-preview-min-height, 0px);
    }

    .dk-card {
      border-radius: 12px;
    }

    .dk-card__content {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    body[arco-theme='dark'] .dk-card__price {
      color: var(--color-text-1, rgba(255, 255, 255, 0.9));
    }

    @media (max-width: 920px) {
      .dk-card-toolbar-row {
        align-items: center;
        flex-wrap: wrap;
        row-gap: var(--spacing-4, 8px);
      }

      .dk-card-toolbar-row .dk-card-toolbar {
        display: contents;
      }

      .dk-card-toolbar > .sbux-table-toolbar__controls {
        width: 100%;
        flex: 1 1 100%;
        margin-inline-start: 0;
      }
    }
  </style>
`;

const previewDocument = goldenExampleHtml
  .replace(
    "useState(() => new Set(['product-1', 'product-2', 'product-3']))",
    'useState(() => new Set())',
  )
  .replace(
    '../runtime/starbucks-react.css',
    'runtime/starbucks-react.css',
  )
  .replace(
    '../runtime/starbucks-react.umd.js',
    'runtime/starbucks-react.umd.js',
  )
  .replace(
    'https://unpkg.com/@arco-design/web-react-icon@2.66.15/dist/arco-icon.min.js',
    'https://unpkg.com/@arco-design/web-react@2.66.15/dist/arco-icon.min.js',
  )
  .replace('</head>', `${docsEmbedStyles}</head>`)
  .replace('<head>', `<head>${docsThemeBootstrap}`);

export function GET() {
  return new Response(previewDocument, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
