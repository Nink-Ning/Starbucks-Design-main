export type FormTemplateOption = { label: string; value: string }

export const FORM_TEMPLATE_STORE_TYPES: FormTemplateOption[] = [
  { label: '标准店', value: 'standard' },
  { label: '臻选店', value: 'reserve' },
  { label: '外送店', value: 'delivery' },
]

export const FORM_TEMPLATE_STATUS_OPTIONS: FormTemplateOption[] = [
  { label: '筹备中', value: 'preparing' },
  { label: '营业中', value: 'operating' },
  { label: '已停业', value: 'closed' },
]

export const FORM_TEMPLATE_CHANNEL_OPTIONS: FormTemplateOption[] = [
  { label: '门店点单', value: 'store-order' },
  { label: '专星送', value: 'delivery' },
  { label: '啡快', value: 'pickup' },
  { label: '即时零售', value: 'instant-retail' },
]

export const FORM_TEMPLATE_MESSAGES = {
  storeName: '请输入门店名称',
  storeCode: '请输入门店编号',
  storeType: '请选择门店类型',
  businessStatus: '请选择营业状态',
  openingDate: '请选择开业日期',
  manager: '请输入店长姓名',
  confirm: '请确认门店信息无误',
} as const

export type GroupedFormValues = {
  storeName: string
  storeCode: string
  storeType: string | undefined
  businessStatus: string
  openingDate: string | undefined
  serviceChannels: string[]
  deliveryEnabled: boolean
  manager: string
  description: string
}

export function createGroupedFormBaseline(): GroupedFormValues {
  return {
    storeName: '',
    storeCode: '',
    storeType: undefined,
    businessStatus: 'preparing',
    openingDate: undefined,
    serviceChannels: [],
    deliveryEnabled: false,
    manager: '',
    description: '',
  }
}

export const ACTIVITY_TEAM_OPTIONS: FormTemplateOption[] = [
  { label: 'SITC Team', value: 'sitc' },
  { label: 'Marketing Team', value: 'marketing' },
  { label: 'Digital Experience Team', value: 'digital' },
]

export const ACTIVITY_MEMBER_LIMIT_OPTIONS: FormTemplateOption[] = [
  { label: '全部会员', value: 'all' },
  { label: '指定等级会员', value: 'specified-level' },
  { label: '指定时间新注册会员', value: 'new-members' },
]

export const ACTIVITY_MEMBER_LEVEL_OPTIONS: FormTemplateOption[] = [
  { label: '钻星', value: 'diamond' },
  { label: '金星', value: 'gold' },
  { label: '玉星', value: 'jade' },
  { label: '银星', value: 'silver' },
]

export const ACTIVITY_CITY_OPTIONS: FormTemplateOption[] = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
]

export const ACTIVITY_TARGET_AUDIENCE_OPTIONS: FormTemplateOption[] = [
  { label: '不指定人群', value: 'none' },
  { label: '自动圈人', value: 'automatic' },
  { label: '手动圈人', value: 'manual' },
]

export const ACTIVITY_TASK_TYPE_OPTIONS: FormTemplateOption[] = [
  { label: '券核销', value: 'coupon-redeem' },
  { label: '门店消费', value: 'store-purchase' },
  { label: '会员注册', value: 'member-register' },
]

export const ACTIVITY_COUPON_TYPE_OPTIONS: FormTemplateOption[] = [
  { label: 'S4好礼券', value: 's4-gift' },
  { label: '饮品券', value: 'beverage' },
  { label: '食品券', value: 'food' },
]

export const ACTIVITY_COUPON_OPTIONS = [
  '[3141]指定饮品或食品(含臻选)第二件半价',
  '[3258]满80减20元企业微信专享券',
  '[3139]饮品(含臻选)买一赠一券',
  '[3388]【银星/玉星会员专享】指定饮品双杯49.9元',
]

export const ACTIVITY_COUPON_SELECT_OPTIONS: FormTemplateOption[] = ACTIVITY_COUPON_OPTIONS.map((coupon) => ({
  label: coupon,
  value: coupon,
}))

export const ACTIVITY_MESSAGES = {
  activityName: '请输入活动名称',
  activityTime: '请选择活动时间',
  team: '请选择所属团队',
  deadlineDays: '请输入活动完成期限',
  memberLimit: '请选择参与限制',
  memberLevels: '请选择会员等级',
  city: '请选择活动城市',
  targetAudience: '请选择指定人群',
  taskType: '请选择任务类型',
  eventFilter: '请选择事件是否过滤',
  couponType: '请选择券类型',
  couponScope: '请选择券号与券名范围',
  selectedCoupons: '请选择活动券',
  outputResults: '请至少添加一个输出结果',
} as const

export type StepFormValues = {
  activityName: string
  activityTime: number[]
  team: string | undefined
  deadlineDays: number
  memberLimit: string
  memberLevels: string[]
  cities: string[]
  targetAudience: string
  taskType: string | undefined
  eventFilter: string
  couponType: string | undefined
  couponScope: string
  selectedCoupons: string[]
  outputResults: number[]
}

export function createStepFormBaseline(): StepFormValues {
  return {
    activityName: 'test campaign-复制',
    activityTime: [
      Date.parse('2025-01-13T00:00:00+08:00'),
      Date.parse('2025-02-14T23:59:59+08:00'),
    ],
    team: 'sitc',
    deadlineDays: 1,
    memberLimit: 'specified-level',
    memberLevels: [],
    cities: ['shanghai', 'beijing'],
    targetAudience: 'none',
    taskType: 'coupon-redeem',
    eventFilter: 'filter',
    couponType: 's4-gift',
    couponScope: 'specified',
    selectedCoupons: ACTIVITY_COUPON_OPTIONS,
    outputResults: [1, 2],
  }
}
