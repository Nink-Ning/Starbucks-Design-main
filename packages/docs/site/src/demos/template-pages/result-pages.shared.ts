export const RESULT_ACTION_DELAY = 600

export const RESULT_PAGE_CONTENT = {
  success: {
    title: '创建成功',
    description: '项目已创建成功，可以返回首页继续处理其他任务。',
    primaryAction: '返回首页',
    primaryFeedback: '已返回首页',
  },
  failure: {
    title: '创建失败',
    description: '提交内容未通过校验，请返回修改后重新提交。',
    primaryAction: '重新提交',
    secondaryAction: '返回修改',
    primaryFeedback: '已重新提交，请稍后查看处理结果',
    secondaryFeedback: '已返回修改页面',
  },
  networkError: {
    title: '网络异常',
    description: '当前网络连接不可用，请检查网络设置后重新加载。',
    primaryAction: '重新加载',
    primaryFeedback: '网络仍不可用，请稍后再试',
  },
} as const
