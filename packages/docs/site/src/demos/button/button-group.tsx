import { Button, Space } from '@sbux/starbucks-design-react';
import {
  IconDown,
  IconLeft,
  IconMessage,
  IconMore,
  IconRight,
  IconSettings,
  IconStar,
} from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Button.Group>
          <Button>Publish</Button>
          <Button icon={<IconDown />} />
        </Button.Group>
        <Button.Group>
          <Button type="secondary">Publish</Button>
          <Button type="secondary" icon={<IconMore />} />
        </Button.Group>
      </Space>
      <Button.Group>
        <Button type="primary">Publish</Button>
        <Button type="primary" icon={<IconDown />} />
      </Button.Group>
      <Space size="large">
        <Button.Group>
          <Button type="primary" icon={<IconLeft />} shape="round" style={{ padding: '0 8px' }}>
            Prev
          </Button>
          <Button type="primary" shape="round" style={{ padding: '0 8px' }}>
            Next
            <IconRight />
          </Button>
        </Button.Group>
        <Button.Group>
          <Button type="primary" icon={<IconStar />} />
          <Button type="primary" icon={<IconMessage />} />
          <Button type="primary" icon={<IconSettings />} />
        </Button.Group>
        <Button.Group>
          <Button type="primary" icon={<IconStar />}>
            Favorite
          </Button>
          <Button type="primary" icon={<IconSettings />}>
            Setting
          </Button>
        </Button.Group>
      </Space>
    </Space>
  );
}
