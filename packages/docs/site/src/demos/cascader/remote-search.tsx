import React from 'react';
import { Cascader, Spin, Checkbox, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const genOptions = (keyword) => {
    return !keyword
      ? []
      : [
          {
            label: keyword,
            value: keyword + '-value',
            children: [
              {
                label: `${keyword}-1`,
                value: `${keyword}-value-1`,
              },
              {
                label: `${keyword}-2`,
                value: `${keyword}-value-2`,
              },
            ],
          },
        ];
  };

  function CascaderDemo(props) {
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleSearch = (inputValue) => {
      setLoading(true);
      setTimeout(() => {
        setOptions(genOptions(inputValue));
        setLoading(false);
      }, 200);
    };

    return (
        <Cascader
          placeholder="Please enter ..."
          showSearch
          style={{ width: 300 }}
          options={options}
          onSearch={handleSearch}
          onChange={(_, a) => {
            console.log(a);
          }}
          loading={loading}
          dropdownRender={(menu) => {
            return loading ? (
              <div
                style={{
                  height: 100,
                  width: 300,
                  textAlign: 'center',
                  lineHeight: '100px',
                }}
              >
                <Spin />
              </div>
            ) : (
              menu
            );
          }}
          {...props}
        />
    );
  }

  const [showSearchPanel, setShowSearchPanel] = React.useState(false);

  return <div>
    <div style={{marginBottom: 20}}>
      <Checkbox checked={showSearchPanel} onChange={setShowSearchPanel}>是否以搜索面板展示可选项</Checkbox>
    </div>
    <Space size="large">
      <CascaderDemo showSearch={{ panelMode: showSearchPanel ? 'select' : 'cascader' }} />
      <CascaderDemo  showSearch={{ panelMode: showSearchPanel ? 'select' : 'cascader'}} mode="multiple" />
    </Space>
  </div>
}
