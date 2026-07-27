import { Radio, Space, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [
    { value: 'Beijing', label: 'Beijing' },
    { value: 'Shanghai', label: 'Shanghai' },
    { value: 'Guangzhou', label: 'Guangzhou', disabled: true },
    { value: 'Shenzhen', label: 'Shenzhen' },
  ];

  const variants = [
    { label: '描边型', variant: 'outline' },
    { label: '主色填充型', variant: 'primary-filled' },
    { label: '默认填充型', variant: 'default-filled' },
  ] as const;

  return (
    <Space direction="vertical" size="large">
      {variants.map((variant) => (
        <div key={variant.variant}>
          <Typography.Text
            style={{ display: 'block', marginBottom: 8, color: 'var(--color-text-secondary)' }}
          >
            {variant.label}
          </Typography.Text>
          <Radio.Group
            variant={variant.variant}
            options={options}
            type="button"
            name={variant.variant}
            defaultValue="Shanghai"
          />
        </div>
      ))}
    </Space>
  );
}
