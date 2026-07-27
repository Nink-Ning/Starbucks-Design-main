import { useState } from 'react';
import { Button, Dropdown, Input, Menu, Pagination, Space, Table, Tag } from '@sbux/starbucks-design-react';
import {
  IconDown,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconUpload,
} from '@sbux/starbucks-design-react/icon';

// 1:1 还原 Figma 2001:8193「客户标签」页
const C = {
  border: '#e8e8e8',
  brand: '#00754a',
  brandLight: '#e6f7f1',
  fill: '#e8e8e8',
  text1: 'rgba(0,0,0,0.9)',
  text3: 'rgba(0,0,0,0.4)',
  text4: 'rgba(0,0,0,0.26)',
};

const groups = ['标签名称', '标签组名称', '标签组名称', '标签组名称', '标签组名称', '标签组名称'];

const columns = [
  { title: '标签ID', dataIndex: 'id' },
  { title: '标签名称', dataIndex: 'name' },
  {
    title: '状态',
    dataIndex: 'status',
    render: () => <Tag color="green">我是标签</Tag>,
  },
  { title: '标签人数', dataIndex: 'count' },
  { title: '创建人', dataIndex: 'creator' },
  { title: '创建时间', dataIndex: 'time' },
  {
    title: '操作',
    dataIndex: 'op',
    render: () => (
      <Space size={16}>
        <a style={{ color: C.brand }}>管理</a>
        <a style={{ color: C.brand }}>删除</a>
      </Space>
    ),
  },
];

const data = [56, 48, 32, 22, 10].map((count, i) => ({
  key: i,
  id: '项目名称',
  name: '项目名称',
  count,
  creator: 'Nink',
  time: '项目名称',
}));

export default function Demo() {
  const [active, setActive] = useState(2);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minWidth: 1000,
        background: '#fff',
        color: C.text1,
      }}
    >
      {/* 页头 1804:5414 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 32 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 16, fontWeight: 600 }}>
          客户标签
          <IconSearch style={{ display: 'none' }} />
          <span style={{ color: C.text3, fontSize: 16 }}>ⓘ</span>
        </span>
        <Space>
          <Button icon={<IconUpload />}>全局操作</Button>
          <Button type="primary" icon={<IconUpload />}>核心操作</Button>
        </Space>
      </div>

      {/* 两栏卡片 2001:8202 */}
      <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
        {/* 左侧 SidePanel 2001:8203 */}
        <div
          style={{
            width: 268,
            flex: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: '12px 8px',
            borderRight: `1px solid ${C.border}`,
          }}
        >
          <div style={{ padding: '0 8px', fontSize: 14, fontWeight: 600, lineHeight: '22px' }}>标签组</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '0 8px' }}>
            <Input prefix={<IconSearch />} placeholder="请输入内容" style={{ width: 196 }} allowClear />
            <Button icon={<IconPlus />} style={{ width: 32, height: 32, padding: 0, background: C.fill, border: 'none' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px' }}>
            {groups.map((g, i) => {
              const disabled = i === 3;
              const on = i === active;
              return (
                <div
                  key={i}
                  onClick={() => !disabled && setActive(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 32,
                    padding: '0 8px',
                    borderRadius: 4,
                    fontSize: 14,
                    lineHeight: '22px',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    color: disabled ? C.text4 : on ? C.brand : C.text1,
                    background: on ? C.brandLight : 'transparent',
                  }}
                >
                  {g}
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧主区 2001:8217 */}
        <div style={{ flex: 1, minWidth: 0, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600 }}>
            标签组名称 <span style={{ color: C.text3 }}>ⓘ</span>
          </div>

          {/* 工具栏 2001:8225 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <Space>
              <Button type="primary" icon={<IconPlus />}>添加标签</Button>
              <Button icon={<IconUpload />}>导入</Button>
              <Dropdown droplist={<Menu><Menu.Item key="1">批量删除</Menu.Item></Menu>}>
                <Button>更多 <IconDown /></Button>
              </Dropdown>
            </Space>
            <Space>
              <Input prefix={<IconSearch />} placeholder="请输入内容" style={{ width: 250 }} allowClear />
              <Button icon={<IconSettings />} />
              <Button icon={<IconRefresh />} />
            </Space>
          </div>

          {/* 表格 2001:8237 */}
          <Table columns={columns} data={data} pagination={false} border={{ headerCell: true, cell: true }} />

          {/* 分页 2001:8245 */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              total={480}
              pageSize={20}
              current={1}
              showTotal
              sizeCanChange
              showJumper
            />
          </div>
        </div>
      </div>
    </div>
  );
}
