import { Watermark } from '@sbux/starbucks-design-react';

const markImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="148" height="24" viewBox="0 0 148 24"><text x="0" y="18" fill="%23007854" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="800" letter-spacing="2">STARBUCKS</text></svg>';

export default function Demo() {
  return (
    <Watermark
      image={markImage}
      style={{
        display: 'block',
        width: '100%',
        minWidth: '100%',
        flex: '1 1 100%',
        alignSelf: 'stretch'
      }}
      width={148}
      height={24}
      gap={[92, 64]}
      offset={[18, 16]}
    >
      <div
        style={{
          width: '100%',
          minHeight: 300,
          boxSizing: 'border-box',
          background: 'rgba(0, 120, 84, 0.03)'
        }}
      />
    </Watermark>
  );
}
