import { useState } from 'react';
import { Tabs, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {

  let count = 5;
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };
  const initTabs = [...new Array(count)].map((x, i) => ({
    title: `Tab ${i + 1}`,
    key: `key${i + 1}`,
    content: `${i + 1}`,
  }));

  const [tabs, setTabs] = useState(initTabs);
  const [activeTab, setActiveTab] = useState('key2');

  const handleAddTab = () => {
    const newTab = {
      title: `New Tab${++count}`,
      key: `new key${count}`,
      content: `${count}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.key);
  };

  const handleDeleteTab = (key) => {
    const index = tabs.findIndex((x) => x.key === key);
    const newTabs = tabs.slice(0, index).concat(tabs.slice(index + 1));

    if (key === activeTab && index > -1 && newTabs.length) {
      setActiveTab(newTabs[index] ? newTabs[index].key : newTabs[index - 1].key);
    }

    if (index > -1) {
      setTabs(newTabs);
    }
  };

  return (
    <Tabs
      editable
      type="card-gutter"
      activeTab={activeTab}
      onAddTab={handleAddTab}
      onDeleteTab={handleDeleteTab}
      onChange={setActiveTab}
    >
      {tabs.map((x, i) => (
        <Tabs.TabPane destroyOnHide key={x.key} title={x.title}>
          <Typography.Paragraph
            style={style}
          >{`Content of Tab Panel ${x.content}`}</Typography.Paragraph>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
