import { Card, Space, Avatar, Typography } from '@sbux/starbucks-design-react';
import { IconThumbUp, IconShareInternal, IconMore } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Card
      className="card-with-icon-hover"
      style={{ width: 360 }}
      cover={
        <div style={{ height: 204, overflow: 'hidden' }}>
          <img
            style={{ width: '100%', transform: 'translateY(-20px)' }}
            alt="dessert"
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
          />
        </div>
      }
      actions={[
        <span className="icon-hover">
          <IconThumbUp />
        </span>,
        <span className="icon-hover">
          <IconShareInternal />
        </span>,
        <span className="icon-hover">
          <IconMore />
        </span>
      ]}
    >
      <Card.Meta
        avatar={
          <Space>
            <Avatar size={24}>A</Avatar>
            <Typography.Text>Username</Typography.Text>
          </Space>
        }
        title="Card Title"
        description="This is the description"
      />
    </Card>
  );
}
