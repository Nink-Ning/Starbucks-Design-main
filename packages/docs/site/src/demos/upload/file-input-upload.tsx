import { useState } from 'react';
import { Button, Input, Upload } from '@sbux/starbucks-design-react';
import './showcase.css';

const tip = '额外提示语，文字过多时宽度折行';

export default function Demo() {
  const [fileName, setFileName] = useState('');

  return (
    <div className="sb-upload-demo">
      <div className="sb-upload-input-row">
        <Input value={fileName} readOnly placeholder="还未选择文件" aria-label="已选择的文件" />
        <Upload
          action="/"
          autoUpload={false}
          showUploadList={false}
          onChange={(files, currentFile) => {
            setFileName(currentFile?.name ?? files.at(-1)?.name ?? '');
          }}
        >
          <Button type="outline">上传文件</Button>
        </Upload>
      </div>
      <div className="sb-upload-tip">{tip}</div>
    </div>
  );
}
