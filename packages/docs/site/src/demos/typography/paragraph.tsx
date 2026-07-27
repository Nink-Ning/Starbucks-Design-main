import { Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Typography>
      <Typography.Title heading={5}>Default</Typography.Title>
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design. In some cases, the direct construction of an
        object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may
        also be considered to be a design activity.
      </Typography.Paragraph>
      <Typography.Title heading={5}>Secondary</Typography.Title>
      <Typography.Paragraph type="secondary">
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design. In some cases, the direct construction of an
        object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may
        also be considered to be a design activity.
      </Typography.Paragraph>
      <Typography.Title heading={5}>Spacing default</Typography.Title>
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design. In some cases, the direct construction of an
        object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may
        also be considered to be a design activity.
      </Typography.Paragraph>
      <Typography.Title heading={5}>Spacing close</Typography.Title>
      <Typography.Paragraph type="secondary" spacing="close">
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design.
      </Typography.Paragraph>
    </Typography>
  );
}
