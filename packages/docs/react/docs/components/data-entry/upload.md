---
sidebar_position: 1
---

# 上传 Upload

用户可传输文件或提交相应的内容。

## 基础用法

最基础的上传组件用法。

```jsx live
function Demo() {
  return (
    <div>
      <div>
        <Upload action="/" />
      </div>
      <div>
        <Upload
          action="/"
          disabled
          style={{ marginTop: 40, }}
        />
      </div>
    </div>
  );
};
```

## 用户头像上传

点击上传用户头像，可使用 beforeUpload 限制用户上传的图片格式和大小。

```jsx live

function App() {
  const [file, setFile] = React.useState();
  const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''}`;
  return (
    <div>
      <Upload
        action="/"
        fileList={file ? [file] : []}
        showUploadList={false}
        onChange={(_, currentFile) => {
          setFile({
            ...currentFile,
            url: URL.createObjectURL(currentFile.originFile),
          });
        }}
        onProgress={(currentFile) => {
          setFile(currentFile);
        }}
      >
        <div className={cs}>
          {file && file.url ? (
            <div className="arco-upload-list-item-picture custom-upload-avatar">
              <img src={file.url} />
              <div className="arco-upload-list-item-picture-mask">
                <IconEdit />
              </div>
              {file.status === 'uploading' && file.percent < 100 && (
                <Progress
                  percent={file.percent}
                  type="circle"
                  size="mini"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }}
                />
              )}
            </div>
          ) : (
            <div className="arco-upload-trigger-picture">
              <div className="arco-upload-trigger-picture-text">
                <IconPlus />
                <div style={{ marginTop: 10, fontWeight: 600 }}>Upload</div>
              </div>
            </div>
          )}
        </div>
      </Upload>
    </div>
  );
}
```

## 已上传的文件列表

默认的文件上传列表

```jsx live

function Demo() {
  const defaultFileList = [
    {
      uid: '-1',
      name: 'ice.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      status: 'error',
      uid: '-2',
      percent: 0,
      response: '上传错误提示',
      name: 'cat.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      uid: '-3',
      name: 'light.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
  ];

  return (
    <div>
      <Upload action="/" multiple defaultFileList={defaultFileList}></Upload>
    </div>
  );
};
```

## 照片墙

点击图片预览按钮时，可以`onPreview`中进行预览逻辑。

可以通过 `imagePreview` 属性启用内置的图片预览。（`imagePreview` 属性在 `2.41.0` 支持）

```jsx live
function Demo() {
  return (
    <div>
      <Upload
        multiple
        imagePreview
        defaultFileList={[
          {
            uid: '-2',
            name: '20200717-103937.png',
            url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
          },
          {
            uid: '-1',
            name: 'hahhahahahaha.png',
            url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
          },
        ]}
        action="/"
        listType="picture-card"
        onPreview={(file) => {
          Message.info('click preview icon')
        }}
      />
    </div>
  );
};
```

## 拖拽上传

拖拽上传。当使用拖拽上传，且设置 `accept` 时候，选择后的文件将会被根据后缀名及文件类型被过滤。不符合格式的文件将不会出现在上传列表。

```jsx live

function Demo() {
  const isAcceptFile = (file, accept) => {
    if (accept && file) {
      const accepts = Array.isArray(accept)
        ? accept
        : accept
            .split(',')
            .map((x) => x.trim())
            .filter((x) => x);
      const fileExtension = file.name.indexOf('.') > -1 ? file.name.split('.').pop() : '';
      return accepts.some((type) => {
        const text = type && type.toLowerCase();
        const fileType = (file.type || '').toLowerCase();
        if (text === fileType) {
          // 类似excel文件这种
          // 比如application/vnd.ms-excel和application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
          // 本身就带有.字符的，不能走下面的.jpg等文件扩展名判断处理
          // 所以优先对比input的accept类型和文件对象的type值
          return true;
        }
        if (new RegExp('\\/\\*').test(text)) {
          // image/* 这种通配的形式处理
          const regExp = new RegExp('\\/.*$')
          return fileType.replace(regExp, '') === text.replace(regExp, '');
        }
        if (new RegExp('\\..*').test(text)) {
          // .jpg 等后缀名
          return text === `.${fileExtension && fileExtension.toLowerCase()}`;
        }
        return false;
      });
    }
    return !!file;
  }

  return (
    <Upload
      drag
      multiple
      accept="image/*"
      action="/"
      onDrop={(e) => {
        let uploadFile = e.dataTransfer.files[0]
        if (isAcceptFile(uploadFile, "image/*")) {
          return
        } else {
           Message.info('不接受的文件类型，请重新上传指定文件类型~');
        }
      }}
      tip="Only pictures can be uploaded"
    />
  );
};
```

## 图片列表样式

图片列表样式

```jsx live

function Demo() {
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
```

## 手动上传

设置 `autoUpload` 为 `false`时候，可以通过调用 `submit`方法进行手动上传。`submit` 只会上传处于 `fileList` 中的文件。

```jsx live

function App() {
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
        <Button>Select file</Button>
        <Button type="primary" onClick={onSubmit} disabled={disabled}>
          Start upload
        </Button>
        <Button
          type="primary"
          onClick={(e) => {
            onSubmit(e, true);
          }}
          disabled={disabled}
        >
          Only upload one
        </Button>
      </Space>
    </Upload>
  );
}
```

## 上传前校验

`beforeUpload` 会在每一个文件上传之前执行。如果返回 false 或者 Promise.reject， 那么将会取消当前文件的上传。

```jsx live
function App() {
  return (
    <div>
      <Upload
        multiple
        action="/"
        beforeUpload={(file) => {
          return new Promise((resolve, reject) => {
            Modal.confirm({
              title: 'beforeUpload',
              content: `确认上传 ${file.name}`,
              onConfirm: () => resolve(true),
              onCancel: () => reject('cancel'),
            });
          });
        }}
      />
    </div>
  );
}
```

## 上传前裁剪

`beforeUpload` 会在每一个文件上传之前执行。如果返回 false 或者 Promise.reject， 那么将会取消当前文件的上传。

```jsx live


function App() {
  async function _getCroppedImg(url, pixelCrop, rotation = 0) {
    const image = await new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx || !image) {
      return null;
    }

    const imageSize = 2 * ((Math.max(image.width, image.height) / 2) * Math.sqrt(2));
    canvas.width = imageSize;
    canvas.height = imageSize;

    if (rotation) {
      ctx.translate(imageSize / 2, imageSize / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-imageSize / 2, -imageSize / 2);
    }

    ctx.drawImage(image, imageSize / 2 - image.width / 2, imageSize / 2 - image.height / 2);
    const data = ctx.getImageData(0, 0, imageSize, imageSize);
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.putImageData(
      data,
      Math.round(0 - imageSize / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - imageSize / 2 + image.height * 0.5 - pixelCrop.y)
    );
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    });
  } // 裁剪组件

  const Cropper = (props) => {
    const { file, onOk } = props;
    const [crop, setCrop] = useState({
      x: 0,
      y: 0,
    });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(undefined)

    const url = React.useMemo(() => {
      return URL.createObjectURL(file);
    }, [file]);
    return (
      <div>
        <div
          style={{
            width: '100%',
            height: 280,
            position: 'relative',
          }}
        >
          <EasyCropper
            style={{
              containerStyle: {
                width: '100%',
                height: 280,
              },
            }}
            aspect={4 / 4}
            image={url}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            onRotationChange={setRotation}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels)
            }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        </div>
        <Grid.Row justify="space-between" style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid.Row
            style={{
              flex: 1,
              marginLeft: 12,
              marginRight: 12,
            }}
          >
            <IconMinus
              style={{ marginRight: 10 }}
              onClick={() => {
                setZoom(Math.max(1, zoom - 0.1));
              }}
            />
            <Slider
              style={{ flex: 1 }}
              step={0.1}
              value={zoom}
              onChange={(v) => {
                setZoom(v);
              }}
              min={0.8}
              max={3}
            />
            <IconPlus
              style={{ marginLeft: 10 }}
              onClick={() => {
                setZoom(Math.min(3, zoom + 0.1));
              }}
            />
          </Grid.Row>
          <IconRotateLeft
            onClick={() => {
              setRotation(rotation - 90);
            }}
          />
        </Grid.Row>

        <Grid.Row justify="end">
          <Button onClick={props.onCancel} style={{ marginRight: 20 }}>
            取消
          </Button>
          <Button
            type="primary"
            onClick={async () => {
              const blob = await _getCroppedImg(url || '', croppedAreaPixels, rotation);

              if (blob) {
                const newFile = new File([blob], file.name || 'image', {
                  type: file.type || 'image/*',
                });
                props.onOk(newFile);
              }
            }}
          >
            确定
          </Button>
        </Grid.Row>
      </div>
    );
  };

  return (
    <div>
      <Upload
        listType="picture-card"
        action="/"
        beforeUpload={(file) => {
          return new Promise((resolve) => {
            const modal = Modal.confirm({
              title: '裁剪图片',
              onCancel: () => {
                Message.info('取消上传');
                resolve(false);
                modal.close();
              },
              simple: false,
              width: 500,
              content: (
                <Cropper
                  file={file}
                  onOk={(file) => {
                    resolve(file);
                    modal.close();
                  }}
                  onCancel={() => {
                    resolve(false);
                    Message.info('取消上传');
                    modal.close();
                  }}
                />
              ),
              footer: null,
            });
          });
        }}
      />
    </div>
  );
}
```

## 移除前校验

`onRemove` 会在每个文件从上传列表中删除之前执行。如果返回 false 或者 Promise.reject，那么将会终止移除操作。

```jsx live

class App extends React.Component {
  render() {
    return (
      <div>
        <Upload
          multiple
          action="/"
          onRemove={(file) => {
            return new Promise((resolve, reject) => {
              Modal.confirm({
                title: 'onRemove',
                content: `确认删除 ${file.name}`,
                onConfirm: () => resolve(true),
                onCancel: () => reject('cancel'),
              });
            });
          }}
          defaultFileList={[
            {
              uid: '-2',
              name: 'light.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
            },
            {
              uid: '-1',
              name: 'ice.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
            },
          ]}
        />
      </div>
    );
  }
}
```

## 限制上传数量

通过`limit`限制上传的最大数量。超出后上传按钮会隐藏.

```jsx live
function App() {
  return (
    <Upload
      action="/"
      limit={3}
      multiple
      onExceedLimit={() => {
        Message.warning('超过上传数量限制！最多上传3个');
      }}
    />
  );
}
```

## 自定义上传节点

可以传入自定义内容作为文件上传的触发节点。

```jsx live
function Demo() {
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
```

## 自定义图标

`showUploadList` 字段可以设置图标。

```jsx live

function App() {
  const [listType, setListtype] = React.useState('text');
  return (
    <div>
      <Typography.Text>Type:</Typography.Text> &emsp;
      <Radio.Group
        name="listType"
        value={listType}
        onChange={setListtype}
        style={{ marginLeft: 20, marginBottom: 20 }}
        options={['text', 'picture-list', 'picture-card']}
      ></Radio.Group>
      <div>
        <Upload
          showUploadList={{
            // Please dont remove this comment
            reuploadIcon: <IconUpload />,
            cancelIcon: <IconClose />,
            fileIcon: <IconFileAudio />,
            removeIcon: <IconClose />,
            previewIcon: null,
            errorIcon: <IconFaceFrownFill />,
            fileName: (file) => {
              return (
                <a
                  onClick={() => {
                    Message.info('click ' + file.name);
                  }}
                >
                  {file.name}
                </a>
              );
            },
          }}
          progressProps={{
            formatText: (percent) => `${percent}%`,
          }}
          multiple
          defaultFileList={[
            {
              uid: '-2',
              name: 'light.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
            },
            {
              uid: '-1',
              name: 'ice.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
            },
          ]}
          listType={listType}
          action="/"
        />
      </div>
    </div>
  );
}
```

## 自定义文件上传列表展示

传入 `renderUploadList` 可以自定义展示文件上传列表。第一个参数是当前上传列表，第二个参数是上传列表相关的属性。详细可参考 `&lt;UploadListProps>`

```jsx live
function App() {
  const renderUploadList = (filesList, props) => (
    <div style={{ display: 'flex', marginTop: 20, }} >
      {filesList.map((file) => {
        const url = file.url || URL.createObjectURL(file.originFile);
        return (
          <Card
            key={file.uid}
            hoverable
            style={{
              width: 140,
              marginRight: 10,
            }}
            bodyStyle={{ padding: '4px 8px', }}
            cover={
              <img
                src={url}
                style={{ width: '100%', }}
              />
            }
            actions={[
              <div
                onClick={() => {
                  Modal.info({
                    title: '预览',
                    content: <img src={url || file.url} width="100%" />,
                  });
                }}
              >
                <IconEye style={{ fontSize: 12, }} />
              </div>,
              <div>
                <IconDelete
                  style={{ fontSize: 12, }}
                  onClick={() => {
                    props.onRemove(file);
                  }}
                />
              </div>,
            ]}
          >
            <Card.Meta description={file.name.split('.')[0]} />
          </Card>
        );
      })}
    </div>
  );

  return (
    <div>
      <Upload
        action="/"
        defaultFileList={[
          {
            uid: '-2',
            name: 'light.png',
            url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
          },
          {
            uid: '-1',
            name: 'ice.png',
            url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
          },
        ]}
        renderUploadList={renderUploadList}
      />
    </div>
  );
}
```

## 自定义上传实现

默认通过 Ajax 请求上传，可以设置 customRequest 覆盖默认的上传请求，实现自定义上传。

返回值是一个对象，包含 `abort` 用来终止上传。

```jsx live

function App() {
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
```

## 自定义进度条

`progressProps` 字段可以自定义进度条属性。

```jsx live

function App() {
  const [fileList, setFileList] = React.useState([
    {
      status: 'init',
      uid: '-2',
      percent: 0,
      name: 'light.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      status: 'error',
      uid: '-1',
      percent: 0,
      name: 'cat.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    },
  ]);
  return (
    <div className="custom-upload-progress">
      <Upload
        showUploadList={{
          startIcon: (
            <Button size="mini" type="text">
              开始上传
            </Button>
          ),
          cancelIcon: (
            <Button size="mini" type="text">
              取消上传
            </Button>
          ),
          reuploadIcon: (
            <Button size="mini" type="text">
              点击重试
            </Button>
          ),
        }}
        progressProps={{
          size: 'small',
          type: 'line',
          showText: true,
          width: '100%',
        }}
        multiple
        fileList={fileList}
        action="/"
        onChange={setFileList}
        onProgress={(file) => {
          setFileList((v) => {
            return v.map((x) => {
              return x.uid === file.uid ? file : x;
            });
          });
        }}
      />
    </div>
  );
}
```

## 文件夹上传

文件夹上传

```jsx live
function Demo() {
  return (
    <div>
      <div>
        <Upload directory action="/" />
      </div>
    </div>
  );
};
```

## API

### Upload

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|autoUpload|是否选中文件后自动上传|boolean |`true`|-|
|directory|文件夹上传|boolean |`-`|2.11.0|
|disabled|禁用|boolean |`-`|-|
|drag|是否拖拽上传|boolean |`-`|-|
|imagePreview|启用内置的图片预览，仅在 listType='picture-card' 时生效。(`v2.41.0`)|boolean |`-`|-|
|multiple|文件多选|boolean |`-`|-|
|withCredentials|上传请求是否携带 cookie|boolean |`-`|-|
|action|上传接口地址|string |`-`|-|
|method|上传请求的 http method|string |`post`|2.55.0|
|listType|展示类型|'text' \| 'picture-list' \| 'picture-card' |`text`|-|
|tip|提示文字，listType 不同，展示会有区别|string \| React.ReactNode |`-`|-|
|accept|接受上传的类型 详细请参考。（`strict` in `2.53.0`，默认为 true。设置为 false 时，accept 表现和原生一致。设置为 true 时，会严格匹配文件后缀名，过滤掉不符合 accept 规则的文件。)|string \| &#123; type: string; strict?: boolean } |`-`|-|
|beforeUpload|上传文件之前的回调。返回 false 或者 promise抛出异常的时候会取消上传。|(file: File, filesList: File[]) =&gt; boolean \| Promise&lt;any&gt; |`() => true`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultFileList|默认已上传的文件列表|UploadItem[] |`-`|-|
|fileList|已上传的文件列表|UploadItem[] |`-`|-|
|headers|上传时使用的 headers|object |`-`|-|
|limit|限制上传数量。默认超出后会隐藏上传节点。对象类型在 `2.28.0` 支持|number \| &#123; maxCount: number; hideOnExceedLimit?: boolean } |`-`|-|
|onRemove|点击删除文件时的回调。返回 `false` 或者 `Promise.reject` 的时候不会执行删除。|(file: UploadItem, fileList: UploadItem[]) =&gt; void \| boolean \| Promise&lt;void \| boolean&gt; |`-`|-|
|progressProps|进度条属性，接收所有进度条的 props。|Partial&lt;ProgressProps&gt; |`-`|-|
|showUploadList|是否展示上传文件列表。预览图标，删除图标，文件图标，重新上传图标，取消上传图标。|boolean \| CustomIconType |`true`|-|
|style|节点样式|CSSProperties |`-`|-|
|customRequest|通过覆盖默认的上传行为，可以自定义自己的上传实现|(options: RequestOptions) => UploadRequestReturn \| void |`-`|-|
|data|上传时的 Body 参数|object \| ((any: any) => object) |`-`|-|
|name|发请求时文件内容的参数名|string \| ((any: any) => string) |`-`|-|
|onChange|上传文件改变时的回调。文件开始上传，失败，成功时会触发。注意：如果需要实时获取文件的上传进度，请在 `onProgress` 中处理。|(fileList: UploadItem[], file: UploadItem) => void |`-`|-|
|onDragLeave|拖拽上传文件离开拖拽区时的回调|(e: React.DragEvent) => void |`-`|2.41.0|
|onDragOver|拖拽上传文件进入拖拽区时的回调|(e: React.DragEvent) => void |`-`|2.41.0|
|onDrop|拖拽上传文件时执行的回调|(e: React.DragEvent) => void |`-`|2.37.0|
|onExceedLimit|超出上传数量限制时触发|(files: File[], fileList: UploadItem[]) => void |`-`|-|
|onPreview|点击预览时候的回调|(file: UploadItem) => void |`-`|-|
|onProgress|文件上传进度的回调|(file: UploadItem, e?: ProgressEvent) => void |`-`|-|
|onReupload|文件重新上传时触发的回调|(file: UploadItem) => void |`-`|-|
|renderUploadItem|自定义上传列表项|(originNode: ReactNode, file: UploadItem, fileList: UploadItem[]) => ReactNode |`-`|-|
|renderUploadList|自定义展示上传文件列表|(fileList: UploadItem[], uploadListProps: UploadListProps) => ReactNode |`-`|-|

### UploadListProps

文件上传列表展示

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|禁用|boolean |`-`|
|onRemove|点击删除文件时的回调。返回 false 或者 Promise.reject 的时候不会执行删除|(file: UploadItem) =&gt; void \| boolean \| Promise&lt;void \| boolean&gt; |`-`|
|onAbort|中止文件上传的回调|(file: UploadItem) => void |`-`|
|onPreview|点击预览时候的回调。|(file: UploadItem) => void |`-`|
|onReupload|重新上传的回调|(file: UploadItem) => void |`-`|

### UploadItem

|参数名|描述|类型|默认值|
|---|---|---|---|
|percent|上传进度百分比|number |`-`|
|name|文件名|string |`-`|
|uid|当前上传文件的唯一标示|string  **(必填)**|`-`|
|url|文件 url|string |`-`|
|originFile|文件对象|File |`-`|
|response|当前文件上传请求返回的响应|object |`-`|
|status|当前上传文件的状态|UploadStatus |`-`|

### RequestOptions

```js
export type RequestOptions = Pick<
  UploadProps,
  "headers" | "name" | "data" | "withCredentials" | "action" | "method"
> & {
  /** 更新当前文件的上传进度 。percent: 当前上传进度百分比 */
  onProgress: (percent: number, event?: ProgressEvent) => void;
  /** 上传成功后，调用onSuccess方法，传入的response参数将会附加到当前上传文件的reponse字段上 */
  onSuccess: (response?: object) => void;
  /** 上传失败后，调用onError方法，传入的 response 参数将会附加到当前上传文件的response字段 */
  onError: (response?: object) => void;
  /** 当前上传文件 */
  file: File;
};
```

### UploadRequestReturn

```js
export interface UploadRequestReturn {
  abort?: () => void;
  [key: string]: any;
}
```

### CustomIconType

```js
export type CustomIconType = {
  previewIcon?: ReactNode;
  removeIcon?: ReactNode;
  fileIcon?: ReactNode;
  reuploadIcon?: ReactNode;
  cancelIcon?: ReactNode;
  startIcon?: ReactNode;
  errorIcon?: ReactNode;
  successIcon?: ReactNode;
  fileName?: (file: UploadItem) => ReactNode;
  // 2.34.0
  progressRender?: (
    file: UploadItem,
    originDom: ReactNode
  ) => React.ReactElement;
  // 2.34.0
  imageRender?: (file: UploadItem) => React.ReactNode;
};
```

### UploadStatus

```js
export type UploadStatus = "init" | "uploading" | "done" | "error";
```

### 方法/Methods

| 参数名     |                                  描述                                   |                         类型                        |
| ---------- | :---------------------------------------------------------------------: | :--------------------------------------------------: |
| submit   | 手动上传时，调用该方法，开始上传。示例。不传参数时，会默认上传全部`init`状态的文件。  | `(file?: UploadItem) => void` |
| abort   | 中止文件上传 | `(file: UploadItem) => void` |
| reupload   | 重新上传文件 | `(file: UploadItem) => void` |

```js
// 自定义图标类型
type CustomIconType = {
  previewIcon?: ReactNode;
  removeIcon?: ReactNode;
  fileIcon?: ReactNode;
  reuploadIcon?: ReactNode;
  cancelIcon?: ReactNode;
  startIcon?: ReactNode;
  errorIcon?: ReactNode;
  fileName?: (file: UploadItem) => ReactNode;
  progressRender?: (file: UploadItem, originDom: ReactNode) => ReactElement; // 2.34.0
  imageRender?: (file: UploadItem) => ReactNode; // 2.34.0
}
```

## 常见问题

#### 如何完全控制上传文件的状态和进度？

可以参考 示例 ，，建议设置 `autoUpload`为 `false`。并通过 `fileList` 和 `onChange` 使组件完全受控。
`fileList `是`UploadItem[]`，可以直接设置元素的 `status`，`percent `等字段。

