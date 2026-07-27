import { Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Typography style={{ marginTop: -40 }}>
      <Typography.Title>Design system</Typography.Title>
      <Typography.Paragraph>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a prototype, product or process.
        The verb to design expresses the process of developing a design.
      </Typography.Paragraph>
      <Typography.Paragraph>
        In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some
        engineering, coding, and graphic design) may also be considered
        <Typography.Text bold>to be a design activity.</Typography.Text>
      </Typography.Paragraph>
      <Typography.Title heading={2}>ArcoDesign</Typography.Title>
      <Typography.Paragraph>
        The ArcoDesign component library defines a set of default particle variables, and a custom theme is to
        <Typography.Text mark>customize</Typography.Text> and <Typography.Text underline>overwrite</Typography.Text> this variable list.
      </Typography.Paragraph>
      <Typography.Paragraph blockquote>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process, or the result of that plan or specification in the form of a <Typography.Text code>prototype</Typography.Text>
        <Typography.Text code>product</Typography.Text> or
        <Typography.Text code>process</Typography.Text>. The verb to design expresses the process of developing a design.
      </Typography.Paragraph>
      <Typography.Paragraph mark underline delete>
        A design is a plan or specification for the construction of an object or system or for the implementation of an
        activity or process.
      </Typography.Paragraph>
      <Typography.Paragraph>
        <ul>
          <li>
            Architectural blueprints
            <ul>
              <li>Architectural blueprints</li>
            </ul>
          </li>
          <li>Engineering drawings</li>
          <li>Business processes</li>
        </ul>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <ol>
          <li>Architectural blueprints</li>
          <li>Engineering drawings</li>
          <li>Business processes</li>
        </ol>
      </Typography.Paragraph>
    </Typography>
  );
}
