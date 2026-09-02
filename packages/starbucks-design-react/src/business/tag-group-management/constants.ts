import type { TagGroupManagementTexts } from './interface'

export const TAG_GROUP_MAX_NAME_LENGTH = 20

export const DEFAULT_TAG_GROUP_MANAGEMENT_TEXTS: TagGroupManagementTexts = {
  title: '标签组',
  searchPlaceholder: '搜索标签组',
  create: '新增',
  rename: '重命名',
  confirm: '确定',
  cancel: '取消',
  empty: '暂无标签组',
  searchEmpty: '未找到匹配的标签组',
  nameRequired: '请输入标签组名称',
  nameDuplicate: '标签组名称已存在',
  nameTooLong: '标签组名称不能超过20个字符'
}

export const resolveTagGroupManagementTexts = (
  texts: Partial<TagGroupManagementTexts> = {}
): TagGroupManagementTexts => ({
  ...DEFAULT_TAG_GROUP_MANAGEMENT_TEXTS,
  ...texts
})
