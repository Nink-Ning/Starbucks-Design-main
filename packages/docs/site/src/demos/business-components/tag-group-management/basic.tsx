import { useState } from 'react'
import { TagGroupManagement } from '@sbux/starbucks-design-react'
import type { TagGroupItem } from '@sbux/starbucks-design-react'
import { demoGroups, getDemoTags, type TagRecord } from './shared'

let nextGroupId = 0

function GroupContent({ groupId, groupName, records }: { groupId: string; groupName: string; records: TagRecord[] }) {
  return (
    <div className="sb-tag-group-management-demo__content">
      <div className="sb-tag-group-management-demo__content-header">
        <div>
          <span className="sb-tag-group-management-demo__eyebrow">当前标签组</span>
          <h3>{groupName}</h3>
        </div>
        <span className="sb-tag-group-management-demo__count">{records.length} 个标签</span>
      </div>
      <div className="sb-tag-group-management-demo__toolbar">
        <span>标签列表</span>
        <button type="button" className="sb-tag-group-management-demo__content-button">
          新增标签
        </button>
      </div>
      <div className="sb-tag-group-management-demo__table-wrap">
        <table>
          <thead>
            <tr>
              <th>标签名称</th>
              <th>状态</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={`${groupId}-${record.name}`}>
                <td>{record.name}</td>
                <td>
                  <span data-status={record.status === '启用' ? 'active' : 'inactive'}>{record.status}</span>
                </td>
                <td>{record.updatedAt}</td>
                <td>
                  <button type="button" className="sb-tag-group-management-demo__text-button">
                    编辑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function BasicTagGroupManagementDemo() {
  const [groups, setGroups] = useState<TagGroupItem[]>([...demoGroups])

  return (
    <div className="sb-tag-group-management-demo">
      <TagGroupManagement
        groups={groups}
        defaultActiveGroupId="store"
        deleteConfirm={(group) => ({
          title: `删除「${group.name}」？`,
          content: '删除确认只负责发出操作意图，关联关系和接口结果由调用方处理。',
          okText: '删除',
          cancelText: '取消'
        })}
        onCreateGroup={(name) => setGroups((current) => [...current, { id: `group-${++nextGroupId}`, name }])}
        onRenameGroup={(groupId, name) =>
          setGroups((current) => current.map((group) => (group.id === groupId ? { ...group, name } : group)))
        }
        onDeleteGroup={(groupId) => setGroups((current) => current.filter((group) => group.id !== groupId))}
        renderContent={({ activeGroup }) =>
          activeGroup ? (
            <GroupContent groupId={activeGroup.id} groupName={activeGroup.name} records={getDemoTags(activeGroup.id)} />
          ) : (
            <p className="sb-tag-group-management-demo__placeholder">请选择左侧标签组查看内容。</p>
          )
        }
      />
    </div>
  )
}
