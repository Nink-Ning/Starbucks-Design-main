import { Divider, Typography } from '@sbux/starbucks-design-react';
import { IconFileImage, IconUser, IconPen } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <>
      <div className="divider-demo">
        <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
        <Divider />
        <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
        <Divider
          style={{
            borderBottomStyle: 'dashed'
          }}
        />
        <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
        <Divider
          style={{
            borderBottomWidth: 2,
            borderBottomStyle: 'dotted'
          }}
        />
        <Typography.Paragraph>A design is a plan or specification for the construction of an object.</Typography.Paragraph>
      </div>
      <div className="divider-demo" style={{ marginTop: 48 }}>
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconFileImage />
          </span>
          <div className="content">
            <Typography.Title heading={6}>Image</Typography.Title>May 4, 2010
          </div>
        </div>
        <Divider className="half-divider" />
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconUser />
          </span>
          <div className="content">
            <Typography.Title heading={6}>Avatar</Typography.Title>May 4, 2010
          </div>
        </div>
        <Divider className="half-divider" />
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconPen />
          </span>
          <div className="content">
            <Typography.Title heading={6}>Icon</Typography.Title>May 4, 2010
          </div>
        </div>
      </div>
    </>
  );
}
