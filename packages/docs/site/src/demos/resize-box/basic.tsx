import { ResizeBox, Typography, Divider } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <ResizeBox
        directions={['right', 'bottom']}
        style={{
          width: 500,
          minWidth: 100,
          maxWidth: '100%',
          height: 200,
          textAlign: 'center',
        }}
      >
        <Typography.Paragraph>We are building the future of content discovery and creation.</Typography.Paragraph>
        <Divider />
        <Typography.Paragraph>
          ByteDance's content platforms enable people to enjoy content powered by AI technology. We
          inform, entertain, and inspire people across language, culture and geography.
        </Typography.Paragraph>
        <Divider>ByteDance</Divider>
        <Typography.Paragraph>Yiming Zhang is the founder and CEO of ByteDance.</Typography.Paragraph>
      </ResizeBox>
    </div>
  );
}
