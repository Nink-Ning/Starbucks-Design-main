import React from 'react';
import { Form, Radio, Switch, Table } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  defaultData = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      checkAll: true,
      border: true,
      borderCell: false,
      hover: true,
      stripe: false,
      loading: false,
      showHeader: true,
      fixedHeader: false,
      no_data: false,
      size: 'default',
      pagePosition: 'br',
    };
  }

  onChange = (type, checked) => {
    this.setState({
      [type]: checked,
    });
  };

  render() {
    const {
      checkbox,
      borderCell,
      checkAll,
      border,
      hover,
      stripe,
      loading,
      showHeader,
      fixedHeader,
      no_data,
      size,
      pagePosition,
    } = this.state;

    const data = no_data ? [] : this.defaultData;

    return (
      <div>
        <div>
          <Form layout="inline">
            <Form.Item label="Border" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'border')} checked={border} />
            </Form.Item>
            <Form.Item label="Border Cell" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'borderCell')}
                checked={borderCell}
              />
            </Form.Item>
            <Form.Item label="Hover" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'hover')} checked={hover} />
            </Form.Item>
            <Form.Item label="Stripe" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'stripe')} checked={stripe} />
            </Form.Item>
            <Form.Item label="Checkbox" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'checkbox')}
                checked={checkbox}
              />
            </Form.Item>
            <Form.Item label="Check All" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'checkAll')}
                checked={checkAll}
              />
            </Form.Item>
            <Form.Item label="Loading" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'loading')}
                checked={loading}
              />
            </Form.Item>
            <Form.Item label="Table Header" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'showHeader')}
                checked={showHeader}
              />
            </Form.Item>
            <Form.Item label="Header fixed" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'fixedHeader')}
                checked={fixedHeader}
              />
            </Form.Item>
            <Form.Item label="No data" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'no_data')}
                checked={no_data}
              />
            </Form.Item>
            <Form.Item label="Size" colon={false}>
              <Radio.Group
                type="button"
                options={['default', 'middle', 'small', 'mini']}
                value={size}
                onChange={this.onChange.bind(this, 'size')}
              />
            </Form.Item>
            <Form.Item label="Pagination position" colon={false}>
              <Radio.Group
                type="button"
                options={[
                  {
                    label: 'BottomRight',
                    value: 'br',
                  },
                  {
                    label: 'BottomLeft',
                    value: 'bl',
                  },
                  {
                    label: 'TopRight',
                    value: 'tr',
                  },
                  {
                    label: 'TopLeft',
                    value: 'tl',
                  },
                  {
                    label: 'TopCenter',
                    value: 'topCenter',
                  },
                  {
                    label: 'BottomCenter',
                    value: 'bottomCenter',
                  },
                ]}
                value={pagePosition}
                onChange={this.onChange.bind(this, 'pagePosition')}
              />
            </Form.Item>
          </Form>
        </div>
        <div>
          <Table
            columns={this.columns}
            data={data}
            {...this.state}
            rowSelection={
              checkbox && {
                type: 'checkbox',
                checkAll: checkAll,
              }
            }
            scroll={fixedHeader ? { y: 120 } : {}}
            style={{ marginTop: 10, }}
            pagination={{ pageSize: 5, }}
          />
        </div>
      </div>
    );
  }
}
