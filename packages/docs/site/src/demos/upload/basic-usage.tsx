import { Button, Upload } from '@sbux/starbucks-design-react';
import { IconUpload } from '@sbux/starbucks-design-react/icon';
import './showcase.css';

const tip = '额外提示语，文字过多时宽度折行';

export default function Demo() {
  return (
    <div className="sb-upload-demo">
      <Upload action="/" showUploadList={false}>
        <Button type="outline" icon={<IconUpload />}>
          上传文件
        </Button>
      </Upload>
      <div className="sb-upload-tip">{tip}</div>
    </div>
  );
}
