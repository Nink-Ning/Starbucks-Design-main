import { Transfer } from '@sbux/starbucks-design-react';
import { IconStar } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  return (
    <Transfer
      render={(item) => (
        <span
          style={
            +item.key % 5 === 1
              ? {
                  color: '#165DFF',
                }
              : {}
          }
        >
          {item.value}
          {+item.key === 7 ? (
            <IconStar
              style={{
                marginLeft: 4,
                color: 'rgb(var(--gold-6))',
              }}
            />
          ) : null}
        </span>
      )}
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={['To-do list', 'Selected list']}
    />
  );
}
