import { Anchor, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Typography.Paragraph>Default</Typography.Paragraph>
      <Anchor
        affix={false}
        direction="horizontal"
      >
        <Anchor.Link href="#Basic" title="Basic" />
        <Anchor.Link href="#Static" title="Static" />
        <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
        <Anchor.Link href="#Affix" title="Affix" />
        <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
        <Anchor.Link href="#Hash-mode" title="Hash mode" />
      </Anchor>

      <Typography.Paragraph style={{marginTop: 32}}>Lineless mode</Typography.Paragraph>
      <Anchor
        affix={false}
        direction="horizontal"
        lineless
      >
        <Anchor.Link href="#Basic" title="Basic" />
        <Anchor.Link href="#Static" title="Static" />
        <Anchor.Link href="#Lineless-mode" title="Lineless mode" />
        <Anchor.Link href="#Affix" title="Affix" />
        <Anchor.Link href="#Scroll-boundary" title="Scroll boundary" />
        <Anchor.Link href="#Hash-mode" title="Hash mode" />
      </Anchor>
    </div>
  );
}
