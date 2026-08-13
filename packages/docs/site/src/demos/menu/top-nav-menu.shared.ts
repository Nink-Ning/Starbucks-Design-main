export interface SystemOption {
  id: string
  shortName: string
  name: string
  description: string
}

export interface SystemGroup {
  id: string
  label: string
  searchText: string
  systems: SystemOption[]
}

export interface SystemCascaderOption {
  value: string
  label: string
  searchText: string
  children?: SystemCascaderOption[]
}

export const systemGroups: SystemGroup[] = [
  {
    id: 'customer-center',
    label: '用户中心',
    searchText: 'Customer Center 用户中心',
    systems: [
      {
        id: 'cc',
        shortName: 'CC',
        name: 'Customer Center (CC)',
        description: 'Customer Center 用户中心'
      },
      {
        id: 'le',
        shortName: 'LE',
        name: 'Loyalty Engine (LE)',
        description: 'Customer Center 用户中心'
      },
      {
        id: 'smp',
        shortName: 'SMP',
        name: 'Star Management Platform (SMP)',
        description: 'Customer Center 用户中心'
      },
      {
        id: 'cac',
        shortName: 'CAC',
        name: 'Customer Account Center (CAC)',
        description: 'Customer Center 用户中心'
      },
      {
        id: 'pms',
        shortName: 'PMS',
        name: 'Paid Membership System (PMS)',
        description: 'Customer Center 用户中心'
      }
    ]
  },
  {
    id: 'finance-center',
    label: '财务中心',
    searchText: 'Finance Center 财务中心',
    systems: [
      {
        id: 'refund-management',
        shortName: 'RMS',
        name: 'Refund Management System',
        description: 'Finance Center 财务中心'
      },
      {
        id: 'dbms',
        shortName: 'DBMS',
        name: 'Discount Budget Management System (DBMS)',
        description: 'Finance Center 财务中心'
      }
    ]
  },
  {
    id: 'store-center',
    label: '店铺中心',
    searchText: 'Store Center 店铺中心',
    systems: [
      {
        id: 'sc',
        shortName: 'SC',
        name: 'Store Center (SC)',
        description: 'Store Center 店铺中心'
      }
    ]
  },
  {
    id: 'coupon-center',
    label: '卡券中心',
    searchText: 'Coupon Center 卡券中心',
    systems: [
      {
        id: 's4',
        shortName: 'S4',
        name: 'SVC & Coupon System (S4)',
        description: 'Bizops Portal'
      },
      {
        id: 'gifting-system',
        shortName: 'GS',
        name: 'Gifting System',
        description: 'Coupon Center 卡券中心'
      },
      {
        id: 'b2b-gift-platform',
        shortName: 'B2B',
        name: 'B2B Gift Platform',
        description: 'Coupon Center 卡券中心'
      },
      {
        id: 'promotion-center',
        shortName: 'PC',
        name: 'Promotion Center',
        description: 'Coupon Center 卡券中心'
      }
    ]
  },
  {
    id: 'fulfillment-center',
    label: '履约中心',
    searchText: 'Fulfillment Center 履约中心',
    systems: [
      {
        id: 'dda',
        shortName: 'DDA',
        name: 'Digital Delivery Application (DDA)',
        description: 'Fulfillment Center 履约中心'
      }
    ]
  },
  {
    id: 'product-center',
    label: '商品中心',
    searchText: 'Product Center 商品中心',
    systems: [
      {
        id: 'ec',
        shortName: 'EC',
        name: 'E-Commerce Center (EC)',
        description: 'Product Center 商品中心'
      },
      {
        id: 'o2o-platform',
        shortName: 'O2O',
        name: 'O2O Platform',
        description: 'Product Center 商品中心'
      },
      {
        id: 'product-configuration-center',
        shortName: 'PC',
        name: 'Product Configuration Center (PC)',
        description: 'Product Center 商品中心'
      },
      {
        id: 'product-center-system',
        shortName: 'PRODUCT',
        name: 'Product Center',
        description: 'Product Center 商品中心'
      }
    ]
  },
  {
    id: 'marketing-center',
    label: '营销中心',
    searchText: 'Marketing Center 营销中心',
    systems: [
      {
        id: 'marketing-center-system',
        shortName: 'MC',
        name: 'Marketing Center',
        description: 'Marketing Center 营销中心'
      },
      {
        id: '3pp',
        shortName: '3PP',
        name: 'Third Party Promotion Platform (3PP)',
        description: 'Marketing Center 营销中心'
      },
      {
        id: 'digital-operation-platform',
        shortName: 'DOP',
        name: 'Digital Operation Platform',
        description: 'Marketing Center 营销中心'
      },
      {
        id: 'marketing-automation-platform',
        shortName: 'MAP',
        name: 'Marketing Automation Platform',
        description: 'Marketing Center 营销中心'
      }
    ]
  },
  {
    id: 'payment-center',
    label: '支付中心',
    searchText: 'Payment Center 支付中心',
    systems: [
      {
        id: 'upp',
        shortName: 'UPP',
        name: 'Unified Payment Platform (UPP)',
        description: 'Payment Center 支付中心'
      }
    ]
  },
  {
    id: 'order-management',
    label: '订单管理',
    searchText: 'Order Management 订单管理',
    systems: [
      {
        id: 'digital-platform-oms',
        shortName: 'OMS',
        name: 'Digital Platform OMS',
        description: 'Order Management 订单管理'
      },
      {
        id: 'oc',
        shortName: 'OC',
        name: 'Order Center (OC)',
        description: 'Order Management 订单管理'
      },
      {
        id: 'third-party-platform-ec',
        shortName: 'EC',
        name: 'Third Party Platform EC',
        description: 'Order Management 订单管理'
      }
    ]
  }
]

const allSystems = systemGroups.flatMap((group) => group.systems)

export const systemCascaderOptions: SystemCascaderOption[] = systemGroups.map((group) => ({
  value: group.id,
  label: group.label,
  searchText: group.searchText,
  children: group.systems.map((system) => ({
    value: system.id,
    label: system.name,
    searchText: [group.searchText, system.shortName, system.name, system.description].join(' ')
  }))
}))

export function getSystemById(systemId: string) {
  return allSystems.find((system) => system.id === systemId) ?? allSystems[0]
}

export function getSystemTriggerLabel(system: SystemOption) {
  const group = systemGroups.find((candidate) => candidate.systems.some((candidate) => candidate.id === system.id))

  return `${system.shortName} ${group?.label ?? system.name}`
}

export function getSystemPath(systemId: string) {
  const group = systemGroups.find((candidate) => candidate.systems.some((system) => system.id === systemId))
  return group ? [group.id, systemId] : []
}

export function getSystemSearchResults(query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) return []

  return systemGroups.flatMap((group) =>
    group.systems.filter((system) =>
      [group.searchText, system.shortName, system.name, system.description]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalizedQuery)
    )
  )
}
