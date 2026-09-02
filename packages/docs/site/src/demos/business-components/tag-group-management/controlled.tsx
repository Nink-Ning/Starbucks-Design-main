import { useState } from 'react'
import { TagGroupManagement } from '@sbux/starbucks-design-react'
import type { TagGroupItem } from '@sbux/starbucks-design-react'
import { demoGroups, getDemoTags } from './shared'

function ControlledContent({ group }: { group: TagGroupItem | null }) {
  const records = group ? getDemoTags(group.id) : []
  return group ? (
    <div className="sb-tag-group-management-demo__content">
      <div className="sb-tag-group-management-demo__content-header">
        <div>
          <span className="sb-tag-group-management-demo__eyebrow">外部 activeGroupId</span>
          <h3>{group.name}</h3>
        </div>
        <span className="sb-tag-group-management-demo__count">{records.length} 个标签</span>
      </div>
      <div className="sb-tag-group-management-demo__table-wrap">
        <table>
          <thead>
            <tr>
              <th>标签名称</th>
              <th>状态</th>
              <th>更新时间</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={`${group.id}-${record.name}`}>
                <td>{record.name}</td>
                <td>{record.status}</td>
                <td>{record.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p className="sb-tag-group-management-demo__placeholder">当前没有选中的标签组。</p>
  )
}

export default function TagGroupManagementControlledDemo() {
  const [activeGroupId, setActiveGroupId] = useState<string | null>('store')
  const activeGroup = demoGroups.find((group) => group.id === activeGroupId) ?? null

  return (
    <div className="sb-tag-group-management-demo sb-tag-group-management-demo--controlled">
      <div className="sb-tag-group-management-demo__external-controls" aria-label="外部切换标签组">
        <span>外部控制：</span>
        {demoGroups
          .filter((group) => !group.disabled)
          .slice(0, 4)
          .map((group) => (
            <button
              key={group.id}
              type="button"
              aria-pressed={group.id === activeGroupId}
              onClick={() => setActiveGroupId(group.id)}
            >
              {group.name}
            </button>
          ))}
      </div>
      <p className="sb-tag-group-management-demo__event-status" aria-live="polite">
        当前 activeGroupId：{activeGroupId ?? 'null'}
      </p>
      <TagGroupManagement
        groups={demoGroups}
        activeGroupId={activeGroupId}
        onActiveGroupChange={(groupId) => setActiveGroupId(groupId)}
        renderContent={() => <ControlledContent group={activeGroup} />}
      />
    </div>
  )
}
