import { Link, Menu, Dropdown } from '@sbux/starbucks-design-react';
import { IconDown } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const Droplist = (
    <Menu>
      <Menu.Item key="1">Beijing</Menu.Item>
      <Menu.Item key="2">Shanghai</Menu.Item>
      <Menu.Item key="3">Guangzhou</Menu.Item>
      <Menu.Item disabled key="4">
        <Link disabled>Shenzhen</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown droplist={Droplist} position="bl">
        <Link style={{ marginRight: 40 }}>
          City
          <IconDown style={{ fontSize: 12, marginLeft: 6 }} />
        </Link>
      </Dropdown>

      <Dropdown droplist={Droplist} position="bl" disabled>
        <Link>
          City
          <IconDown style={{ fontSize: 12, marginLeft: 6 }} />
        </Link>
      </Dropdown>
    </div>
  );
}
