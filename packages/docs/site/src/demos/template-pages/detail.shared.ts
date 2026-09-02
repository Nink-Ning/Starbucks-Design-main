export const DETAIL_EMPTY_VALUE = '—'

export type DetailDataItem = {
  label: string
  value: string
  span?: number
}

export const couponBasicInfo: DetailDataItem[] = [
  { label: 'ID', value: '15008867' },
  { label: 'BPM工单号', value: 'PO20250605180337094976' },
  { label: '领券链路要求', value: '会员通' },
  { label: '券中文名称', value: '全场满50减6元券' },
  { label: '券英文名称', value: '6rmb off for ordering over 50rmb' },
  { label: '非预付费券编号/SKU', value: 'SKU_0000102229' },
  { label: 'QID', value: 'QID_0000102229' },
  { label: '发行商户', value: '2088-高德MOP(码)' },
  { label: '券类型', value: '电子' },
  { label: '预热券', value: 'N' },
  { label: '门店查看名称', value: '' },
  { label: '门店查看描述', value: '' },
]

export const couponBasicInfoColumns = [
  couponBasicInfo.filter((_, index) => index % 2 === 0),
  couponBasicInfo.filter((_, index) => index % 2 === 1),
]

export const DETAIL_LABEL_VALUE_GAP = 24

export const couponUsageRules: DetailDataItem[] = [
  { label: '核销渠道', value: 'GAODE_MOP' },
  { label: '展示渠道', value: 'GAODE' },
  { label: 'POS code', value: '' },
  { label: 'POS折扣编号', value: '' },
  { label: '核销规则', value: '单次核销' },
  { label: '核销次数', value: '' },
  { label: '有效期', value: '2025-06-06 00:00:00～2026-08-30 23:59:59', span: 3 },
  { label: '上线时间', value: '2025-06-06 00:00:00' },
  { label: '使用时间-天可用时段', value: '' },
  { label: '使用时间-周可用', value: '' },
  { label: '使用时间-月可用', value: '' },
  { label: '使用时间-日期可用', value: '' },
  { label: '非预付费券延期', value: '' },
  { label: '非预付费券叠加', value: 'N' },
  { label: '整单活动叠加', value: 'N' },
]

export const couponActivityTimeline = [
  { label: '2025-06-05 14:20', content: '创建卡券' },
  { label: '2025-06-05 16:10', content: '完成审核' },
  { label: '2025-06-06 00:00', content: '卡券上线' },
]

export const couponStoreScope = [
  { scope: '全国常规门店', type: '包含', area: '全国', note: '支持高德 MOP 码核销' },
  { scope: '机场店', type: '排除', area: '全国', note: '按门店类型排除' },
  { scope: '高速店', type: '排除', area: '全国', note: '按门店类型排除' },
]
