import { Button, Modal, Spin } from '@sbux/starbucks-design-react';
import { IconInfoCircleFill, IconCheckCircleFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const sleep = async (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
  return (
    <div>
      <Button
        type="primary"
        onClick={async () => {
          const modalIns = Modal.confirm({
            title: 'Submiting...',
            icon: <IconInfoCircleFill />,
            content: (
              <span>
                This modal will be successful after 1.5s. <Spin size={14} />
              </span>
            ),
            footer: null
          })
          await sleep(1500)
          modalIns.update({
            icon: <IconCheckCircleFill />,
            title: 'Success',
            content: 'This modal will be closed after 1.5s.'
          })
          await sleep(1500)
          modalIns.close()
        }}
      >
        Open Modal
      </Button>
    </div>
  )
}
