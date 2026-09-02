import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { TagGroupManagement } from '../TagGroupManagement'

describe('TagGroupManagement SSR', () => {
  it('renders without accessing browser-only globals', () => {
    const markup = renderToString(
      <TagGroupManagement
        groups={[{ id: 'a', name: '标签组 A' }]}
        renderContent={({ activeGroup }) => <div>{activeGroup?.name}</div>}
      />
    )

    expect(markup).toContain('标签组 A')
    expect(markup).toContain('aria-current="true"')
    expect(markup).toContain('sbux-tag-group-management')
  })
})
