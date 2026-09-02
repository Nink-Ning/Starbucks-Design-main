import { TagGroupManagement } from '@sbux/starbucks-design-react'
import { longGroups, longTagRecords } from './shared'

export default function TagGroupManagementLongListDemo() {
  return (
    <div className="sb-tag-group-management-demo sb-tag-group-management-demo__long-list">
      <TagGroupManagement
        groups={longGroups}
        defaultActiveGroupId={longGroups[0]?.id}
        renderContent={({ activeGroup }) => (
          <div className="sb-tag-group-management-demo__content">
            <div className="sb-tag-group-management-demo__content-header">
              <div>
                <span className="sb-tag-group-management-demo__eyebrow">30 个标签组 · 右侧独立滚动</span>
                <h3>{activeGroup?.name ?? '未选择标签组'}</h3>
              </div>
              <span className="sb-tag-group-management-demo__count">{longTagRecords.length} 个标签</span>
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
                  {longTagRecords.map((record) => (
                    <tr key={record.name}>
                      <td>{record.name}</td>
                      <td>{record.status}</td>
                      <td>{record.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      />
    </div>
  )
}
