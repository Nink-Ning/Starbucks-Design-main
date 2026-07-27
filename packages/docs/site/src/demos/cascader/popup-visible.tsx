import React from 'react';
import { Cascader, Button, Link } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
            },
            {
              value: 'haidian',
              label: 'Haidian',
            },
            {
              value: 'fengtai',
              label: 'fengtai',
            },
            {
              value: 'shijingshan',
              label: 'Shijingshan',
            },
            {
              value: 'mentougou',
              label: 'Mentougou',
            },
            {
              value: 'fangshan',
              label: 'Fangshan',
            },
            {
              value: 'tongzhou',
              label: 'Tongzhou',
            },
            {
              value: 'shunyi',
              label: 'Shunyi',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
    {
      value: 'guangzhou',
      label: 'guangzhou',
    },
    {
      value: 'shenzhen',
      label: 'Shenzhen',
    },
    {
      value: 'hangzhou',
      label: '杭州',
    },
  ];

  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <p>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          Show Menu
        </Button>
      </p>
      <Cascader
        style={{ width: 300, marginTop: 20 }}
        placeholder="Please select ..."
        popupVisible={visible}
        trigger={[]}
        onVisibleChange={setVisible}
        triggerProps={{
          clickOutsideToClose: false,
        }}
        allowClear
        options={options}
        renderFooter={() => {
          return (
            <Link
              onClick={() => {
                setVisible(false);
              }}
            >
              Close
            </Link>
          );
        }}
      />
    </div>
  );
}
