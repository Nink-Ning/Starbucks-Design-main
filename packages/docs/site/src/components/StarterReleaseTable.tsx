import React from 'react'
import release from '../../../../../distribution/releases/designkit-starter-v1-r3-release.json'

interface ReleaseRecord {
  key: string
  version: string
  roles: string[]
  releaseDate: string
  content: string[]
  downloadHref: string
}

const releaseDate = release.generatedAt.slice(0, 10)
const releaseContent = [
  '提供基础列表、卡片列表、基础表单和基础详情四个 Golden Examples。',
  '支持本地 Mock 数据和 Normal、Loading、Empty、Error 状态。',
  '内置匹配的 Starbucks React Runtime，并完成桌面与窄屏验证。'
]
const releaseRoles = ['产品经理', '其他非研发角色']

const records: ReleaseRecord[] = [
  {
    key: 'product-v1-r3',
    version: 'DesignKit Starter V1-r3',
    roles: releaseRoles,
    releaseDate,
    content: releaseContent,
    downloadHref: '../../downloads/designkit-starter-v1-r3.zip'
  }
]

export default function StarterReleaseTable() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ fontSize: 14, lineHeight: '24px' }}>
        <thead>
          <tr>
            <th>版本</th>
            <th>使用角色</th>
            <th>发布时间</th>
            <th style={{ textAlign: 'left' }}>发布内容</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.key}>
              <td>
                <a href={record.downloadHref} download>
                  {record.version}
                </a>
              </td>
              <td>
                {record.roles.map((role) => (
                  <div key={role}>{role}</div>
                ))}
              </td>
              <td>{record.releaseDate}</td>
              <td style={{ textAlign: 'left' }}>
                <ul style={{ margin: 0, paddingInlineStart: 18 }}>
                  {record.content.map((item) => (
                    <li key={item} style={{ marginBottom: 6 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
