import { createContext } from 'react';
import { Button, Space, Modal } from '@sbux/starbucks-design-react';

export default function Demo() {
  const ConfigContext = createContext({})
  const [modal, contextHolder] = Modal.useModal()

  const config = {
    title: 'Profile',
    content: <ConfigContext.Consumer>{(name) => `Current user: ${name}`}</ConfigContext.Consumer>
  }
  return (
    <ConfigContext.Provider value="PJY">
      {contextHolder}
      <Space>
        <Button onClick={() => modal.confirm(config)} type="secondary">
          Confirm
        </Button>
        <Button onClick={() => modal.info(config)} type="secondary">
          Info
        </Button>
        <Button onClick={() => modal.success(config)} type="secondary">
          Success
        </Button>
        <Button onClick={() => modal.warning(config)} type="secondary">
          Warning
        </Button>
        <Button onClick={() => modal.error(config)} type="secondary">
          Error
        </Button>
        <Button onClick={() => Modal.confirm(config)} type="outline" status="danger">
          Can't get context
        </Button>
      </Space>
    </ConfigContext.Provider>
  )
}
