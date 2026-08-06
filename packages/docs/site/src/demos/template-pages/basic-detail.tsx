import { createPortal } from 'react-dom'
import { Button, Dropdown, Menu, Message } from '@sbux/starbucks-design-react'
import {
  DetailDescriptions,
  DetailPageLayout,
  DetailSection,
} from '@sbux/starbucks-design-react/pro'
import {
  couponBasicInfo,
  DETAIL_EMPTY_VALUE,
} from './detail.shared'

export default function Demo() {
  const actionHost = typeof document === 'undefined'
    ? null
    : document.querySelector<HTMLElement>('[data-template-action-host="basic-detail"]')

  return (
    <>
      {actionHost && createPortal(
        <div className="sb-basic-detail-page__breadcrumb-actions">
          <Dropdown
            droplist={
              <Menu onClickMenuItem={(key) => Message.info(key === 'copy' ? '已复制卡券' : '已导出卡券')}>
                <Menu.Item key="copy">复制卡券</Menu.Item>
                <Menu.Item key="export">导出卡券</Menu.Item>
              </Menu>
            }
          >
            <Button>更多</Button>
          </Dropdown>
          <Button type="primary" onClick={() => Message.success('进入卡券编辑')}>编辑</Button>
        </div>,
        actionHost,
      )}

      <div className="sb-basic-detail-page sb-template-page-surface">
        <DetailPageLayout maxWidth={1120}>
        <div className="sb-basic-detail-page__content">
          <DetailSection>
            <DetailDescriptions data={couponBasicInfo} emptyValue={DETAIL_EMPTY_VALUE} />
          </DetailSection>
        </div>
        </DetailPageLayout>
      </div>
    </>
  )
}
