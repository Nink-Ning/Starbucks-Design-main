import React, {
  type ReactNode,
  useContext,
  useState,
} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {ErrorBoundaryErrorMessageFallback} from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {usePlayground} from '@docusaurus/theme-live-codeblock/client';
import {LiveContext, LiveEditor, LiveError, LivePreview} from 'react-live';

import styles from './styles.module.css';

function CodeIcon(): ReactNode {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m6 4-4 4 4 4M10 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ResetIcon(): ReactNode {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13 8a5 5 0 1 1-1.46-3.54"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13 3.5V7h-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon(): ReactNode {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="5"
        y="5"
        width="8"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 10.5V4a1 1 0 0 1 1-1h6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Loader(): ReactNode {
  return <div>Loading...</div>;
}

function PlaygroundLivePreview(): ReactNode {
  return (
    <BrowserOnly fallback={<Loader />}>
      {() => (
        <>
          <ErrorBoundary
            fallback={(params) => (
              <ErrorBoundaryErrorMessageFallback {...params} />
            )}>
            <LivePreview />
          </ErrorBoundary>
          <LiveError />
        </>
      )}
    </BrowserOnly>
  );
}

function EditorActions(): ReactNode {
  const {reset} = usePlayground();
  const live = useContext(LiveContext);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    const code = live.newCode ?? live.code;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className={styles.editorActions}>
      <button type="button" className={styles.actionButton} onClick={reset}>
        <ResetIcon />
        Reset
      </button>
      <button type="button" className={styles.actionButton} onClick={copyCode}>
        <CopyIcon />
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default function PlaygroundLayout(): ReactNode {
  const [showCode, setShowCode] = useState(false);
  const isBrowser = useIsBrowser();

  return (
    <>
      <div className={styles.previewShell}>
        <div className={styles.previewContent}>
          <PlaygroundLivePreview />
        </div>

        {showCode && (
          <div className={styles.editorShell}>
            <div className={styles.editorHeader}>
              <div className={styles.editorTitle}>实时编辑器</div>
              <EditorActions />
            </div>
            <LiveEditor
              key={String(isBrowser)}
              className={styles.playgroundEditor}
            />
          </div>
        )}

        <button
          type="button"
          className={styles.showCodeButton}
          aria-expanded={showCode}
          onClick={() => setShowCode((visible) => !visible)}>
          <CodeIcon />
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>
    </>
  );
}
