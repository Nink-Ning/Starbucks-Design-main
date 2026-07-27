import { ConfigProvider, Space, Typography, Tabs, Button, Modal, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  const confirm = () => {
    Modal.confirm({
      title: 'Confirm deletion',
      content: 'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okButtonProps: {
        status: 'danger',
      },
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch((e) => {
          Message.error({
            content: 'Error occurs!',
          });
          throw e;
        });
      },
    });
  };

  return (
    <Space direction="vertical" size={20}>
      <ConfigProvider rtl effectGlobalNotice={false} effectGlobalModal={false}>
        <Typography.Title heading={6}>局部 RTL 视图</Typography.Title>
        <Tabs defaultActiveTab='1' style={{ marginBottom: 20 }}>
          <Tabs.TabPane key='1' title='Tab 1' />
          <Tabs.TabPane key='2' title='Tab 2' />
          <Tabs.TabPane key='3' title='Tab 3' />
        </Tabs>
        <Space>
          <Button type='primary' onClick={confirm}>
            Confirm
          </Button>
        </Space>
      </ConfigProvider>
    </Space>
  );
}
