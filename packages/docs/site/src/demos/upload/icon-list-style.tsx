import { Upload } from '@sbux/starbucks-design-react';

export default function Demo() {
  const defaultFileList = [
    {
      uid: '-3',
      name: 'light.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
  ];

  return (
    <div>
      <Upload
        listType="picture-list"
        action="/"
        multiple
        defaultFileList={defaultFileList}
      ></Upload>
    </div>
  );
};
