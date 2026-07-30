import { Watermark } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Watermark
      content={['Starbucks DesignKit', 'Evidence-based']}
      style={{
        display: 'block',
        width: '100%',
        minWidth: '100%',
        flex: '1 1 100%',
        alignSelf: 'stretch'
      }}
      gap={[84, 64]}
      offset={[18, 16]}
      fontStyle={{
        color: 'rgba(0, 120, 84, 0.24)',
        fontSize: 14,
        fontWeight: 700
      }}
    >
      <div
        style={{
          width: '100%',
          minHeight: 300,
          boxSizing: 'border-box',
          position: 'relative',
          background: 'rgba(0, 120, 84, 0.03)'
        }}
      >
        <span style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
          Starbucks DesignKit Evidence-based
        </span>
      </div>
    </Watermark>
  );
}
