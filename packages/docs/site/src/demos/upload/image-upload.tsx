import { Button, Upload } from '@sbux/starbucks-design-react';
import { IconPlus } from '@sbux/starbucks-design-react/icon';
import './showcase.css';

const tip = '额外提示语，文字过多时宽度折行';

export default function Demo() {
  return (
    <div className="sb-upload-demo">
      <Upload
        action="/"
        accept="image/*"
        listType="picture-card"
        showUploadList={false}
      >
        <Button className="sb-upload-image-trigger" type="outline" icon={<IconPlus />}>
          点击上传图片
        </Button>
      </Upload>
      <div className="sb-upload-tip">{tip}</div>
    </div>
  );
}
