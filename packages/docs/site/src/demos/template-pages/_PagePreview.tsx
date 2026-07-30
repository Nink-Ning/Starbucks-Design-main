import { useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Pagination,
  Progress,
  Radio,
  Select,
  Space,
  Statistic,
  Steps,
  Table,
  Tag,
} from '@sbux/starbucks-design-react';
type TemplateKind =
  | 'basic-list'
  | 'filter-list'
  | 'tag-list'
  | 'tree-table-list'
  | 'basic-form'
  | 'grouped-form'
  | 'step-form'
  | 'detail'
  | 'dashboard'
  | 'login'
  | 'result-exception';

type Props = {
  kind: TemplateKind;
};

const C = {
  border: '#e8e8e8',
  brand: '#00754a',
  brandLight: '#e6f7f1',
  danger: '#c9352b',
  fill: '#f5f5f5',
  muted: 'rgba(0,0,0,0.55)',
  page: '#f7f8f9',
  text: 'rgba(0,0,0,0.9)',
  white: '#fff',
};

const pageStyle = {
  width: '100%',
  minHeight: 'calc(100dvh - var(--sb-docs-nav-height, 64px) - 48px)',
  overflow: 'hidden',
  background: C.page,
  color: C.text,
  fontFamily: 'var(--font-family)',
} as const;

const cardStyle = {
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  background: C.white,
} as const;

function SymbolIcon({ children, color = 'currentColor', size = 16 }: { children: React.ReactNode; color?: string; size?: number }) {
  return (
    <span aria-hidden="true" style={{ display: 'inline-flex', width: size, height: size, alignItems: 'center', justifyContent: 'center', color, fontSize: size, lineHeight: 1 }}>
      {children}
    </span>
  );
}

const tableData = [
  { key: '1', name: '门店库存盘点', owner: 'Nink', area: '华东一区', status: '已完成', time: '2026-07-24 10:30' },
  { key: '2', name: '夏季新品配置', owner: 'Kim', area: '华南二区', status: '进行中', time: '2026-07-23 15:20' },
  { key: '3', name: '会员标签同步', owner: 'Alex', area: '全国', status: '待处理', time: '2026-07-22 09:15' },
  { key: '4', name: '设备巡检计划', owner: 'Mia', area: '华北一区', status: '已完成', time: '2026-07-21 18:00' },
];

function statusTag(status: string) {
  if (status === '已完成') return <Tag color="green">{status}</Tag>;
  if (status === '进行中') return <Tag color="arcoblue">{status}</Tag>;
  return <Tag color="orangered">{status}</Tag>;
}

function PageFrame({ title, children, aside }: { title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div style={pageStyle} aria-label={title}>
      <div style={{ display: 'flex', minHeight: 'inherit' }}>
        {aside}
        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </div>
    </div>
  );
}

function Toolbar({ filter = false }: { filter?: boolean }) {
  return (
    <div style={{ ...cardStyle, padding: 16, marginBottom: 16 }}>
      {filter && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginBottom: 16 }}>
          <Input placeholder="任务名称" allowClear />
          <Select placeholder="状态">
            <Select.Option value="done">已完成</Select.Option>
            <Select.Option value="running">进行中</Select.Option>
          </Select>
          <DatePicker.RangePicker />
          <Input placeholder="负责人" allowClear />
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <Space>
          <Button type="primary" icon={<SymbolIcon>＋</SymbolIcon>}>新增</Button>
          <Button icon={<SymbolIcon>⇧</SymbolIcon>}>导入</Button>
          <Button>更多 <SymbolIcon>⌄</SymbolIcon></Button>
        </Space>
        <Space>
          <Input prefix={<SymbolIcon>⌕</SymbolIcon>} placeholder="搜索" style={{ width: 260 }} allowClear />
          <Button icon={<SymbolIcon>⚙</SymbolIcon>} />
          <Button icon={<SymbolIcon>↻</SymbolIcon>} />
        </Space>
      </div>
    </div>
  );
}

function DataTable({ tree = false, framed = true }: { tree?: boolean; framed?: boolean }) {
  const data = tree
    ? tableData.map((item, index) => ({
        ...item,
        children: index === 0 ? [{ ...item, key: '1-1', name: '上海门店盘点', area: '上海' }] : undefined,
      }))
    : tableData;
  const columns = [
    { title: tree ? '节点名称' : '任务名称', dataIndex: 'name', width: 220 },
    { title: '所属区域', dataIndex: 'area', width: 160 },
    { title: '负责人', dataIndex: 'owner', width: 120 },
    { title: '状态', dataIndex: 'status', width: 120, render: (_: unknown, record: { status: string }) => statusTag(record.status) },
    { title: '创建时间', dataIndex: 'time', width: 180 },
    {
      title: '操作',
      width: 140,
      render: () => (
        <Space size={16}>
          <a style={{ color: C.brand }}>管理</a>
          <a style={{ color: C.danger }}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={framed ? { ...cardStyle, padding: 16 } : undefined}>
      <Table columns={columns} data={data} pagination={false} border={{ headerCell: true, cell: true }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Pagination total={128} pageSize={20} current={1} showTotal sizeCanChange showJumper />
      </div>
    </div>
  );
}

function ListPreview({ mode }: { mode: 'basic' | 'filter' | 'tag' | 'tree' }) {
  const [active, setActive] = useState(1);
  if (mode === 'tag') {
    return (
      <PageFrame title="标签管理列表">
        <div style={{ display: 'grid', gap: 16 }}>
          <section style={{ ...cardStyle, padding: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <div style={{ color: C.muted, fontSize: 12, fontWeight: 600, lineHeight: '20px' }}>数据列表</div>
              <h2 style={{ margin: '4px 0 8px', fontSize: 24, lineHeight: '32px' }}>标签管理列表</h2>
              <p style={{ margin: 0, color: C.muted, fontSize: 14, lineHeight: '22px' }}>用于维护会员标签组、同步状态和门店适用范围。</p>
            </div>
            <Space size={16}>
              <Button>批量导入</Button>
              <Button type="primary" icon={<SymbolIcon>＋</SymbolIcon>}>新增标签</Button>
            </Space>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '280px minmax(0, 1fr)', gap: 16, alignItems: 'start' }}>
            <aside style={{ ...cardStyle, padding: 16, minHeight: 520 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>标签组</div>
                <Button icon={<SymbolIcon>＋</SymbolIcon>} />
              </div>
              <Input prefix={<SymbolIcon>⌕</SymbolIcon>} placeholder="搜索标签组" allowClear />
              <div style={{ display: 'grid', gap: 4, marginTop: 16 }}>
                {['高价值客户', '新品偏好', '低频活跃', '会员等级', '门店周边'].map((item, index) => (
                  <div key={item} onClick={() => setActive(index)} style={{ minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '0 12px', borderRadius: 6, cursor: 'pointer', color: active === index ? C.brand : C.text, background: active === index ? C.brandLight : 'transparent', fontWeight: active === index ? 600 : 400 }}>
                    <span>{item}</span>
                    <span style={{ color: active === index ? C.brand : C.muted, fontSize: 12 }}>{[128, 96, 72, 64, 32][index]}</span>
                  </div>
                ))}
              </div>
            </aside>

            <section style={{ ...cardStyle, minWidth: 0, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, lineHeight: '24px' }}>{['高价值客户', '新品偏好', '低频活跃', '会员等级', '门店周边'][active]}</h3>
                  <div style={{ marginTop: 4, color: C.muted, fontSize: 12, lineHeight: '20px' }}>共 128 条标签数据，最近同步于 2026-07-24 10:30</div>
                </div>
                <Space size={16}>
                  <Input prefix={<SymbolIcon>⌕</SymbolIcon>} placeholder="搜索标签" style={{ width: 240 }} allowClear />
                  <Button>筛选</Button>
                </Space>
              </div>
              <DataTable framed={false} />
            </section>
          </div>
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame title={mode === 'tree' ? '树表列表' : mode === 'filter' ? '带筛选列表' : '基础列表'}>
      <Toolbar filter={mode === 'filter'} />
      <DataTable tree={mode === 'tree'} />
    </PageFrame>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ ...cardStyle, padding: 20, marginBottom: 16 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>{title}</h3>
      {children}
    </section>
  );
}

function FormPreview({ mode }: { mode: 'basic' | 'grouped' | 'step' }) {
  return (
    <PageFrame title={mode === 'step' ? '分步表单' : mode === 'grouped' ? '分组表单' : '基础表单'}>
      {mode === 'step' && (
        <div style={{ ...cardStyle, padding: '20px 80px', marginBottom: 16 }}>
          <Steps current={2}>
            <Steps.Step title="填写门店信息" />
            <Steps.Step title="配置运营规则" />
            <Steps.Step title="确认提交" />
          </Steps>
        </div>
      )}
      <FormSection title={mode === 'grouped' ? '门店信息' : '基础信息'}>
        <Form layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
            <Form.Item label="门店名称" field="name"><Input placeholder="请输入门店名称" /></Form.Item>
            <Form.Item label="所属区域" field="area"><Select placeholder="请选择区域" /></Form.Item>
            <Form.Item label="运营类型" field="type"><Radio.Group options={['直营门店', '加盟门店']} /></Form.Item>
            <Form.Item label="开业日期" field="date"><DatePicker style={{ width: '100%' }} /></Form.Item>
          </div>
        </Form>
      </FormSection>
      {mode !== 'basic' && (
        <FormSection title={mode === 'step' ? '运营规则' : '联系人信息'}>
          <Form layout="vertical">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
              <Form.Item label="负责人" field="owner"><Input placeholder="请输入负责人" /></Form.Item>
              <Form.Item label="联系电话" field="phone"><Input placeholder="请输入联系电话" /></Form.Item>
              <Form.Item label="营业时段" field="range"><DatePicker.RangePicker style={{ width: '100%' }} /></Form.Item>
              <Form.Item label="启用自动补货" field="auto"><Checkbox>启用</Checkbox></Form.Item>
            </div>
          </Form>
        </FormSection>
      )}
      <div style={{ ...cardStyle, padding: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Space size={16}>
          <Button>取消</Button>
          <Button>保存草稿</Button>
          <Button type="primary">提交</Button>
        </Space>
      </div>
    </PageFrame>
  );
}

function DetailPreview() {
  return (
    <PageFrame title="详情页">
      <div style={{ ...cardStyle, padding: 20, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22 }}>门店库存盘点</h2>
          <div style={{ marginTop: 8, color: C.muted }}>任务编号 INV-20260724 · 华东一区</div>
        </div>
        <Space><Button>导出</Button><Button type="primary">处理</Button></Space>
      </div>
      <div style={{ ...cardStyle, padding: 20, marginBottom: 16 }}>
        <Descriptions
          column={3}
          data={[
            { label: '任务状态', value: <Tag color="green">已完成</Tag> },
            { label: '负责人', value: 'Nink' },
            { label: '创建时间', value: '2026-07-24 10:30' },
            { label: '覆盖门店', value: '128 家' },
            { label: '异常数量', value: '6 条' },
            { label: '完成率', value: '96%' },
          ]}
        />
      </div>
      <DataTable />
    </PageFrame>
  );
}

function DashboardPreview() {
  return (
    <PageFrame title="Dashboard">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        {[
          ['今日订单', '12,860'],
          ['活跃会员', '46,230'],
          ['库存预警', '28'],
          ['完成率', '96.8%'],
        ].map(([label, value]) => (
          <div key={label} style={{ ...cardStyle, padding: 18 }}>
            <Statistic title={label} value={value} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ ...cardStyle, padding: 20 }}>
          <h3 style={{ margin: '0 0 16px' }}>运营趋势</h3>
          <div style={{ height: 260, display: 'flex', alignItems: 'end', gap: 14, padding: '0 8px' }}>
            {[42, 68, 54, 88, 72, 104, 96, 126, 118, 142, 136, 156].map((height, index) => (
              <div key={index} style={{ flex: 1, height, borderRadius: '6px 6px 0 0', background: index > 8 ? C.brand : C.brandLight }} />
            ))}
          </div>
        </div>
        <div style={{ ...cardStyle, padding: 20 }}>
          <h3 style={{ margin: '0 0 16px' }}>任务进度</h3>
          <Space direction="vertical" size={18} style={{ width: '100%' }}>
            <Progress percent={86} />
            <Progress percent={64} color={C.brand} />
            <Progress percent={38} status="warning" />
          </Space>
        </div>
      </div>
    </PageFrame>
  );
}

function LoginPreview() {
  return (
    <div style={{ ...pageStyle, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', background: C.white }}>
      <div style={{ padding: 48, background: C.brand, color: C.white, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>STARBUCKS DESIGN</div>
        <div>
          <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>门店运营管理平台</div>
          <div style={{ maxWidth: 420, color: 'rgba(255,255,255,0.78)', lineHeight: '24px' }}>统一管理门店、会员、库存和运营任务，帮助业务团队稳定交付日常运营动作。</div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.68)' }}>© 2026 Starbucks Design</div>
      </div>
      <div style={{ padding: 56, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>登录</h2>
          <p style={{ margin: '0 0 28px', color: C.muted }}>使用企业账号进入工作台</p>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Input placeholder="账号" />
            <Input.Password placeholder="密码" />
            <Checkbox>记住登录状态</Checkbox>
            <Button type="primary" long>登录</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

function ResultExceptionPreview() {
  return (
    <PageFrame title="结果与异常页">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ ...cardStyle, padding: 32 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <SymbolIcon color={C.brand} size={48}>✓</SymbolIcon>
            <div>
              <h2 style={{ margin: '0 0 8px' }}>提交成功</h2>
              <div style={{ color: C.muted }}>门店配置已进入审核流程。</div>
            </div>
          </div>
          <div style={{ marginTop: 24 }}><Button type="primary">查看详情</Button></div>
        </div>
        <div style={{ ...cardStyle, padding: 32 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <SymbolIcon color={C.danger} size={48}>!</SymbolIcon>
            <div>
              <h2 style={{ margin: '0 0 8px' }}>访问异常</h2>
              <div style={{ color: C.muted }}>当前账号暂无查看该门店的权限。</div>
            </div>
          </div>
          <div style={{ marginTop: 24 }}><Button>返回列表</Button></div>
        </div>
      </div>
    </PageFrame>
  );
}

export default function PagePreview({ kind }: Props) {
  const view = useMemo(() => {
    switch (kind) {
      case 'basic-list':
        return <ListPreview mode="basic" />;
      case 'filter-list':
        return <ListPreview mode="filter" />;
      case 'tag-list':
        return <ListPreview mode="tag" />;
      case 'tree-table-list':
        return <ListPreview mode="tree" />;
      case 'basic-form':
        return <FormPreview mode="basic" />;
      case 'grouped-form':
        return <FormPreview mode="grouped" />;
      case 'step-form':
        return <FormPreview mode="step" />;
      case 'detail':
        return <DetailPreview />;
      case 'dashboard':
        return <DashboardPreview />;
      case 'login':
        return <LoginPreview />;
      case 'result-exception':
        return <ResultExceptionPreview />;
      default:
        return null;
    }
  }, [kind]);

  return (
    <div style={{ minWidth: 1080 }}>
      {view}
    </div>
  );
}
