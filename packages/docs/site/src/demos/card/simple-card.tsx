import { Card, Link, Space, Avatar, Typography, Layout } from '@sbux/starbucks-design-react';
import { IconArrowRight } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const Content = ({ children }) => {
    return (
      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Space>
          <Avatar
            style={{
              backgroundColor: '#165DFF'
            }}
            size={28}
          >
            A
          </Avatar>
          <Typography.Text>Username</Typography.Text>
        </Space>
        {children}
      </Space>
    );
  };

  return (
    <>
      <Card hoverable style={{ width: 360, marginBottom: 20 }}>
        <Layout.Content>
          <Link>More</Link>
        </Layout.Content>
      </Card>
      <Card className="card-with-icon-hover" hoverable style={{ width: 360 }}>
        <Layout.Content>
          <span className="icon-hover">
            <IconArrowRight
              style={{
                cursor: 'pointer'
              }}
            />
          </span>
        </Layout.Content>
      </Card>
    </>
  );
}
