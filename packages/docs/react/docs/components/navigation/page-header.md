---
sidebar_position: 1
---

# 页头 PageHeader

页头位于页容器中，页容器顶部，起到了内容概览和引导页级操作的作用。包括由面包屑、标题等内容

## 基本用法

基础页头，适合使用在需要简单描述的场景。默认是没有底色的。

```jsx live
function Demo() {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <PageHeader
        style={{ background: 'var(--color-bg-2)' }}
        title="Starbucks"
        subTitle="This is a description"
        extra={
          <div>
            <Radio.Group mode="fill" type="button" defaultValue="small">
              <Radio value="large">Large</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="small">Small</Radio>
            </Radio.Group>
          </div>
        }
      />
    </div>
  );
};
```

## 带有面包屑

基础页头，适合使用在需要简单描述的场景。默认是没有底色的。

```jsx live
function Demo() {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <PageHeader
        style={{ background: 'var(--color-bg-2)' }}
        title="Starbucks"
        subTitle="This is a description"
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'Home',
            },
            {
              path: '/channel',
              breadcrumbName: 'Channel',
            },
            {
              path: '/news',
              breadcrumbName: 'News',
            },
          ],
        }}
        extra={
          <div>
            <Radio.Group mode="fill" type="button" defaultValue="small">
              <Radio value="large">Large</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="small">Small</Radio>
            </Radio.Group>
          </div>
        }
      />
    </div>
  );
};
```

## 底色透明

默认是没有底色的，如果有需要可以通过`style`或类名设置不同底色。

```jsx live
function Demo() {
  const ghostBgStyle = {
    backgroundImage: 'radial-gradient(var(--color-fill-3) 1px, rgba(0, 0, 0, 0) 1px)',
    backgroundSize: '16px 16px',
    padding: 20,
  };

  return (
    <div style={ghostBgStyle}>
      <PageHeader
        title="Starbucks"
        subTitle="This is a description"
        backIcon
        onBack={() => Message.info('点击了返回按钮')}
        extra={
          <div>
            <Radio.Group mode="fill" type="button" defaultValue="small">
              <Radio value="large">Large</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="small">Small</Radio>
            </Radio.Group>
          </div>
        }
      />
    </div>
  );
};
```

## 组合示例

组件提供的完整能力

```jsx live
function Demo() {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <PageHeader
        style={{ background: 'var(--color-bg-2)' }}
        title="Starbucks"
        subTitle={
          <>
            This is a description
            <Tag color="red" size="small" style={{ marginLeft: 8 }}>
              Default
            </Tag>
          </>
        }
        backIcon
        onBack={() => Message.info('点击了返回按钮')}
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'Home',
            },
            {
              path: '/channel',
              breadcrumbName: 'Channel',
            },
            {
              path: '/news',
              breadcrumbName: 'News',
            },
          ],
        }}
        extra={
          <div>
            <Button type="secondary" style={{ marginRight: 12 }}>
              Cancel
            </Button>
            <Button type="primary">Save</Button>
          </div>
        }
      >
        <Typography.Paragraph
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          For other uses, see Design
        </Typography.Paragraph>
        <Typography.Paragraph>
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design. In some cases, the direct construction of an object without an
          explicit prior plan (such as in craftwork, some engineering, coding, and graphic design)
          may also be considered to be a design activity. The design usually has to satisfy certain
          goals and constraints, may take into account aesthetic, functional, economic, or
          socio-political considerations, and is expected to interact with a certain environment.
          Major examples of designs include architectural blueprints,engineering drawings, business
          processes, circuit diagrams, and sewing patterns.Major examples of designs include
          architectural blueprints,engineering drawings, business processes, circuit diagrams, and
          sewing patterns.
        </Typography.Paragraph>
      </PageHeader>
    </div>
  );
};
```

## API

### PageHeader

|参数名|描述|类型|默认值|
|---|---|---|---|
|extra|展示额外内容|ReactNode |`-`|
|footer|底部内容|ReactNode |`-`|
|subTitle|次级标题|ReactNode |`-`|
|title|主标题|ReactNode |`-`|
|backIcon|返回图标，设置为 `false` 时会隐藏图标|ReactNode \| boolean |`-`|
|breadcrumb|面包屑，接受面包屑的所有属性, BreadcrumbProps|BreadcrumbProps |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onBack|点击返回图标的回调|(e: MouseEvent) => void |`-`|

