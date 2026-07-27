import { Card, Link, Tabs } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Card
      title="Card with Tab"
      extra={<Link>More</Link>}
      style={{
        width: '100%'
      }}
    >
      <Tabs
        style={{
          maxWidth: 350,
          margin: -15
        }}
      >
        {new Array(4).fill(null).map((_, index) => {
          return (
            <Tabs.TabPane destroyOnHide key={index} title={`Tab ${index}`}>
              <div
                style={{
                  margin: '0px 16px 16px 16px'
                }}
              >
                {`Content ${index}`}
                <br />
                {`Content ${index}`}
                <br />
                {`Content ${index}`}
              </div>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
}
