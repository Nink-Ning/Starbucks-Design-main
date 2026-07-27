# 组件文档迁移规则(RULES.md)

> **归档说明**:旧站(`packages/docs/react`、`packages/docs/vue`)已于 Task 13 删除。本文档
> 下方提到的旧站源路径不再存在于工作树中;批量迁移子 agent 如需读取旧站源文件,请从最后一次
> 包含旧站的提交 `ce368c7bf8619adf79d027a527b5043a3164bc4c` 的 git 历史中找回。

本文档是批量迁移子 agent 的**操作手册**。规则由标杆迁移 Button(`packages/docs/site/src/content/docs/components/general/button.mdx`)固化而来,所有示例均来自该次真实迁移。执行时逐条照做,不要自行发明变体;遇到本文档未覆盖的情况,记入迁移报告,不要擅自扩展基础设施。

**输入**(一律只读,禁止修改旧站任何文件):

- `scripts/docs-migration/migration-map.json` 中该组件的条目:`slug`、`category`、`title`、`reactSrc`、`vueSrc`、`vueDemosDir`、`frameworks`
- React 旧站文档:`reactSrc`(如 `packages/docs/react/docs/components/general/button.md`),demo 为内联 ` ```jsx live ` 代码块
- Vue 旧站文档:`vueSrc` + `vueDemosDir` 下的 `*.vue` demo 文件

**输出**:

| 产物 | 路径模板 |
| --- | --- |
| 内容页 | `packages/docs/site/src/content/docs/components/<category>/<slug>.mdx` |
| React demos | `packages/docs/site/src/demos/<slug>/<demo名>.tsx` |
| Vue demos | `packages/docs/site/src/demos/<slug>/<demo名>.vue` |

`<category>`、`<slug>` 一律取自 migration-map.json,不要从旧站路径猜。

---

## 规则 1:目标文件路径

- 内容页:`src/content/docs/components/<category>/<slug>.mdx`(单数目录名以 map 为准,如 `general`、`data-display`)。
- Demo:`src/demos/<slug>/` 目录,React 用 `.tsx`,Vue 用 `.vue`,**同一章节的两个文件必须同名**(见规则 3)。这是硬约束:`<Demo name="<slug>/<demo名>" />` 通过同一个 name 同时解析 `<demo名>.tsx` 和 `<demo名>.vue`,不同名 = 单侧渲染缺失。

## 规则 2:frontmatter 转换

旧站(两站相同):

```md
---
sidebar_position: 1
---

# 按钮 Button
```

新站(Button 实际结果):

```yaml
---
title: 按钮 Button
sidebar:
  order: 1
---
```

1. `sidebar_position: N` → `sidebar:\n  order: N`(取 React 站的 N;两站不一致时也取 React 站的)。单框架组件(`reactSrc` 或 `vueSrc` 为 `null`)时,取存在侧的 N。
2. 正文第一个 `# 一级标题` 的文本上升为 `title:`(应与 map 中 `title` 字段一致,不一致以 map 为准),**正文中删除该一级标题行**。正文从组件一句话简介开始。
3. 不要添加其他 frontmatter 字段。

## 规则 3:demo 文件命名

- 命名 = 章节语义的英文短名,kebab-case。
- **与 Vue demo 同名对齐优先**:`vueDemosDir` 里已存在的文件名就是标准名,对应章节的 React 版必须取完全相同的文件名。Button 实例:Vue 站已有 `button-size.vue`/`button-status.vue`/`loading-state.vue`,故 React 版命名为 `button-size.tsx`/`button-status.tsx`/`loading-state.tsx`(**不是** `size.tsx`/`status.tsx`/`loading.tsx`)。
- 仅当某章节 Vue 侧无 demo 时,才由你为 React demo 起名(章节名直译英文,kebab-case,如「基本用法」→ `basic`)。
- Button 固化的完整对照(9 个章节 9 对文件):basic、icon、shape、button-size、button-status、disabled、loading-state、button-group、long。
- **同一章节含多个 ` ```jsx live ` 代码块**(旧站已知案例:checkbox.md「自定义节点内容」、trigger.md「受控用法」、result.md、calendar.md):按机械命名,不要另起语义名——章节主名沿用规则 3 其余条款算出的名字,第 2、3…个代码块依次命名为 `<name>-2.tsx`、`<name>-3.tsx`。mdx 中该章节依序放多个 `<Demo>`(`<Demo name="<slug>/<name>" />`、`<Demo name="<slug>/<name>-2" />` ……)。若 Vue 侧同一章节也存在多个 demo 文件,按文件名字面对齐配对(即 Vue 侧第 N 个文件名如果不是 `<name>-N`,以 Vue 侧文件名为准重新对齐 React 侧命名,套用规则 3「与 Vue demo 同名对齐优先」);两侧数量配不上的,配不上的那个(些)按单侧渲染处理(`<Demo>` 自动降级显示「该组件暂无 XX 示例」,是预期行为,不算缺陷)。

## 规则 4:jsx live → .tsx 转换(三条规则 + 实例)

对 React 旧站 md 中每个 ` ```jsx live ` 块:

1. **函数改导出**:块内顶层函数(名字可能是 `Demo`、`App` 等任意名)统一改为 `export default function Demo() { ... }`,函数体逐字保留(包括 style 对象、注释、children)。
2. **补组件 import**:旧站是全局作用域注入(无 import)。新站必须显式:
   - 组件(`Button`、`Space`、`Divider`、`Tag`……)from `@sbux/starbucks-design-react`
   - 所有 `Icon*` 标识符 from `@sbux/starbucks-design-react/icon`
   - 子组件通过父组件访问,**不单独 import**:`Button.Group` 直接用,只 import `Button`。
3. **补 React hooks import**:代码用到 `useState`/`useEffect`/`useRef` 等时,`import { useState } from 'react';` 置于文件第一行。

真实 before/after(Button「图标按钮」章节):

Before(旧站 button.md 内联块):

````md
```jsx live
function Demo() {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button type="primary" icon={<IconDelete />}>
        Delete
      </Button>
    </Space>
  )
}
```
````

After(`src/demos/button/icon.tsx`):

```tsx
import { Button, Space } from '@sbux/starbucks-design-react';
import { IconPlus, IconDelete } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button type="primary" icon={<IconDelete />}>
        Delete
      </Button>
    </Space>
  );
}
```

找 import 名单的方法:扫代码块里所有大写开头的 JSX 标签 + 所有 `Icon` 前缀标识符(包括 `{!loading && <IconPlus />}` 这类表达式里的)。拿不准某 API 是否存在时,查 `packages/docs/site/node_modules/@sbux/starbucks-design-react/node_modules/@arco-design/web-react/es/<组件>/interface.d.ts`。

## 规则 5:Vue demos 复制 + 两条强制修正

从 `vueDemosDir` 整目录复制到 `src/demos/<slug>/`,**模板与逻辑一律不改**,但以下两条属于「在新站无法构建」的机械修正,必须做:

1. **icon import 路径重写**(旧包名在新站解析不到,pnpm 不提升):

   ```
   @arco-design/web-vue/es/icon  →  @sbux/starbucks-design-vue/icon
   @arco-design/web-vue(主入口) →  @sbux/starbucks-design-vue
   ```

   等价命令:`sed -i '' "s|@arco-design/web-vue/es/icon|@sbux/starbucks-design-vue/icon|" <file>.vue`

2. **less → 纯 CSS**(新站未安装 less 预处理器,`lang="less"` 会直接构建失败):`<style scoped lang="less">` → `<style scoped>`;less 转义语法 `var(~'--color-border')` → `var(--color-border)`;若出现嵌套选择器等真正的 less 语法,手工展开为纯 CSS。Button 实例:`long.vue` 仅需上述两处替换。
3. **补全缺失的 icon import(不只是「保留」)**:任何 template 中使用了 `<icon-*>` 标签的 Vue demo,最终文件必须含有覆盖全部所用图标的 `import { IconXxx, ... } from '@sbux/starbucks-design-vue/icon'`(置于 `<script setup lang="ts">` 中)。旧站文件如果本身就缺失该 import(旧站可能依赖全局注入),复制过来后必须补上——不能因为「模板与逻辑一律不改」而遗漏这一步,import 语句不属于模板/逻辑,是新站构建必需的显式声明。图标名 = 模板里 `<icon-xxx>` kebab-case 转 PascalCase 加 `Icon` 前缀(如 `<icon-down>` → `IconDown`)。

组件本身(`Button`、`Space`、`ButtonGroup`、`Divider`……)不需要 import——`src/vue-app.ts` 已全局注册全部 `@sbux/starbucks-design-vue` 导出及 `A` 前缀别名。但 **Icon 组件不在全局注册范围内**,凡模板用到 `<icon-*>` 的 demo 必须显式 import(见上第 3 条)。

4. **命令式 API(`Message`/`Notification`/`Modal.xxx`)的 prefix-cls 陷阱**:每个 Vue demo 都渲染在自己的 Astro island 里,`VueDemoLoader.vue` 用 `<ConfigProvider prefix-cls="arco-v" global>` 包裹,使该 island 内声明式组件统一走 `arco-v-*` 样式类(与文档站样式变体对齐)。但命令式 API(`Message.xxx`、`Notification.xxx`、`Modal.open/confirm/info/success/warning/error`)默认不读取这个 ConfigProvider——不传第二个参数时会退回全局 `arco` 前缀(样式错位,视觉不带主题)。此外,旧站示例常见的 `$modal.xxx(...)`(挂在 `globalProperties` 上的写法)在新站**直接抛错**,因为新站从未通过 `app.use()` 注册该全局属性。正确做法:在 `<script setup>` 里 `import { getCurrentInstance } from 'vue'`,用 `const appContext = getCurrentInstance()!.appContext` 拿到当前 island 的 app 上下文,再显式 `import { Modal } from '@sbux/starbucks-design-vue'`(或 `Message`/`Notification`),调用时把 `appContext` 作为最后一个参数传入,例如 `Modal.info(config, appContext)`——这样弹出的浮层才会继承 `arco-v` 前缀。**禁止**使用 `$modal`/`$message`/`$notification` 这类 `globalProperties` 写法。规范实现见 `packages/docs/site/src/demos/table/custom-render.vue`。

## 规则 6:章节取并集与缺侧处理

- 新页章节 = 两站章节的**并集**。同一语义、不同标题措辞时合并为一个章节(Button 实例:React「禁用按钮」+ Vue「禁用状态」→「禁用状态」;「加载中按钮」+「加载中状态」→「加载中状态」)。合并时标题文字取哪一站的:**统一采用 Vue 站标题**(措辞更中性,Button 实例即取 Vue 的「禁用状态」「加载中状态」而非 React 的「禁用按钮」「加载中按钮」)——这是固定 tie-break,不需要逐案判断。
- **章节排序:机械规则,不做主观判断**。以 **React 文档的章节顺序为基准**(逐条对齐 React 旧站 md 里各章节出现的先后顺序)。Vue 独有的章节(React 侧没有对应语义章节的)插入到语义最接近的章节之后;实在无法判断该插在哪的,统一放在正文最后一个业务章节之后、`## API` 之前。Button 固化顺序(即按此规则算出的结果,可作模板核对):基本用法 → 图标按钮 → 按钮形状 → 按钮尺寸 → 按钮状态 → 禁用状态 → 加载中状态 → 组合按钮 → 长按钮。
- 某章节单侧缺 demo 时:
  - **简单组件/纯 props 展示**:照另一侧 demo 用目标框架 API 补写(React 补写注意:`type` 取值为 `default | primary | secondary | dashed | text | outline`,组合按钮是 `Button.Group`,加载用 `loading`,通栏用 `long`;Vue 侧尺寸默认值叫 `medium`,React 叫 `default`)。
  - **复杂交互**(受控联动、异步、大量状态):先留缺,`<Demo>` 会自动降级显示「该组件暂无 XX 示例」,并**将缺失项记入迁移报告**。
- 两侧 demo 内容不必逐像素一致,各自忠实于本框架旧站即可(Button 实例:React `button-group.tsx` 与 Vue `button-group.vue` 的按钮组内容不同,保留各自原样)。

## 规则 7:正文文案与框架敏感语句

- 两站文案一致或仅措辞差异 → 写一份中立文案。
- 句子中出现**具体 prop 名/取值/默认值且两端不同** → 拆成 FrameworkBlock 双写。Button 实例(尺寸章节,React 默认值 `default` vs Vue `medium`):

  ```mdx
  <FrameworkBlock framework="react">
  按钮分为 `mini`、`small`、`default`、`large` 四种尺寸。……推荐及默认尺寸为 `default`(中)。
  </FrameworkBlock>

  <FrameworkBlock framework="vue">
  按钮分为 `mini`、`small`、`medium`、`large` 四种尺寸。……推荐(默认)尺寸为 `medium`。
  </FrameworkBlock>
  ```

- camelCase vs kebab-case 的同一 prop(如 `loadingFixedWidth` / `loading-fixed-width`)也算敏感,双写。
- 中立句(与框架无关的说明)放在 FrameworkBlock 之外,避免重复。

## 规则 8:API 区块

- 结构固定:`## API` 下先 `<FrameworkBlock framework="react">` 包 React 站 API 全部表格,再 `<FrameworkBlock framework="vue">` 包 Vue 站 API 全部表格(Props/Events/Slots/子组件表全带上)。**不合并、不改写、不增删行**,仅做 MDX 语法安全调整(见规则 10)。
- FrameworkBlock 开标签后、闭标签前**必须各留一个空行**,否则内部的 `###` 标题和表格不会按 markdown 解析:

  ```mdx
  <FrameworkBlock framework="react">

  ### Button

  | 参数名 | 描述 | 类型 | 默认值 |
  | --- | --- | --- | --- |
  ...

  </FrameworkBlock>
  ```

  (规则 7 的单行文案双写不受此限制,单行文本无需空行。)

## 规则 9:import 相对路径

内容页顶部固定两行(路径深度按 category 层级算,components 下都是 4 层上溯):

```mdx
import Demo from '../../../../components/Demo.astro';
import FrameworkBlock from '../../../../components/FrameworkBlock.astro';
```

即 `src/content/docs/components/<category>/<slug>.mdx` → 上溯 4 级到 `src/` 再进 `components/`。**两行为默认**,绝大多数页面两者都用得到,直接照抄两行;仅当整页确实未用到 `FrameworkBlock` 或 `Demo`(如某单框架组件页恰好无 demo)时,对应那一行才可省略,不要为了「整洁」逐案取舍。

## 规则 10:MDX 语法字符(踩过的坑)

MDX 中 `<` 开启 JSX、`{` 开启表达式,裸露即构建报错。逐条检查粘贴的 API 表和文案:

1. 类型单元格含 `<`、`{`、`=>` 的,**必须**包行内反引号:`(e: Event) => void` → `` `(e: Event) => void` ``。
2. 旧站的 HTML 实体写法转为反引号真实字符:`HTMLProps&lt;HTMLAnchorElement&gt;` → `` `HTMLProps<HTMLAnchorElement>` ``(Button React 表实际改动仅此两处 + onClick 一处)。
3. 标题/正文里出现组件标签形式(如 `<button>`、`<a-button-group>`)必须在反引号内——Vue 站标题 `` ### `<button>` Props `` 原文已带反引号,原样保留即可;自己写双写文案时别忘加。
4. 表格内反引号代码里的转义竖线 `` `'a' \| 'b'` `` 原样保留,GFM 表格需要 `\|` 防断列。
5. 纯文本类型如 `boolean`、`string \| string[]`、`'button' \| 'submit'` 不含危险字符,可不动(保持"最小改动"原则)。
6. 构建若报 MDX 语法错,报错行号定位回 mdx 对应行,包反引号重试;不要改基础设施。

## 规则 11:单框架组件页(`frameworks` 只有一个值时)

- frontmatter 之后第一行加提示块(Starlight aside 语法):

  ```mdx
  :::note[仅 React 提供]
  该组件目前仅提供 React 版本。
  :::
  ```

  (Vue 单侧同理:`:::note[仅 Vue 提供]`)
- 全文内容(含 API)包一层对应的 `<FrameworkBlock framework="...">`(提示块本身留在外面,两种框架下都可见)。
- Demo 只写存在侧的文件,`<Demo>` 对缺失侧自动降级,无需占位文件。

## 规则 12:验证(每个组件必做)

```bash
pnpm -C packages/docs/site build
```

必须 PASS。再静态抽查产物:

```bash
grep -o 'data-demo="[^"]*"' packages/docs/site/dist/components/<category>/<slug>/index.html
grep -o "astro-island" packages/docs/site/dist/components/<category>/<slug>/index.html | wc -l
```

- `data-demo` 数 = 页面 `<Demo>` 数;
- `astro-island` 数 = 双侧齐全的 demo 数 × 2 + 单侧 demo 数(Button:9 个双侧 demo → 18);
- `dist/_astro/` 下应能看到每个 demo 名对应的 chunk(`basic.*.js` 等)。
- **用到图标的 demo,额外检查图标已被真正打包**:对每个模板/代码里出现 `<icon-*>` 或 `<IconXxx>` 的 demo,`grep` 其对应 chunk(`dist/_astro/<demo名>.*.js`),确认图标是被静态 import 打包进产物(chunk 内能看到图标定义/`IconXxx` 标识符),**而不是**运行时靠 `resolveComponent("icon-xxx")` 动态解析(后者在生产构建下解析不到会静默渲染失败)。等价命令:`grep -o 'resolveComponent("icon-[a-z-]*")' packages/docs/site/dist/_astro/<demo名>.*.js`,应无匹配。

**禁止**启动/杀掉 dev server;验证一律用 `pnpm -C packages/docs/site build` + 对 `dist/` 的静态检查(grep 产物文件),不依赖任何本地/远程运行中的 dev server 端口。禁止修改 `src/components/`、`src/demos/_shared/`、`astro.config.mjs`、`vue-app.ts` 等基础设施;禁止修改旧站文件。

## 规则 13:提交

```bash
git add packages/docs/site/src/content/docs/components/<category>/<slug>.mdx packages/docs/site/src/demos/<slug>
git commit -m "feat(docs-site): migrate <ComponentName> docs"
```

一个组件一个 commit。迁移中留缺的 demo、拿不准的 API 差异,写进各自任务的迁移报告。

---

以下规则由标杆迁移 Input(命名分歧)与 Table(结构分歧)固化而来(`data-entry/input.mdx`、`data-display/table.mdx`),示例均来自该两次真实迁移。

## 规则 14:受控值(v-model 类)正文双写句式模板

React 用 `value`/`onChange` 受控、Vue 用 `v-model` 的组件(几乎所有数据录入组件),在「基本用法」章节(或旧站已有的受控章节)加一组固定句式的 FrameworkBlock 双写,句式模板照抄、按组件替换 prop/事件名:

```mdx
<FrameworkBlock framework="react">
输入框的值可以通过 `value` 与 `onChange` 受控使用,或通过 `defaultValue` 指定默认值(非受控)。
</FrameworkBlock>

<FrameworkBlock framework="vue">
输入框的值可以通过 `v-model`(即 `model-value` 配合 `input` / `change` 事件)双向绑定,或通过 `default-value` 指定默认值(非受控)。
</FrameworkBlock>
```

带参数的 `v-model:xxx`(Table 实例:`v-model:selectedKeys`、`v-model:expandedKeys`)套同一句式:Vue 侧写「可通过 `v-model:selectedKeys` 双向绑定,变化会触发 `select` / `selection-change` 事件」,React 侧写「通过 `rowSelection.selectedRowKeys` 受控,配合 `rowSelection.onChange` 使用」。

## 规则 15:结构分歧组件(Table 类)处理原则

两端「能力相同、API 结构不同」的章节(Table 实例:行选择、展开行、排序/筛选事件模型、单元格合并、可编辑表格、总结行、虚拟列表):

1. **章节仍合并为一个**(标题取 Vue 站,排序取 React 站位置,同规则 6)。
2. **正文整段双写**:React 块忠实转写 React 旧站原文(`expandedRowRender`/`onExpand`/`rowSelection`……),Vue 块忠实转写 Vue 旧站原文(`expandable`/`row-selection`/`span-method`……)。不发明「中立抽象」去描述两套 API。
3. **demo 双端各按本框架惯例实现,不强行对齐 API,只对齐视觉结果**(Table 实例:单元格合并 React 用 `render` 返回 `{ children, props }`,Vue 用 `span-method`,两个 demo 独立成立)。
4. 单侧 demo 需要从零补写且逻辑复杂的,允许留缺(`<Demo>` 自动降级),记入迁移报告;简单纯 props 的仍按规则 6 补写(Table 实例:补写了 React 侧 `row-selector-radio`、`table-scroll`、`text-ellipsis`)。

## 规则 16:demo mock 数据的复用方式

**不建共享 mock 模块、不引入相对 import**——每个 demo 文件内联自带数据,保持复制即可运行。复用的方式是「照抄」:两侧旧站本就使用同一套数据(Jane Doe / Alisa Ross / Kevin Sandra … 五行雇员数据),逐字保留;为缺失侧补写 demo 时,mock 数据从已有侧的 demo 里逐字拷贝(列名 camelCase 两端一致,无需改写)。

## 规则 17:class 组件形式的 jsx live 块

旧站部分 demo 是 `class App extends React.Component`(Input「四种尺寸」、Table「表格属性」)。转换规则:改为 `export default class Demo extends React.Component`,文件第一行 `import React from 'react';`(class 里用到 `React.Component`/`React.createContext` 等命名空间时必须 default import),类体逐字保留。函数组件内用到 `React.createContext` 的同理:`import React, { useState, ... } from 'react';`。

## 规则 18:依赖未安装第三方库的 React demo 一律留缺

旧站 React demo 若依赖新站未安装的第三方库(Table 实例:可伸缩列 `react-resizable`、表头吸顶 `react-sticky`、拖拽排序 `react-sortable-hoc`),**不要**给新站加依赖、也不要改写为无依赖近似实现——该侧留缺,章节保留(正文 React 块保留「配合 react-xxx@x.x.x 可以实现……」原句),记入迁移报告。判断方法:`ls packages/docs/site/node_modules | grep <包名>`。

## 规则 19:MDX 语法补充(Input/Table 踩坑)

1. **`<br>` → `<br/>`**:Vue 站 API 表参数列大量使用裸 `<br>`(Events/Slots 表),MDX 把它当未闭合 JSX 直接报错,必须全部改为 `<br/>`。这是规则 10 之外最高频的机械修正。
2. **多行正文的 FrameworkBlock 必须空行**:规则 8 的「开闭标签内侧各留一空行」不止适用于 API 表——凡块内是多行/多段 markdown(含 `**加粗**` 起头的段落、多句换行文本),同样必须留空行,否则整块按纯文本渲染。单行文案可不留。
3. **TS 类型标注的 demo**:jsx live 里的类型(`TableColumnProps[]`、`useRef<TableInstance>`、`FormInstance`)保留,类型用 `import type { X } from '@sbux/starbucks-design-react';` 单独一行引入(该包 `export * from '@arco-design/web-react'`,类型齐全)。astro build 不做类型检查,旧 demo 的隐式 any 不影响构建。

## 规则 20:非完整 SFC 的「片段式 demo」转静态代码块

旧站个别 `<preview>` 指向的 .vue 文件不是可独立运行的 demo,而是文档插图式片段(Table FAQ 实例:`faq.vue` 引用未定义的 `onClick`、`faq-1.vue` 引用未注册的 `MyTd`、`faq-2.vue` 本身是配套的 MyTd.vue 源码展示)。判定标准:模板引用了文件内不存在且非全局注册的标识符,或文件是另一文件的「配套源码」。处理:**不复制为 demo 文件**,在 mdx 对应位置改为 ` ```vue ` 围栏代码块逐字展示,记入迁移报告。

## 规则 21:单侧独有的 H2 区块(方法/Type/FAQ)

一侧独有的顶级章节(Input React 站 `## 方法`、Table Vue 站 `## Type`、`## FAQ`):整块(含 `##` 标题)包进对应 `<FrameworkBlock>`,紧跟在 API 区块之后、按旧站原有顺序放置。已知外观损耗:Starlight 右侧 TOC 不随框架切换,另一框架下 TOC 里仍会出现这些标题(点击无害),可接受,无需处理。业务章节(含 demo 的 H2)不适用本条——它们的标题保持在 FrameworkBlock 外,仅正文按规则 7 双写。

## 规则 22:全侧留缺的章节禁止写 `<Demo>`(否则整站 build 抛错)

`Demo.astro` 只在「**至少一侧有 demo 文件**」时才自动降级(单侧缺 → 显示「该组件暂无 X 示例」)。当某章节的 demo 在**所有需渲染的框架侧都留缺**时——双框架组件两侧都没写,或**单框架组件唯一那一侧留缺**(标杆案例:icon 的「使用 Icon 组件」章节,React-only 且 React 侧因 Icon/iconfont 不可达而留缺)——**绝对不要**再写 `<Demo name="..." />`:两侧文件都不存在会让 `Demo.astro` 直接 `throw new Error('Demo 不存在: ...')`,导致整站 `pnpm build` 失败(非降级)。

处理:保留该章节的正文说明(照旧站文案,把结尾引出 demo 的冒号改句号),**删掉那一行 `<Demo>`**,该章节作为纯文字/代码块说明存在,并记入迁移报告 gaps。判断标准:凡你决定对某 `<Demo name="slug/x">` **两侧都不产出文件**,就必须同时删掉该 `<Demo>` 标签。自检:提交前确认你写的每个 `<Demo name="slug/x">` 都至少有 `src/demos/slug/x.tsx` 或 `src/demos/slug/x.vue` 之一存在。
