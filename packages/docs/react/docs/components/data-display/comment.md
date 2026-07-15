---
sidebar_position: 1
---

# 评论 Comment

展示评论信息

## 基础用法

一个基本的评论组件，带有作者、头像、时间和操作。

## en-US

A basic comment component with author, avatar, time and actions.

```jsx live


function Demo() {
  const [like, setLike] = React.useState()
  const [star, setStar] = React.useState()
  const actions = [
    <button className="custom-comment-action" key="heart" onClick={() => setLike(!like)}>
      {like ? <IconHeartFill style={{ color: '#f53f3f' }} /> : <IconHeart />}
      {83 + (like ? 1 : 0)}
    </button>,
    <button className="custom-comment-action" key="star" onClick={() => setStar(!star)}>
      {star ? <IconStarFill style={{ color: '#ffb400' }} /> : <IconStar />}
      {3 + (star ? 1 : 0)}
    </button>,
    <button className="custom-comment-action" key="reply">
      <IconMessage /> Reply
    </button>
  ]
  return (
    <Comment
      actions={actions}
      author="Socrates"
      avatar={
        <Avatar>
          <img
            alt="avatar"
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp"
          />
        </Avatar>
      }
      content={<div>Comment body content.</div>}
      datetime="1 hour"
    />
  )
}
```

## 对齐

通过 `align` 属性可以设置 `datetime` 和 `actions` 的对齐方式.

```jsx live


function Demo() {
  const [like, setLike] = React.useState(true)
  const [star, setStar] = React.useState(true)
  const actions = [
    <button className="custom-comment-action" key="heart" onClick={() => setLike(!like)}>
      {like ? <IconHeartFill style={{ color: '#f53f3f' }} /> : <IconHeart />}
      {83 + (like ? 1 : 0)}
    </button>,
    <button className="custom-comment-action" key="star" onClick={() => setStar(!star)}>
      {star ? <IconStarFill style={{ color: '#ffb400' }} /> : <IconStar />}
      {3 + (star ? 1 : 0)}
    </button>,
    <button className="custom-comment-action" key="reply">
      <IconMessage /> Reply
    </button>
  ]
  return (
    <Comment
      actions={actions}
      align="right"
      author="Balzac"
      avatar={
        <Avatar>
          <img
            alt="avatar"
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
          />
        </Avatar>
      }
      content={
        <div>
          A design is a plan or specification for the construction of an object or system or for the implementation of
          an activity or process, or the result of that plan or specification in the form of a prototype, product or
          process.
        </div>
      }
      datetime="1 hour"
    />
  )
}
```

## 嵌套评论

Comments 组件可以嵌套。

## en-US

Comments can be nested.

```jsx live
function Demo() {
  const actions = (
    <span className="custom-comment-action">
      <IconMessage /> Reply
    </span>
  )
  return (
    <Comment
      actions={actions}
      author={'Socrates'}
      avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp"
      content={<div>Comment body content.</div>}
      datetime="1 hour"
    >
      <Comment
        actions={actions}
        author="Balzac"
        avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
        content={<div>Comment body content.</div>}
        datetime="1 hour"
      >
        <Comment
          actions={actions}
          author="Austen"
          avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
          content={<div> Reply content </div>}
          datetime="1 hour"
        />
        <Comment
          actions={actions}
          author="Plato"
          avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          content={<div> Reply content </div>}
          datetime="1 hour"
        />
      </Comment>
    </Comment>
  )
}
```

## 配合List使用

配合 List 组件展现评论列表。

```jsx live


function Demo() {
  const [likes, setLikes] = React.useState([])
  const [stars, setStars] = React.useState([])
  const data = [
    {
      id: 1,
      author: 'Socrates',
      like: 13,
      star: 3,
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
      content: 'Comment body content.',
      datetime: '1 hour'
    },
    {
      id: 2,
      author: 'Balzac',
      like: 12,
      star: 1,
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
      content: 'Comment body content.',
      datetime: '2 hour'
    }
  ]
  return (
    <List bordered={false} header={<span>2 comments</span>}>
      {data.map((item, index) => {
        const like = likes.indexOf(item.id) > -1
        const star = stars.indexOf(item.id) > -1
        return (
          <List.Item key={item.id}>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
              actions={[
                <button
                  className="custom-comment-action"
                  key="heart"
                  onClick={() => setLikes(like ? likes.filter((x) => x !== item.id) : [...likes, item.id])}
                >
                  {like ? <IconHeartFill style={{ color: '#f53f3f' }} /> : <IconHeart />}
                  {item.like + (like ? 1 : 0)}
                </button>,
                <button
                  className="custom-comment-action"
                  key="star"
                  onClick={() => setStars(star ? stars.filter((x) => x !== item.id) : [...stars, item.id])}
                >
                  {star ? <IconStarFill style={{ color: '#ffb400' }} /> : <IconStar />}
                  {item.star + (star ? 1 : 0)}
                </button>,
                <button className="custom-comment-action" key="reply">
                  <IconMessage /> Reply
                </button>
              ]}
            />
          </List.Item>
        )
      })}
    </List>
  )
}
```

## 回复框

实现一个评论回复框。

## en-US

Display as a reply editor.

```jsx live
function Demo() {
  return (
    <Comment
      align="right"
      actions={
        <span className="custom-comment-action">
          <IconMessage /> Reply
        </span>
      }
      author="Balzac"
      avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
      content={
        <div>
          A design is a plan or specification for the construction of an object or system or for the implementation of
          an activity or process, or the result of that plan or specification in the form of a prototype, product or
          process.
        </div>
      }
      datetime="1 hour"
    >
      <Comment
        align="right"
        actions={[
          <Button key="0" type="secondary">
            Cancel
          </Button>,
          <Button key="1" type="primary">
            Reply
          </Button>
        ]}
        avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp"
        content={
          <div>
            <Input.TextArea placeholder="Here is you content." />
          </div>
        }
      ></Comment>
    </Comment>
  )
}
```

## API

### Comment

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 靠左/靠右 展示 datetime 和 actions | \| 'left'\| 'right'\| &#123;datetime?: 'left' \| 'right';actions?: 'left' \| 'right';} | `-` |
| actions | 操作列表 | ReactNode | `-` |
| author | 作者名 | ReactNode | `-` |
| avatar | 头像 | ReactNode | `-` |
| content | 评论内容 | ReactNode | `-` |
| datetime | 时间描述 | ReactNode | `-` |
| className | 节点类名 | string \| string[] | `-` |
| style | 节点样式 | CSSProperties | `-` |
