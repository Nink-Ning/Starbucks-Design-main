import React, {type ReactNode, useState} from 'react';
import PlaygroundProvider from '@theme/Playground/Provider';
import PlaygroundLayout from '@theme/Playground/Layout';

import type {Props} from '@theme/Playground';
import containerStyles from './Container/styles.module.css';

export default function Playground({
  children,
  transformCode,
  position,
  metastring,
  ...props
}: Props): ReactNode {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className={containerStyles.playgroundContainer}>
      <PlaygroundProvider
        code={children}
        transformCode={transformCode}
        metastring={metastring}
        {...props}>
        <PlaygroundLayout
          position={position}
          showCode={showCode}
          onToggleCode={() => setShowCode((visible) => !visible)}
        />
      </PlaygroundProvider>
    </div>
  );
}
