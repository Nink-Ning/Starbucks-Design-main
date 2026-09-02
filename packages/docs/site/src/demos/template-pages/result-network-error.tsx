import { useState } from 'react'
import { Button, Message, Result } from '@sbux/starbucks-design-react'
import { RESULT_ACTION_DELAY, RESULT_PAGE_CONTENT } from './result-pages.shared'

const iconUrl = `${import.meta.env.BASE_URL}img/templates/result/network.svg`

export default function Demo() {
  const content = RESULT_PAGE_CONTENT.networkError
  const [reloading, setReloading] = useState(false)

  const handleReload = async () => {
    if (reloading) return

    setReloading(true)
    await new Promise((resolve) => setTimeout(resolve, RESULT_ACTION_DELAY))
    Message.warning(content.primaryFeedback)
    setReloading(false)
  }

  return (
    <div className="sb-result-template-page sb-template-page-surface">
      <section className="sb-result-template-page__content" role="alert">
        <Result
          className="sb-result-template-page__result"
          status={null}
          icon={(
            <span className="sb-result-template-page__status-icon sb-result-template-page__status-icon--network" aria-hidden="true">
              <span className="sb-result-template-page__status-icon-inner">
                <img src={iconUrl} alt="" />
              </span>
            </span>
          )}
          title={content.title}
          subTitle={content.description}
          extra={(
            <div className="sb-result-template-page__actions">
              <Button type="primary" loading={reloading} onClick={handleReload}>
                {content.primaryAction}
              </Button>
            </div>
          )}
        />
      </section>
    </div>
  )
}
