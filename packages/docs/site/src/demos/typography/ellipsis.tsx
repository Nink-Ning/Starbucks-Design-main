import { Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const mockText =
    'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';
  const mockTitle =
    ' A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.';

  return (
    <div>
      <Typography.Title heading={4} ellipsis={{ wrapper: 'span' }}>
        {mockTitle}
      </Typography.Title>
      <Typography.Paragraph ellipsis={{ rows: 2, showTooltip: true, expandable: true, wrapper: 'span' }}>
        {mockText}
      </Typography.Paragraph>
      <Typography.Paragraph ellipsis={{ suffix: '---width: 100%', wrapper: 'span' }}>{mockTitle}</Typography.Paragraph>
    </div>
  );
}
