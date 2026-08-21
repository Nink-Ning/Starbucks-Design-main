import { useState } from 'react'
import { Button, Message, Result } from '@sbux/starbucks-design-react'
import { RESULT_ACTION_DELAY, RESULT_PAGE_CONTENT } from './result-pages.shared'

const iconUrl = `${import.meta.env.BASE_URL}img/templates/result/failure.svg`

export default function Demo() {
  const content = RESULT_PAGE_CONTENT.failure
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (submitting) return

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, RESULT_ACTION_DELAY))
    Message.info(content.primaryFeedback)
    setSubmitting(false)
  }

  return (
    <div className="sb-result-template-page sb-template-page-surface">
      <section className="sb-result-template-page__content" role="alert">
        <Result
          className="sb-result-template-page__result"
          status={null}
          icon={(
            <span className="sb-result-template-page__status-icon sb-result-template-page__status-icon--failure" aria-hidden="true">
              <span className="sb-result-template-page__status-icon-inner">
                <img src={iconUrl} alt="" />
              </span>
            </span>
          )}
          title={content.title}
          subTitle={content.description}
          extra={(
            <div className="sb-result-template-page__actions">
              <Button type="primary" loading={submitting} onClick={handleSubmit}>
                {content.primaryAction}
              </Button>
              <Button type="outline" disabled={submitting} onClick={() => Message.info(content.secondaryFeedback)}>
                {content.secondaryAction}
              </Button>
            </div>
          )}
        />
      </section>
    </div>
  )
}
