import { Transfer } from '@sbux/starbucks-design-react';
import { IconDelete } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  const styleHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  return (
    <Transfer
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={[
        ({ countTotal, countSelected, checkbox }) => {
          return (
            <div style={styleHeader}>
              {`LEFT ${countSelected}-${countTotal}`}
              {checkbox}
            </div>
          );
        },
        ({ countTotal, countSelected, clear }) => {
          return (
            <div style={styleHeader}>
              {`RIGHT ${countSelected}-${countTotal}`}
              <IconDelete
                style={{ cursor: 'pointer' }}
                onClick={clear}
              />
            </div>
          );
        },
      ]}
    />
  );
}
