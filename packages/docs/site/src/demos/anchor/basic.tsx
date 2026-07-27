import { Anchor } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Anchor
      offsetTop={60}
      style={{ backgroundColor: 'var(--color-bg-2)' }}
    >
      <Anchor.Link href="#Basic" title="Basic">
        <Anchor.Link href="#Static" title="Static">
          <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
          <Anchor.Link href="#Affix" title="Affix" />
        </Anchor.Link>
      </Anchor.Link>
      <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
      <Anchor.Link href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
}
