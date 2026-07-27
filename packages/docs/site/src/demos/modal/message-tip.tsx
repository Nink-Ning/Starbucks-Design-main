import { Button, Space, Modal } from '@sbux/starbucks-design-react';

export default function Demo() {
  function info() {
    Modal.info({
      title: 'Info Notification',
      content:
        'This is an info description which directly indicates a neutral informative change or action. (e.g., "We are providing new services for all developers.") '
    })
  }

  function success() {
    Modal.success({
      title: 'This is a success notification'
    })
  }

  function warning() {
    Modal.warning({
      title: 'Warning Notification',
      content:
        'This is a warning description which directly indicates a warning that might need attention. (e.g., "Invalid request, please contact admininstration.")'
    })
  }

  function error() {
    Modal.error({
      title: 'Error Notification',
      content:
        'This is an error description which directly indicates a dangerous or potentially negative action. (e.g., "It’s a invalid request.")'
    })
  }
  return (
    <Space size="large">
      <Button type="primary" onClick={info}>
        Info
      </Button>
      <Button type="primary" status="success" onClick={success}>
        Success
      </Button>
      <Button type="primary" status="warning" onClick={warning}>
        Warning
      </Button>
      <Button type="primary" status="danger" onClick={error}>
        Error
      </Button>
    </Space>
  )
}
