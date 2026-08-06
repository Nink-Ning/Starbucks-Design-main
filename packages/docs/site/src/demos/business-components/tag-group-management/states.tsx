import { useState } from 'react'
import { TagGroupManagement } from '@sbux/starbucks-design-react'
import { demoGroups, getDemoTags } from './shared'

type DemoState = 'normal' | 'loading' | 'disabled' | 'empty' | 'searchEmpty'

const stateOptions: Array<{ value: DemoState; label: string }> = [
  { value: 'normal', label: 'Normal' },
  { value: 'loading', label: 'Loading' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'empty', label: 'Empty' },
  { value: 'searchEmpty', label: 'Search Empty（输入无结果）' }
]

export default function TagGroupManagementStatesDemo() {
  const [state, setState] = useState<DemoState>('normal')
  const activeGroup = demoGroups[0]

  return (
    <div className="sb-tag-group-management-demo sb-tag-group-management-demo__states">
      <div className="sb-tag-group-management-demo__state-switch" role="tablist" aria-label="选择状态场景">
        {stateOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={state === option.value}
            onClick={() => setState(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {state === 'searchEmpty' && (
        <p className="sb-tag-group-management-demo__state-note">
          在左侧搜索框输入不存在的名称，查看 searchEmpty 空状态。
        </p>
      )}
      <div className="sb-tag-group-management-demo__state-component">
        <TagGroupManagement
          groups={state === 'empty' ? [] : demoGroups}
          loading={state === 'loading'}
          disabled={state === 'disabled'}
          defaultActiveGroupId="store"
          renderEmpty={(context) => (
            <div className="sb-tag-group-management-demo__empty-message">
              {context.type === 'searchEmpty' ? '没有匹配的标签组' : '暂无标签组'}
            </div>
          )}
          renderContent={({ activeGroup }) => {
            const group = activeGroup
            const records = group ? getDemoTags(group.id) : []
            return (
              <div className="sb-tag-group-management-demo__content">
                <div className="sb-tag-group-management-demo__content-header">
                  <div>
                    <span className="sb-tag-group-management-demo__eyebrow">右侧内容仍由调用方渲染</span>
                    <h3>{group?.name ?? activeGroup.name}</h3>
                  </div>
                  <span className="sb-tag-group-management-demo__count">{records.length} 个标签</span>
                </div>
                <p className="sb-tag-group-management-demo__placeholder">
                  {state === 'loading' ? '左侧加载中，右侧业务内容保持展示。' : '组件只控制左侧管理区。'}
                </p>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}
