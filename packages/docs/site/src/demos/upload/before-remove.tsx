import React from 'react';
import { Upload, Modal } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  render() {
    return (
      <div>
        <Upload
          multiple
          action="/"
          onRemove={(file) => {
            return new Promise((resolve, reject) => {
              Modal.confirm({
                title: 'onRemove',
                content: `确认删除 ${file.name}`,
                onConfirm: () => resolve(true),
                onCancel: () => reject('cancel'),
              });
            });
          }}
          defaultFileList={[
            {
              uid: '-2',
              name: 'light.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
            },
            {
              uid: '-1',
              name: 'ice.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
            },
          ]}
        />
      </div>
    );
  }
}
