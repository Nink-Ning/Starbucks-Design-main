import { Button, Dropdown, Menu } from '@sbux/starbucks-design-react';
import { IconDown } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const data = [
    ['Beijing', ['Haidian', 'Chaoyang', 'Daxing']],
    ['Shanghai', ['Pudong', 'Huangpu', 'Xuhui']],
    ['Guangzhou', ['Baiyun', 'Tianhe', 'Fanyu']],
    ['Shenzhen', ['Futian', 'Luohu', 'Nanshan']],
  ];
  const dropList = (
    <Menu>
      {data.map((city, outerIndex) => {
        if (city.length > 1) {
          const districts = city[1];
          return (
            <Menu.SubMenu key={outerIndex} title={<span>{city[0]}</span>}>
              {districts.map((district, innerIndex) => {
                return (
                  <Menu.Item key={`${outerIndex}_${innerIndex}`}>{districts[innerIndex]}</Menu.Item>
                );
              })}
            </Menu.SubMenu>
          );
        }

        return <Menu.Item key={outerIndex}>{city[0]}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <div className="dropdown-demo">
      <Dropdown trigger="click" droplist={dropList} position="bl">
        <Button type="text">
          Click
          <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}
