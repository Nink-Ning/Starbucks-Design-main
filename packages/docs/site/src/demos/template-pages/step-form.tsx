import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Message,
  Radio,
  Select,
  Space,
  Steps,
} from '@sbux/starbucks-design-react'
import {
  FormActions,
  FormControlArea,
  FormGrid,
  FormGridItem,
  FormPageLayout,
  FormSection,
  PageHeader,
  StepFormLayout,
} from '@sbux/starbucks-design-react/pro'
import {
  ACTIVITY_COUPON_SELECT_OPTIONS,
  ACTIVITY_COUPON_TYPE_OPTIONS,
  ACTIVITY_CITY_OPTIONS,
  ACTIVITY_MEMBER_LEVEL_OPTIONS,
  ACTIVITY_MEMBER_LIMIT_OPTIONS,
  ACTIVITY_MESSAGES,
  ACTIVITY_TARGET_AUDIENCE_OPTIONS,
  ACTIVITY_TASK_TYPE_OPTIONS,
  ACTIVITY_TEAM_OPTIONS,
  createStepFormBaseline,
  type StepFormValues,
} from './grouped-step-form.shared'

const stepFields: Array<Array<keyof StepFormValues>> = [
  ['activityName', 'activityTime', 'team', 'deadlineDays'],
  ['memberLimit', 'memberLevels', 'cities', 'targetAudience'],
  ['taskType', 'eventFilter', 'couponType', 'couponScope', 'selectedCoupons', 'outputResults'],
]

export default function Demo() {
  const [form] = Form.useForm<StepFormValues>()
  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateCurrentStep = async () => {
    await form.validate(stepFields[currentStep - 1])
  }

  const handleNext = async () => {
    if (submitting) return

    try {
      await validateCurrentStep()
    } catch {
      return
    }

    if (currentStep < stepFields.length) {
      setCurrentStep((step) => step + 1)
      return
    }

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    Message.success('活动创建成功')
    setSubmitSuccess(true)
    setSubmitting(false)
  }

  const handlePrevious = () => {
    if (!submitting) setCurrentStep((step) => Math.max(1, step - 1))
  }

  const handleCancel = () => {
    form.resetFields()
    setCurrentStep(1)
    setSubmitSuccess(false)
  }

  const pageHeader = (
    <PageHeader
      title="新建活动"
      helpText="按步骤完成活动配置"
      backable
      onBack={() => Message.info('返回活动列表')}
    />
  )
  const pageHeaderHost = typeof document === 'undefined'
    ? null
    : document.querySelector('[data-template-page-header-host="step-form"]')

  const stepContent = () => {
    if (currentStep === 1) {
      return (
        <FormSection>
          <FormGrid>
            <FormGridItem>
              <Form.Item label="活动名称" field="activityName" required rules={[{ required: true, message: ACTIVITY_MESSAGES.activityName }]}>
                <Input maxLength={80} placeholder="请输入活动名称" />
              </Form.Item>
            </FormGridItem>

            <FormGridItem>
              <Form.Item label="活动时间" field="activityTime" required rules={[{ required: true, message: ACTIVITY_MESSAGES.activityTime }]}>
                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
              </Form.Item>
            </FormGridItem>

            <FormGridItem>
              <Form.Item label="所属团队" field="team" required rules={[{ required: true, message: ACTIVITY_MESSAGES.team }]}>
                <Select options={ACTIVITY_TEAM_OPTIONS} placeholder="请选择所属团队" />
              </Form.Item>
            </FormGridItem>

            <FormGridItem>
              <Form.Item label="活动完成期限" required>
                <div className="sb-step-form-page__inline-field">
                  <span>用户在准入后的 T+</span>
                  <Form.Item field="deadlineDays" noStyle rules={[{ required: true, message: ACTIVITY_MESSAGES.deadlineDays }]}>
                    <Input type="number" min={-1} style={{ width: 120 }} />
                  </Form.Item>
                  <span>天结束活动</span>
                </div>
              </Form.Item>
            </FormGridItem>
          </FormGrid>
        </FormSection>
      )
    }

    if (currentStep === 2) {
      return (
        <FormSection>
          <FormGrid>
            <FormGridItem span={2}>
              <Form.Item label="参与限制" required>
                <FormControlArea>
                  <Form.Item field="memberLimit" noStyle rules={[{ required: true, message: ACTIVITY_MESSAGES.memberLimit }]}>
                    <Radio.Group>
                      {ACTIVITY_MEMBER_LIMIT_OPTIONS.map((option) => (
                        <Radio key={option.value} value={option.value}>{option.label}</Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </FormControlArea>
              </Form.Item>
            </FormGridItem>

            <FormGridItem span={2}>
              <Form.Item label="会员等级" required>
                <FormControlArea>
                  <Form.Item field="memberLevels" noStyle rules={[{ required: true, minLength: 1, message: ACTIVITY_MESSAGES.memberLevels }]}>
                    <Checkbox.Group>
                      {ACTIVITY_MEMBER_LEVEL_OPTIONS.map((option) => (
                        <Checkbox key={option.value} value={option.value}>{option.label}</Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                </FormControlArea>
              </Form.Item>
            </FormGridItem>

            <FormGridItem span={2}>
              <Form.Item label="选择活动城市" required>
                <FormControlArea>
                  <Form.Item field="cities" noStyle rules={[{ required: true, minLength: 1, message: ACTIVITY_MESSAGES.city }]}>
                    <Select
                      mode="multiple"
                      options={ACTIVITY_CITY_OPTIONS}
                      placeholder="请选择活动城市"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </FormControlArea>
              </Form.Item>
            </FormGridItem>

            <FormGridItem span={2}>
              <Form.Item label="指定人群" required>
                <FormControlArea>
                  <Form.Item field="targetAudience" noStyle rules={[{ required: true, message: ACTIVITY_MESSAGES.targetAudience }]}>
                    <Radio.Group>
                      {ACTIVITY_TARGET_AUDIENCE_OPTIONS.map((option) => (
                        <Radio key={option.value} value={option.value}>{option.label}</Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </FormControlArea>
              </Form.Item>
            </FormGridItem>
          </FormGrid>
        </FormSection>
      )
    }

    return (
      <FormSection>
        <FormGrid>
          <FormGridItem>
            <Form.Item label="任务类型" field="taskType" required rules={[{ required: true, message: ACTIVITY_MESSAGES.taskType }]}>
              <Select options={ACTIVITY_TASK_TYPE_OPTIONS} placeholder="请选择任务类型" />
            </Form.Item>
          </FormGridItem>

          <FormGridItem>
            <Form.Item label="事件是否过滤" required>
              <FormControlArea>
                <Form.Item field="eventFilter" noStyle rules={[{ required: true, message: ACTIVITY_MESSAGES.eventFilter }]}>
                  <Radio.Group>
                    <Radio value="filter">过滤</Radio>
                    <Radio value="no-filter">不过滤</Radio>
                  </Radio.Group>
                </Form.Item>
              </FormControlArea>
            </Form.Item>
          </FormGridItem>

          <FormGridItem>
            <Form.Item label="券类型" field="couponType" required rules={[{ required: true, message: ACTIVITY_MESSAGES.couponType }]}>
              <Select options={ACTIVITY_COUPON_TYPE_OPTIONS} placeholder="请选择券类型" />
            </Form.Item>
          </FormGridItem>

          <FormGridItem>
            <Form.Item label="券号与券名" required>
              <FormControlArea>
                <Form.Item field="couponScope" noStyle rules={[{ required: true, message: ACTIVITY_MESSAGES.couponScope }]}>
                  <Radio.Group>
                    <Radio value="all">不限</Radio>
                    <Radio value="specified">选择指定券</Radio>
                  </Radio.Group>
                </Form.Item>
              </FormControlArea>
            </Form.Item>
          </FormGridItem>

          <FormGridItem span={2}>
            <Form.Item label="选择活动券" required>
              <Form.Item field="selectedCoupons" noStyle rules={[{ required: true, minLength: 1, message: ACTIVITY_MESSAGES.selectedCoupons }]}>
                <Select
                  mode="multiple"
                  options={ACTIVITY_COUPON_SELECT_OPTIONS}
                  placeholder="请选择活动券"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Form.Item>
          </FormGridItem>

          <FormGridItem span={2}>
            <div className="sb-step-form-page__output-divider" />
          </FormGridItem>

          <FormGridItem span={2}>
            <Form.List
              field="outputResults"
              rules={[{
                validator: (value, callback) => {
                  if (!value?.length) {
                    callback(ACTIVITY_MESSAGES.outputResults)
                    return
                  }
                  callback()
                },
              }]}
            >
              {(fields, { add, remove }) => (
                <div className="sb-step-form-page__dynamic-results">
                  {fields.map((field, index) => (
                    <div className="sb-step-form-page__dynamic-result" key={field.key}>
                      <Form.Item label={`输出结果${index + 1}`} required>
                        <div className="sb-step-form-page__inline-field">
                          <span>用户核销</span>
                          <Form.Item field={field.field} noStyle rules={[{ required: true, message: '请输入核销数量' }]}>
                            <Input type="number" style={{ width: 120 }} />
                          </Form.Item>
                          <span>张</span>
                        </div>
                      </Form.Item>
                      {fields.length > 1 && <Button type="text" status="danger" onClick={() => remove(index)}>删除</Button>}
                    </div>
                  ))}
                  <Button type="text" onClick={() => add(1)}>＋新增输出结果</Button>
                </div>
              )}
            </Form.List>
          </FormGridItem>
        </FormGrid>
      </FormSection>
    )
  }

  return (
    <div className="sb-step-form-page sb-template-page-surface">
      {pageHeaderHost ? createPortal(pageHeader, pageHeaderHost) : pageHeader}
      <FormPageLayout>
        <Form form={form} layout="vertical" initialValues={createStepFormBaseline()} autoComplete="off" disabled={submitting}>
          <StepFormLayout
            steps={
              <Steps current={currentStep}>
                <Steps.Step title="活动基础信息" />
                <Steps.Step title="活动准入规则" />
                <Steps.Step title="活动任务内容" />
              </Steps>
            }
            stickyActions
            actions={
              <FormActions align="between">
                <Button htmlType="button" disabled={submitting} onClick={handleCancel}>取消</Button>
                <Space>
                  <Button htmlType="button" disabled={currentStep === 1 || submitting} onClick={handlePrevious}>上一步</Button>
                  <Button htmlType="button" type="primary" loading={submitting} onClick={handleNext}>
                    {currentStep === stepFields.length ? '提交' : '下一步'}
                  </Button>
                </Space>
              </FormActions>
            }
          >
            {stepContent()}
          </StepFormLayout>
        </Form>

        {submitSuccess && <div className="sb-step-form-page__success" role="status">活动创建成功</div>}
      </FormPageLayout>
    </div>
  )
}
