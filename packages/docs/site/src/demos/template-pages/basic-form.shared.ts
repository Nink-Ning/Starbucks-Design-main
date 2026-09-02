export type BasicFormValues = {
  storeName: string;
  storeCode: string;
  storeType: string | undefined;
  businessStatus: string;
  openingDate: string | undefined;
  serviceChannels: string[];
  deliveryEnabled: boolean;
  manager: string;
  description: string;
};

export type BasicFormOption = {
  label: string;
  value: string;
};

export const STORE_TYPE_OPTIONS: BasicFormOption[] = [
  { label: '标准店', value: 'standard' },
  { label: '臻选店', value: 'reserve' },
  { label: '外送店', value: 'delivery' },
];

export const BUSINESS_STATUS_OPTIONS: BasicFormOption[] = [
  { label: '筹备中', value: 'preparing' },
  { label: '营业中', value: 'operating' },
  { label: '已停业', value: 'closed' },
];

export const SERVICE_CHANNEL_OPTIONS: BasicFormOption[] = [
  { label: '门店点单', value: 'store-order' },
  { label: '专星送', value: 'delivery' },
  { label: '啡快', value: 'pickup' },
  { label: '即时零售', value: 'instant-retail' },
];

export const STORE_CODE_PATTERN = /^[A-Za-z0-9-]+$/;

export const BASIC_FORM_MESSAGES = {
  storeNameRequired: '请输入门店名称',
  storeNameLength: '门店名称长度为 2-40 个字符',
  storeCodeRequired: '请输入门店编号',
  storeCodeFormat: '门店编号只允许字母、数字和短横线',
  storeCodeLength: '门店编号长度为 2-20 个字符',
  storeTypeRequired: '请选择门店类型',
  businessStatusRequired: '请选择营业状态',
  openingDateRequired: '请选择开业日期',
  managerLength: '店长姓名不能超过 20 个字符',
  descriptionLength: '备注不能超过 200 个字符',
} as const;

export function createBasicFormBaseline(): BasicFormValues {
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
  };
}
