import { Divider, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const orientations = ['left', 'center', 'right'];

  return (
    <div className="divider-demo">
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider orientation={orientations[0]}>Text</Divider>
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider orientation={orientations[1]}>Text</Divider>
      <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      <Divider orientation={orientations[2]}>Text</Divider>
    </div>
  );
}
