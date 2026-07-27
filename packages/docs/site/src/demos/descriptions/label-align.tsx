import { Descriptions } from '@sbux/starbucks-design-react';

export default function Demo() {
  const data = [
    {
      label: 'Name',
      value: 'Socrates',
    },
    {
      label: 'Mobile',
      value: '123-1234-1234',
    },
    {
      label: 'Residence',
      value: 'Beijing',
    },
    {
      label: 'Hometown',
      value: 'Beijing',
    },
    {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing',
    },
  ];

  return (
    <div>
      <Descriptions
        colon=" :"
        title="User Info"
        data={data}
        labelStyle={{ textAlign: 'right' }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="User Info" data={data} layout="inline-vertical" />
    </div>
  );
}
