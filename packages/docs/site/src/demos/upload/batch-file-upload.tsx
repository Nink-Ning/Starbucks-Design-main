import { Button, Table, Upload } from '@sbux/starbucks-design-react';
import type { TableColumnProps } from '@sbux/starbucks-design-react';
import './showcase.css';

const description = '支持批量上传文件，文件格式不限，最多只能上传 5 份文件';
const columns: TableColumnProps[] = [
  { title: '文件名', dataIndex: 'name' },
  { title: '大小', dataIndex: 'size', width: 90 },
  { title: '状态', dataIndex: 'status' },
  { title: '操作', dataIndex: 'operation', width: 90 },
];

export default function Demo() {
  return (
    <div className="sb-upload-demo sb-upload-flow-upload">
      <Upload
        action="/"
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
          <Table
            className="sb-upload-file-table"
            border={false}
            columns={columns}
            data={[]}
            pagination={false}
            noDataElement={
              <div className="sb-upload-table-empty">
                点击上方“选择文件”或将文件拖拽到此区域
              </div>
            }
          />
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
