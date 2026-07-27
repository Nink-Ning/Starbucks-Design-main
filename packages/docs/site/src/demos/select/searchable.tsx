import { Select, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];
  const foods = [
    {
      label: '南非龙虾',
      value: 'nanfeilongxia',
    },
    {
      label: '新西兰羊排',
      value: 'xinxilanyangpai',
    },
    {
      label: '海鲜烩意面',
      value: 'haixianhuiyimian',
    },
    {
      label: '酱烧豆腐',
      value: 'jiangshaodoufu',
    },
    {
      label: '西红柿炒蛋',
      value: 'xihongshichaodan',
    },
    {
      label: '提拉米苏',
      value: 'tilamisu',
    },
  ];
  return (
    <Space size="large">
      <Select placeholder="Select city" style={{ width: 154 }} allowClear showSearch>
        {cities.map((option, index) => (
          <Select.Option key={option} disabled={index === 3} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select
        style={{ width: 154 }}
        showSearch
        allowClear
        placeholder="Filter option"
        filterOption={(inputValue, option) =>
          option.props.value.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
          option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }
      >
        {foods.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="Retain input value"
        style={{ width: 154 }}
        allowClear
        showSearch={{
          retainInputValue: true,
        }}
      >
        {cities.map((option, index) => (
          <Select.Option key={option} disabled={index === 3} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
