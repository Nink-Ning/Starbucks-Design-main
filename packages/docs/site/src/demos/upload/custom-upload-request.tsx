import { useState } from 'react';
import { Upload } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [fileList, setFileList] = useState([]);
  return (
    <Upload
      fileList={fileList}
      onChange={setFileList}
      customRequest={(option) => {
        const { onProgress, onError, onSuccess, file } = option;
        const xhr = new XMLHttpRequest();

        if (xhr.upload) {
          xhr.upload.onprogress = function (event) {
            let percent;

            if (event.total > 0) {
              percent = (event.loaded / event.total) * 100;
            }

            onProgress(parseInt(percent, 10), event);
          };
        }

        xhr.onerror = function error(e) {
          onError(e);
        };

        xhr.onload = function onload() {
          if (xhr.status < 200 || xhr.status >= 300) {
            return onError(xhr.responseText);
          }

          onSuccess(xhr.responseText, xhr);
        };

        const formData = new FormData();
        formData.append(name || 'file', file);
        xhr.open('post', '//upload-z2.qbox.me/', true);
        xhr.send(formData);
        return {
          abort() {
            xhr.abort();
          },
        };
      }}
    />
  );
}
