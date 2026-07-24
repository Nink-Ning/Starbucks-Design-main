import { Upload } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div className="upload-demo-trigger">
      <Upload
        action="/"
        onChange={(fileList, file) => {
          console.log(fileList, file);
        }}
      >
        <div className="trigger">
          <div>
            Drag the file here or
            <span style={{ color: '#3370FF', padding:"0 4px" }} >
              Click to upload
            </span>
          </div>
        </div>
      </Upload>
    </div>
  );
};
