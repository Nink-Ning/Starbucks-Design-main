import { Card, Link } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Card bordered={false} style={{ width: '100%' }}>
      {new Array(7).fill(null).map((_, index) => {
        const hoverable = index % 2 === 0;
        return (
          <Card.Grid
            key={index}
            hoverable={hoverable}
            style={{
              width: '25%'
            }}
          >
            <Card
              className="card-demo-in-grid"
              style={{ width: '100%' }}
              title="Arco Card"
              extra={<Link>More</Link>}
              bordered={false}
            >
              {new Array(2).fill(null).map((_, index) => (
                <p style={{ margin: 0 }} key={index}>
                  {hoverable ? 'Card allow to hover' : 'Card content'}
                </p>
              ))}
            </Card>
          </Card.Grid>
        );
      })}
    </Card>
  );
}
