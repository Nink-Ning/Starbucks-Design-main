import { useState } from 'react';
import { ResizeBox, Typography } from '@sbux/starbucks-design-react';
import { IconDoubleLeft, IconDoubleRight } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const panes = [
    {
      size: 0.2,
      collapsible: {
        prev: true,
      },
    },
    {
      size: 0.4,
      min: '50px',
    },
    {
      resizable: false,
      collapsible: {
        prev: {
          // 自定义伸缩杆向前快速收缩触发器
          icon: <IconDoubleLeft />,
          onClick: (_, collapsed, status, activeIndex) => {
            console.log('快速收缩：', collapsed, status, activeIndex);
          },
        },
        next: {
          icon: <IconDoubleRight />,
          onClick: (_, collapsed, status, activeIndex) => {
            console.log('快速收缩：', collapsed, status, activeIndex);
          },
        },
      },
      // 自定义伸缩杆
      trigger: (prev, resize, next) => {
        return (
          <div className="resizebox-split-group-demo-trigger">
            {prev}
            {resize}
            {next}
          </div>
        );
      },
    },
    {},
  ];
  const verticalPanes = [
    {
      collapsible: true,
    },
    {
      min: 0.1,
      collapsible: {
        next: true,
      },
    },
    {},
  ];

  const HorizontalSplitGroup = () => {
    const [offsets, setOffsets] = useState([]);
    return (
      <ResizeBox.SplitGroup
        onMoving={(_, sizes) => setOffsets(sizes)}
        className="resizebox-split-group-demo-horizontal"
        panes={panes.map((obj, index) => ({
          content: (
            <div className="resizebox-split-group-demo-content">
              <Typography.Paragraph>
                <Typography.Paragraph>
                  <Typography.Text mark>pane {index}</Typography.Text>
                  <br />
                  <Typography.Text code>min：{obj.min || 0}</Typography.Text>
                  <br />
                  <Typography.Text code>size： {obj.size || 'not set'}</Typography.Text>
                  <br />
                  <Typography.Text code>offset：{offsets[index] || 'initial'}</Typography.Text>
                </Typography.Paragraph>
              </Typography.Paragraph>
            </div>
          ),
          ...obj,
        }))}
      />
    );
  };

  const VerticalSplitGroup = () => {
    return (
      <ResizeBox.SplitGroup
        className="resizebox-split-group-demo-vertical"
        direction="vertical"
        panes={verticalPanes.map((obj, index) => ({
          content: (
            <div className="resizebox-split-group-demo-content">
              <Typography.Text mark>pane {index}</Typography.Text>
            </div>
          ),
          ...obj,
        }))}
      />
    );
  };

  return (
    <ResizeBox.SplitGroup
      direction="vertical"
      className="resizebox-split-group-demo"
      panes={[
        {
          content: <HorizontalSplitGroup />,
          size: 0.4,
        },
        {
          content: <VerticalSplitGroup />,
        },
      ]}
    />
  );
}
