import { Button, Modal, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  function confirm() {
    Modal.confirm({
      title: 'Confirm deletion',
      content:
        'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okButtonProps: {
        status: 'danger'
      },
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        }).catch((e) => {
          Message.error({
            content: 'Error occurs!'
          })
          throw e
        })
      }
    })
  }
  return (
    <Button type="primary" onClick={confirm}>
      Confirm
    </Button>
  )
}
