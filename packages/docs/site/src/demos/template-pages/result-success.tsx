import { Button, Message, Result } from '@sbux/starbucks-design-react'
import { RESULT_PAGE_CONTENT } from './result-pages.shared'

const iconUrl = `${import.meta.env.BASE_URL}img/templates/result/success.svg`

export default function Demo() {
  const content = RESULT_PAGE_CONTENT.success

  return (
    <div className="sb-result-template-page sb-template-page-surface">
      <section className="sb-result-template-page__content" role="status" aria-live="polite">
        <Result
          className="sb-result-template-page__result"
          status={null}
          icon={(
            <span className="sb-result-template-page__status-icon sb-result-template-page__status-icon--success" aria-hidden="true">
              <span className="sb-result-template-page__status-icon-inner">
                <img src={iconUrl} alt="" />
              </span>
            </span>
          )}
          title={content.title}
          subTitle={content.description}
          extra={(
            <div className="sb-result-template-page__actions">
              <Button type="primary" onClick={() => Message.info(content.primaryFeedback)}>
                {content.primaryAction}
              </Button>
            </div>
          )}
        />
      </section>
    </div>
  )
}
