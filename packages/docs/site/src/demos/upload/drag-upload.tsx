import { Link, Upload } from '@sbux/starbucks-design-react';
import './showcase.css';

export default function Demo() {
  return (
    <div className="sb-upload-demo sb-upload-drop-upload">
      <Upload drag multiple action="/" showUploadList={false}>
        <div className="sb-upload-drop-trigger" tabIndex={0}>
          <Link>点击上传</Link>
          <span>/ 拖拽到此区域</span>
        </div>
      </Upload>
      <div className="sb-upload-tip">额外提示语，文字过多时宽度折行</div>
    </div>
  );
}
