import { Watermark } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Watermark
      content="Starbucks DesignKit"
      style={{
        display: 'block',
        width: '100%',
        minWidth: '100%',
        flex: '1 1 100%',
        alignSelf: 'stretch'
      }}
      gap={[72, 56]}
      offset={[16, 12]}
      fontStyle={{
        color: 'rgba(0, 120, 84, 0.28)',
        fontSize: 16,
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
          Starbucks DesignKit
        </span>
      </div>
    </Watermark>
  );
}
