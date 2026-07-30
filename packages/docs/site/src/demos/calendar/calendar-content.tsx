import { Badge, Calendar } from '@sbux/starbucks-design-react';

export default function Demo() {
  const badgeStyle = {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Calendar
        defaultValue="2020-03-04"
        style={{ width: '100%' }}
        dateInnerContent={(currentDate) => {
          switch (currentDate.format('YYYY-MM-DD')) {
            case '2020-03-07':
              return (
                <div
                  style={{
                    padding: '0 10px'
                  }}
                >
                  <Badge style={badgeStyle} status="processing" text="Cooking" />
                  <br />
                  <Badge style={badgeStyle} status="success" text="Reading" />
                  <br />
                  <Badge style={badgeStyle} status="warning" text="Sleeping" />
                </div>
              );

            case '2020-03-17':
              return (
                <div style={{ padding: '0 10px' }}>
                  <Badge style={badgeStyle} status="default" text="Coding" />
                  <br />
                  <Badge style={badgeStyle} status="processing" text="Runing" />
                  <br />
                  <Badge style={badgeStyle} status="success" text="Eating" />
                  <br />
                  <Badge style={badgeStyle} status="warning" text="Play games" />
                  <br />
                  <Badge style={badgeStyle} status="error" text="Sleeping" />
                </div>
              );

            default:
              return;
          }
        }}
      />
    </div>
  );
}
