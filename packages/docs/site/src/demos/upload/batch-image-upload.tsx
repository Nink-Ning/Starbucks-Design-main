import { Button, Upload } from '@sbux/starbucks-design-react';
import './showcase.css';

const description = '支持批量上传文件，文件格式不限，最多只能上传 5 份文件';

export default function Demo() {
  return (
    <div className="sb-upload-demo sb-upload-flow-upload">
      <Upload
        action="/"
        accept="image/*"
        autoUpload={false}
        drag
        multiple
        limit={5}
        showUploadList={false}
      >
        <div className="sb-upload-flow">
          <div className="sb-upload-flow-header">
            <Button type="outline">选择文件</Button>
            <span className="sb-upload-tip">{description}</span>
          </div>
          <div className="sb-upload-flow-drop">
            点击上方“选择文件”或将文件拖拽到此区域
          </div>
          <div className="sb-upload-flow-actions">
            <Button type="secondary" onClick={(event) => event.stopPropagation()}>
              取消上传
            </Button>
            <Button type="primary" disabled onClick={(event) => event.stopPropagation()}>
              点击上传
            </Button>
          </div>
        </div>
      </Upload>
    </div>
  );
}
