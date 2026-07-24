import { Upload, Modal } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Upload
        multiple
        action="/"
        beforeUpload={(file) => {
          return new Promise((resolve, reject) => {
            Modal.confirm({
              title: 'beforeUpload',
              content: `确认上传 ${file.name}`,
              onConfirm: () => resolve(true),
              onCancel: () => reject('cancel'),
            });
          });
        }}
      />
    </div>
  );
}
