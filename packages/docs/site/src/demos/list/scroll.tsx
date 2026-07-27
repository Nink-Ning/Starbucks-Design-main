import { useState, useEffect } from 'react';
import { List, Avatar, Spin } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [mockData, setMockData] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(<Spin loading={true} />);

  const fetchData = (currentPage) => {
    if (currentPage > 10) {
      setScrollLoading('No more data');
    } else {
      fetch('https://randomuser.me/api/?results=10')
        .then((res) => res.json())
        .then((data) => {
          setMockData((mockData) => mockData.concat(...data.results));
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);
  return (
    <List
      style={{ width: 600, maxHeight: 320 }}
      scrollLoading={scrollLoading}
      onReachBottom={(currentPage) => fetchData(currentPage)}
      dataSource={mockData}
      render={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={
              <Avatar shape="square">
                <img alt="avatar" src={item.picture.thumbnail} />
              </Avatar>
            }
            title={`${item.name.first} ${item.name.last}`}
            description={item.email}
          />
        </List.Item>
      )}
    />
  );
}
