import React from 'react';
import { Upload, Space, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  const uploadRef = React.useRef();
  const [disabled, setDisabled] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);

  const onSubmit = (e, isFirst) => {
    e.stopPropagation();
    const file = isFirst ? fileList.filter((x) => x.status === 'init')[0] : null;
    uploadRef.current && uploadRef.current.submit(file);
  };

  const onChange = (files) => {
    setFileList(files);
    setDisabled(!files.some((x) => x.status === 'init'));
  };

  const onProgress = (file) => {
    setFileList((files) => {
      return files.map((x) => (x.uid === file.uid ? file : x));
    });
  };

  return (
    <Upload
      ref={uploadRef}
      multiple
      autoUpload={false}
      action="/"
      onChange={onChange}
      onProgress={onProgress}
      fileList={fileList}
    >
      <Space size="large">
        <Button>选择文件</Button>
        <Button type="primary" onClick={onSubmit} disabled={disabled}>
          开始上传
        </Button>
        <Button
          type="primary"
          onClick={(e) => {
            onSubmit(e, true);
          }}
          disabled={disabled}
        >
          仅上传一个
        </Button>
      </Space>
    </Upload>
  );
}
