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
  ];

  return (
    <List
      grid={{ gutter: 0, span: 6 }}
      dataSource={data}
      bordered={false}
      render={(item, index) => (
        <List.Item key={index}>
          <List
            size="small"
            header={item.title}
            dataSource={item.data}
            render={(item, index) => <List.Item key={index}>{item}</List.Item>}
          />
        </List.Item>
      )}
    />
  );
}
