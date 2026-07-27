import { List } from '@sbux/starbucks-design-react';

export default function Demo() {
  const data = [
    {
      title: 'Platform',
      data: ['iOS', 'Android', 'Web'],
    },
    {
      title: 'Framework',
      data: ['Angular', 'Vue', 'React'],
    },
    {
      title: 'Language',
      data: ['C++', 'JavaScript', 'Python'],
    },
    {
      title: 'Component',
      data: ['Button', 'Breadcrumb', 'Transfer'],
    },
    {
      title: 'Design',
      data: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Plugin',
      data: ['Edu Tools', 'BashSupport', 'GitToolBox'],
    },
    {
      title: 'Platform',
      data: ['iOS', 'Android', 'Web'],
    },
    {
      title: 'Framework',
      data: ['Angular', 'Vue', 'React'],
    },
    {
      title: 'Language',
      data: ['C++', 'JavaScript', 'Python'],
    },
  ];

  return (
    <List
      grid={{
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6,
      }}
      dataSource={data}
      bordered={false}
      render={(item, index) => (
        <List.Item key={index}>
          <List
            header={item.title}
            dataSource={item.data}
            render={(item, index) => <List.Item key={index}>{item}</List.Item>}
          />
        </List.Item>
      )}
    />
  );
}
