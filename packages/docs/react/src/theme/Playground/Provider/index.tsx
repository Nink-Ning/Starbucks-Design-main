import React, {type ReactNode, useCallback, useMemo, useState} from 'react';
import {LiveProvider} from 'react-live';
import {PlaygroundProvider as PlaygroundProviderComponent} from '@docusaurus/theme-live-codeblock/client';
import {usePrismTheme} from '@docusaurus/theme-common';
import type {Props} from '@theme/Playground/Provider';

function getDemoComponentName(code: string): string | null {
  const functionMatch = code.match(/(?:^|\n)\s*function\s+([A-Z][A-Za-z0-9_]*)\s*\(/);
  if (functionMatch?.[1]) {
    return functionMatch[1];
  }

  const variableMatch = code.match(
    /(?:^|\n)\s*(?:const|let|var)\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(?:\([^)]*\)|[A-Za-z0-9_$]+)?\s*=>/
  );
  return variableMatch?.[1] ?? null;
}

function hasRenderCall(code: string): boolean {
  return /(?:^|\n)\s*render\s*\(/.test(code);
}

function LiveProviderComponent({code, children, ...props}: Props): ReactNode {
  const prismTheme = usePrismTheme();
  const demoComponentName = getDemoComponentName(code);
  const autoNoInline = Boolean(demoComponentName && !hasRenderCall(code));
  const noInline = (props.metastring?.includes('noInline') ?? false) || autoNoInline;

  const transformCode =
    props.transformCode ??
    ((c: string) => {
      if (autoNoInline && demoComponentName) {
        return `${c}\n\nrender(<${demoComponentName} />);`;
      }
      return `${c};`;
    });

  return (
    <LiveProvider
      noInline={noInline}
      theme={prismTheme}
      {...props}
      code={code}
      transformCode={transformCode}>
      {children}
    </LiveProvider>
  );
}

export default function PlaygroundProvider(props: Props): ReactNode {
  const [resetKey, setResetKey] = useState(0);
  const reset = useCallback(() => setResetKey((prev) => prev + 1), []);
  const value = useMemo(() => ({reset}), [reset]);

  return (
    <PlaygroundProviderComponent key={resetKey} value={value}>
      <LiveProviderComponent {...props} />
    </PlaygroundProviderComponent>
  );
}
