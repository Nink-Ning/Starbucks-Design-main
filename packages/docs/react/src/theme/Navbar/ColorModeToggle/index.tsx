import React, {type ReactNode} from 'react';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import type {Props} from '@theme/Navbar/ColorModeToggle';

function MoonIcon(): ReactNode {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="navbar-theme-button__icon">
      <path
        d="M13.42 10.43A5.88 5.88 0 0 1 5.57 2.58a5.88 5.88 0 1 0 7.85 7.85Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function SunIcon(): ReactNode {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="navbar-theme-button__icon">
      <path
        d="M8 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0-3v1.2M8 13.3v1.2M3.4 3.4l.85.85m7.5 7.5.85.85M1.5 8h1.2m10.6 0h1.2M3.4 12.6l.85-.85m7.5-7.5.85-.85"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function NavbarColorModeToggle({className}: Props): ReactNode {
  const isBrowser = useIsBrowser();
  const {disableSwitch} = useThemeConfig().colorMode;
  const {colorMode, setColorMode} = useColorMode();
  const location = useLocation();
  const reactUrl = useBaseUrl('/docs/components/general/button');
  const vueBaseUrl = useBaseUrl('/vue/');
  const vueUrl =
    isBrowser && window.location.hostname === 'localhost'
      ? 'http://localhost:3001/kning/starbucks-design-main/vue/'
      : vueBaseUrl;

  if (disableSwitch) {
    return null;
  }

  const isDark = colorMode === 'dark';
  const nextMode = isDark ? 'light' : 'dark';
  const label = isDark ? '暗色' : '亮色';
  const title = isDark ? '切换到亮色模式' : '切换到暗色模式';
  const isVue = location.pathname.includes('/vue/');

  const handleColorModeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const updateColorMode = () => {
      setColorMode(nextMode);
    };

    if (!isBrowser || !('startViewTransition' in document)) {
      updateColorMode();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.style.setProperty('--sbux-theme-transition-x', `${x}px`);
    document.documentElement.style.setProperty('--sbux-theme-transition-y', `${y}px`);
    document.documentElement.style.setProperty(
      '--sbux-theme-transition-radius',
      `${endRadius}px`,
    );
    document.documentElement.dataset.themeTransition = nextMode;
    const transition = (document as Document & {
      startViewTransition: (callback: () => void) => {finished: Promise<void>};
    }).startViewTransition(updateColorMode);

    transition.finished.finally(() => {
      delete document.documentElement.dataset.themeTransition;
      document.documentElement.style.removeProperty('--sbux-theme-transition-x');
      document.documentElement.style.removeProperty('--sbux-theme-transition-y');
      document.documentElement.style.removeProperty('--sbux-theme-transition-radius');
    });
  };

  return (
    <div className={['navbar-theme-button-wrap', className].filter(Boolean).join(' ')}>
      <div className="navbar-framework-switch" role="radiogroup" aria-label="切换组件库框架">
        <a
          className={[
            'navbar-framework-switch__option',
            !isVue ? 'navbar-framework-switch__option--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          role="radio"
          aria-checked={!isVue}
          aria-label="切换到 React 文档"
          title="React"
          href={reactUrl}
        >
          <span
            className="navbar-framework-switch__icon navbar-framework-switch__icon--react"
            aria-hidden="true"
          />
          <span className="navbar-framework-switch__text">React</span>
        </a>
        <a
          className={[
            'navbar-framework-switch__option',
            isVue ? 'navbar-framework-switch__option--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          role="radio"
          aria-checked={isVue}
          aria-label="切换到 Vue 文档"
          title="Vue"
          href={vueUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span
            className="navbar-framework-switch__icon navbar-framework-switch__icon--vue"
            aria-hidden="true"
          />
          <span className="navbar-framework-switch__text">Vue</span>
        </a>
      </div>
      <button
        type="button"
        className={[
          'clean-btn navbar-theme-button',
          isDark ? 'navbar-theme-button--dark' : 'navbar-theme-button--light',
        ].join(' ')}
        disabled={!isBrowser}
        title={title}
        aria-label={title}
        onClick={handleColorModeChange}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
        <span>{label}</span>
      </button>
    </div>
  );
}
