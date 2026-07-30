import { useMemo, useState } from 'react';
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Message,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tag,
  Tooltip,
} from '@sbux/starbucks-design-react';
import type { TableColumnProps } from '@sbux/starbucks-design-react';
import {
  IconDelete,
  IconDown,
  IconEdit,
  IconExclamationCircleFill,
  IconInfoCircle,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconUpload,
} from '@sbux/starbucks-design-react/icon';

type TagGroup = {
  id: string;
  name: string;
  disabled?: boolean;
};

type TagRecord = {
  id: string;
  name: string;
  status: 'enabled' | 'disabled';
  memberCount: number;
  creator: string;
  createdAt: string;
};

const pageSize = 5;

const initialGroups: TagGroup[] = [
  { id: 'profile', name: '基础属性' },
  { id: 'preference', name: '消费偏好' },
  { id: 'level', name: '会员等级' },
  { id: 'system', name: '系统标签', disabled: true },
  { id: 'activity', name: '活跃状态' },
  { id: 'store', name: '门店偏好' },
];

const initialTags: TagRecord[] = [
  { id: 'TAG-001', name: '高价值客户', status: 'enabled', memberCount: 56, creator: 'Nink', createdAt: '2026-07-24 10:30' },
  { id: 'TAG-002', name: '新品尝鲜用户', status: 'enabled', memberCount: 48, creator: 'Kim', createdAt: '2026-07-23 15:20' },
  { id: 'TAG-003', name: '高频到店会员', status: 'enabled', memberCount: 32, creator: 'Alex', createdAt: '2026-07-22 09:15' },
  { id: 'TAG-004', name: '外送偏好用户', status: 'enabled', memberCount: 22, creator: 'Mia', createdAt: '2026-07-21 18:00' },
  { id: 'TAG-005', name: '臻选门店会员', status: 'enabled', memberCount: 10, creator: 'Jade', createdAt: '2026-07-21 13:48' },
  { id: 'TAG-006', name: '近 30 天活跃', status: 'enabled', memberCount: 86, creator: 'Owen', createdAt: '2026-07-20 16:12' },
  { id: 'TAG-007', name: '周末消费偏好', status: 'disabled', memberCount: 18, creator: 'Rita', createdAt: '2026-07-20 11:06' },
  { id: 'TAG-008', name: '早餐时段用户', status: 'enabled', memberCount: 41, creator: 'Ben', createdAt: '2026-07-19 19:35' },
  { id: 'TAG-009', name: '企业客户', status: 'enabled', memberCount: 27, creator: 'Luna', createdAt: '2026-07-18 14:26' },
  { id: 'TAG-010', name: '生日月会员', status: 'enabled', memberCount: 63, creator: 'Leo', createdAt: '2026-07-17 10:52' },
  { id: 'TAG-011', name: '低频待唤醒', status: 'disabled', memberCount: 14, creator: 'Ivy', createdAt: '2026-07-16 17:44' },
  { id: 'TAG-012', name: '自带杯用户', status: 'enabled', memberCount: 35, creator: 'Sean', createdAt: '2026-07-15 12:38' },
];

export default function Demo() {
  const [groups, setGroups] = useState<TagGroup[]>(initialGroups);
  const [tags, setTags] = useState<TagRecord[]>(initialTags);
  const [activeGroupId, setActiveGroupId] = useState('level');
  const [groupKeyword, setGroupKeyword] = useState('');
  const [tagKeyword, setTagKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [addTagModalVisible, setAddTagModalVisible] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [loading, setLoading] = useState(false);

  const activeGroup = groups.find((group: TagGroup) => group.id === activeGroupId) ?? groups[0];
  const visibleGroups = groups.filter((group: TagGroup) =>
    group.name.toLowerCase().includes(groupKeyword.trim().toLowerCase())
  );
  const filteredTags: TagRecord[] = useMemo(() => {
    const keyword = tagKeyword.trim().toLowerCase();
    return tags.filter((tag: TagRecord) =>
      !keyword ||
      tag.id.toLowerCase().includes(keyword) ||
      tag.name.toLowerCase().includes(keyword)
    );
  }, [tagKeyword, tags]);
  const visibleTags = filteredTags.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function beginEdit(group: TagGroup) {
    setEditingGroupId(group.id);
    setEditingName(group.name);
  }

  function saveGroupName() {
    const name = editingName.trim();
    if (!editingGroupId || !name) return;
    setGroups((current: TagGroup[]) =>
      current.map((group: TagGroup) => group.id === editingGroupId ? { ...group, name } : group)
    );
    setEditingGroupId(null);
    Message.success('标签组名称已更新');
  }

  function deleteGroup(groupId: string) {
    setGroups((current: TagGroup[]) => current.filter((group: TagGroup) => group.id !== groupId));
    if (activeGroupId === groupId) {
      setActiveGroupId(groups.find((group: TagGroup) => group.id !== groupId && !group.disabled)?.id ?? '');
    }
    Message.success('标签组已删除');
  }

  function addGroup() {
    const next = groups.length + 1;
    const group = { id: `group-${Date.now()}`, name: `新标签组 ${next}` };
    setGroups((current: TagGroup[]) => [...current, group]);
    setActiveGroupId(group.id);
  }

  function addTag() {
    const name = newTagName.trim();
    if (!name) return;
    const next = tags.length + 1;
    setTags((current: TagRecord[]) => [
      {
        id: `TAG-${String(next).padStart(3, '0')}`,
        name,
        status: 'enabled',
        memberCount: 0,
        creator: 'Nink',
        createdAt: '2026-07-30 10:00',
      },
      ...current,
    ]);
    setCurrentPage(1);
    setNewTagName('');
    setAddTagModalVisible(false);
    Message.success('标签已添加');
  }

  function deleteTag(tagId: string) {
    setTags((current: TagRecord[]) => current.filter((tag: TagRecord) => tag.id !== tagId));
    Message.success('标签已删除');
  }

  function refresh() {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      Message.success('标签数据已刷新');
    }, 500);
  }

  const columns: TableColumnProps<TagRecord>[] = [
    { title: '标签 ID', dataIndex: 'id', width: 120 },
    { title: '标签名称', dataIndex: 'name', width: 160 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 110,
      render: (_, record) => (
        <Tag color={record.status === 'enabled' ? 'green' : 'gray'}>
          {record.status === 'enabled' ? '已启用' : '已停用'}
        </Tag>
      ),
    },
    { title: '标签人数', dataIndex: 'memberCount', width: 110 },
    { title: '创建人', dataIndex: 'creator', width: 100 },
    { title: '创建时间', dataIndex: 'createdAt', width: 170 },
    {
      title: '操作',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <div className="sb-tag-list-page__row-actions">
          <Button type="text" size="mini" onClick={() => Message.info(`管理标签：${record.name}`)}>
            管理
          </Button>
          <Popconfirm
            position="top"
            title="确认删除标签？"
            content="删除后，该标签将从当前标签组中移除。"
            okText="确认"
            cancelText="取消"
            icon={<IconExclamationCircleFill className="sb-tag-list-page__warning-icon" />}
            onOk={() => deleteTag(record.id)}
          >
            <Button type="text" size="mini">删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="sb-tag-list-page">
      <header className="sb-tag-list-page__header">
        <div className="sb-tag-list-page__title">
          <span>客户标签</span>
          <Tooltip content="用于维护客户标签组和标签数据">
            <IconInfoCircle aria-label="客户标签说明" />
          </Tooltip>
        </div>
        <div className="sb-tag-list-page__header-actions">
          <Button type="primary" icon={<IconUpload />} onClick={() => Message.info('已触发全局操作')}>
            全局操作
          </Button>
          <Button type="outline" icon={<IconUpload />} onClick={() => Message.info('已触发核心操作')}>
            核心操作
          </Button>
        </div>
      </header>

      <section className="sb-tag-list-page__card">
        <aside className="sb-tag-list-page__sidebar">
          <h2>标签组</h2>
          <div className="sb-tag-list-page__group-search">
            <Input
              value={groupKeyword}
              onChange={setGroupKeyword}
              prefix={<IconSearch />}
              placeholder="请输入内容"
              allowClear
            />
            <Button aria-label="添加标签组" icon={<IconPlus />} onClick={addGroup} />
          </div>
          <div className="sb-tag-list-page__groups">
            {visibleGroups.map((group: TagGroup) => {
              const active = group.id === activeGroupId;
              return (
                <div
                  key={group.id}
                  className={[
                    'sb-tag-list-page__group',
                    active ? 'is-active' : '',
                    group.disabled ? 'is-disabled' : '',
                  ].filter(Boolean).join(' ')}
                  role="button"
                  tabIndex={group.disabled ? -1 : 0}
                  aria-disabled={group.disabled}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => !group.disabled && setActiveGroupId(group.id)}
                  onKeyDown={(event) => {
                    if (!group.disabled && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault();
                      setActiveGroupId(group.id);
                    }
                  }}
                >
                  <span className="sb-tag-list-page__group-name">{group.name}</span>
                  {!group.disabled && (
                    <span className="sb-tag-list-page__group-actions" onClick={(event) => event.stopPropagation()}>
                      <Popover
                        trigger="click"
                        position="top"
                        popupVisible={editingGroupId === group.id}
                        onVisibleChange={(visible) => visible ? beginEdit(group) : setEditingGroupId(null)}
                        content={
                          <div className="sb-tag-list-page__edit-popover">
                            <strong>编辑名称</strong>
                            <Input
                              value={editingName}
                              onChange={setEditingName}
                              placeholder="请输入标签组名称"
                              onPressEnter={saveGroupName}
                            />
                            <div>
                              <Button size="mini" onClick={() => setEditingGroupId(null)}>取消</Button>
                              <Button size="mini" type="primary" disabled={!editingName.trim()} onClick={saveGroupName}>确认</Button>
                            </div>
                          </div>
                        }
                      >
                        <Button
                          className="sb-tag-list-page__group-action"
                          type="text"
                          size="mini"
                          aria-label={`编辑${group.name}`}
                          icon={<IconEdit />}
                          onClick={() => beginEdit(group)}
                        />
                      </Popover>
                      <Popconfirm
                        position="top"
                        title="确认删除标签组？"
                        content="该组下包含标签，删除后组内标签将被一并删除，此操作不可恢复。"
                        okText="确认"
                        cancelText="取消"
                        icon={<IconExclamationCircleFill className="sb-tag-list-page__warning-icon" />}
                        onOk={() => deleteGroup(group.id)}
                      >
                        <Button
                          className="sb-tag-list-page__group-action"
                          type="text"
                          size="mini"
                          aria-label={`删除${group.name}`}
                          icon={<IconDelete />}
                        />
                      </Popconfirm>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <div className="sb-tag-list-page__content">
          <div className="sb-tag-list-page__content-title">
            <span>{activeGroup?.name ?? '标签组名称'}</span>
            <Tooltip content="当前标签组中的标签数据">
              <IconInfoCircle aria-label="标签组说明" />
            </Tooltip>
          </div>

          <div className="sb-tag-list-page__toolbar">
            <div className="sb-tag-list-page__toolbar-left">
              <Button icon={<IconPlus />} onClick={() => setAddTagModalVisible(true)}>添加标签</Button>
              <Button icon={<IconUpload />} onClick={() => Message.info('已触发标签导入')}>导入</Button>
              <Dropdown
                droplist={
                  <Menu onClickMenuItem={(key) => Message.info(key === 'disable' ? '已批量停用' : '已导出标签')}>
                    <Menu.Item key="disable">批量停用</Menu.Item>
                    <Menu.Item key="export">导出标签</Menu.Item>
                  </Menu>
                }
              >
                <Button>更多 <IconDown /></Button>
              </Dropdown>
            </div>
            <div className="sb-tag-list-page__toolbar-right">
              <Input
                value={tagKeyword}
                onChange={(value) => {
                  setTagKeyword(value);
                  setCurrentPage(1);
                }}
                prefix={<IconSearch />}
                placeholder="请输入标签名"
                allowClear
              />
              <Button aria-label="列设置" icon={<IconSettings />} onClick={() => Message.info('列设置')} />
              <Button aria-label="刷新" loading={loading} icon={<IconRefresh />} onClick={refresh} />
            </div>
          </div>

          <div className="sb-tag-list-page__table">
            <Table
              rowKey="id"
              columns={columns}
              data={visibleTags}
              pagination={false}
              loading={loading}
              border={false}
              scroll={{ x: 910 }}
            />
          </div>

          <div className="sb-tag-list-page__pagination">
            <Pagination
              total={filteredTags.length}
              pageSize={pageSize}
              current={currentPage}
              showTotal
              showJumper
              onChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      <Modal
        title={<span className="sb-tag-list-page__modal-title">添加标签</span>}
        visible={addTagModalVisible}
        okButtonProps={{ disabled: !newTagName.trim() }}
        onOk={addTag}
        onCancel={() => {
          setAddTagModalVisible(false);
          setNewTagName('');
        }}
        autoFocus={false}
        focusLock
      >
        <div className="sb-tag-list-page__modal-form">
          <label>
            <span>标签名称</span>
            <Input
              value={newTagName}
              placeholder="请输入标签名称"
              allowClear
              onChange={setNewTagName}
              onPressEnter={addTag}
            />
          </label>
        </div>
      </Modal>
    </div>
  );
}
